const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp-image-generation" });

// Store conversation history and teaching state
const conversationHistory = [];
let currentTopic = null;
let prerequisites = [];
let teachingMode = false;
let visualsPending = false; // Flag to indicate visuals are ready to be shown
let pendingVisuals = []; // Store visuals until user confirms

// Function to check if the message is asking to teach something
const isTeachRequest = (message) => {
  const teachPatterns = [
    /teach me /i,
    /explain /i,
    /how (to |do ) i/i,
    /show me how /i,
    /tell me about /i,
    /what is /i
  ];
  return teachPatterns.some(pattern => pattern.test(message));
};

// Function to generate prerequisite topics
const generatePrerequisites = async (topic) => {
  const prompt = `For someone wanting to learn "${topic}", suggest 2 prerequisite topics they should understand first. Return the response as a simple list with just the topic names, one per line.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text.split('\n').filter(t => t.trim()).slice(0, 2);
};

// Function to generate visual suggestions
const generateVisuals = async (topic) => {
  const prompt = `Suggest 1-2 simple visual aids (diagrams, images, or charts) that would help explain "${topic}" to a beginner. For each, provide a brief description in one sentence. Return the response as a list with each item starting with "Visual:" followed by the description.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text.split('\n').filter(line => line.startsWith('Visual:')).map(line => line.replace('Visual:', '').trim());
};

// Function to build prompt with conversation history
const buildPromptWithHistory = (message) => {
  const historyText = conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n');
  let prompt = `${historyText}\nUser: ${message}`;
  
  if (teachingMode && currentTopic) {
    prompt = `You are teaching the user about "${currentTopic}". Use the conversation history to provide context and connect to previous messages:\n${prompt}`;
  }
  
  return prompt;
};

// Function to check user's response to prerequisite or visuals question
const checkResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('yes') || lowerMessage.includes('know') || lowerMessage.includes('done')) {
    return 'yes';
  } else if (lowerMessage.includes('no') || lowerMessage.includes('not')) {
    return 'no';
  }
  return null;
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Add user message to history
    conversationHistory.push({ role: 'User', content: message });

    if (!teachingMode && isTeachRequest(message)) {
      // Start new teaching session
      const topicMatch = message.match(/(teach me |explain |how (to |do ) i|show me how |tell me about |what is )\s+(.+)/i);
      currentTopic = topicMatch ? topicMatch[2].trim() : message;
      prerequisites = await generatePrerequisites(currentTopic);
      teachingMode = true;

      const responseText = `Before I teach you about ${currentTopic}, do you know about these topics?\n1. ${prerequisites[0]}\n2. ${prerequisites[1]}\nPlease let me know if you're familiar with these or if you'd like me to explain them first!`;
      
      conversationHistory.push({ role: 'Bot', content: responseText });
      res.json({ reply: responseText });
    } else if (teachingMode) {
      const response = checkResponse(message);

      if (!visualsPending && prerequisites.length > 0 && checkResponse(message) === 'yes') {
        // User knows prerequisites, start teaching main topic
        pendingVisuals = await generateVisuals(currentTopic);
        const prompt = buildPromptWithHistory(`Great! Since you're familiar with the prerequisites, I'll start with an introductory explanation of ${currentTopic}.`);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text() + `\n\nAre you done with the theory and ready to see some visuals for ${currentTopic}?`;
        
        visualsPending = true;
        conversationHistory.push({ role: 'Bot', content: text });
        res.json({ reply: text });
      } else if (!visualsPending && prerequisites.length > 0 && checkResponse(message) === 'no') {
        // Teach first prerequisite
        pendingVisuals = await generateVisuals(prerequisites[0]);
        const prompt = buildPromptWithHistory(`No worries! I'll explain ${prerequisites[0]} first with an introductory explanation.`);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text() + `\n\nAre you done with the theory and ready to see some visuals for ${prerequisites[0]}?`;
        
        visualsPending = true;
        conversationHistory.push({ role: 'Bot', content: text });
        res.json({ reply: text });
      } else if (visualsPending && response === 'yes') {
        // Show visuals after theory
        let text = `Here are some visuals to help you understand ${currentTopic || prerequisites[0]}:`;
        pendingVisuals.forEach((visual, index) => {
          text += `\nVisual ${index + 1}: ${visual}`;
        });
        text += '\n\nWould you like to continue learning or ask something else?';
        
        visualsPending = false;
        conversationHistory.push({ role: 'Bot', content: text });
        res.json({ reply: text, visuals: pendingVisuals });
      } else if (visualsPending && response === 'no') {
        // Continue theory if not ready for visuals
        const prompt = buildPromptWithHistory(`Okay, let's continue with more explanation about ${currentTopic || prerequisites[0]}. What would you like to know more about?`);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text() + `\n\nAre you done with the theory and ready to see some visuals now?`;
        
        conversationHistory.push({ role: 'Bot', content: text });
        res.json({ reply: text });
      } else {
        // Continue teaching with context
        const prompt = buildPromptWithHistory(message);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Allow exiting teaching mode
        if (message.toLowerCase().includes('stop') || message.toLowerCase().includes('exit')) {
          teachingMode = false;
          currentTopic = null;
          prerequisites = [];
          visualsPending = false;
          pendingVisuals = [];
          text += '\nTeaching mode stopped. How can I assist you now?';
        }

        conversationHistory.push({ role: 'Bot', content: text });
        res.json({ reply: text });
      }
    } else {
      // Normal conversation mode
      const prompt = buildPromptWithHistory(message);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      conversationHistory.push({ role: 'Bot', content: text });
      res.json({ reply: text });
    }

    // Limit history size
    if (conversationHistory.length > 20) {
      conversationHistory.splice(0, conversationHistory.length - 20);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});