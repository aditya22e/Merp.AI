import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState(() => JSON.parse(localStorage.getItem('chatSessions')) || []);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(sessions));
  }, [sessions]);

  const startNewSession = () => {
    const newSession = {
      id: Date.now(),
      title: `Session ${sessions.length + 1}`,
      messages: []
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    setMessages([]);
  };

  const loadSession = (sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!currentSessionId) {
      startNewSession();
    }

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setSessions(prev => {
      const updatedSessions = prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: [...s.messages, userMessage] }
          : s
      );
      return updatedSessions;
    });
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input
      });
      
      const botMessage = { 
        text: response.data.reply, 
        sender: 'bot',
        visuals: response.data.visuals || []
      };
      setMessages(prev => [...prev, botMessage]);
      setSessions(prev => {
        const updatedSessions = prev.map(s => 
          s.id === currentSessionId 
            ? { ...s, messages: [...s.messages, botMessage] }
            : s
        );
        return updatedSessions;
      });
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Error occurred', sender: 'bot', isError: true };
      setMessages(prev => [...prev, errorMessage]);
      setSessions(prev => {
        const updatedSessions = prev.map(s => 
          s.id === currentSessionId 
            ? { ...s, messages: [...s.messages, errorMessage] }
            : s
        );
        return updatedSessions;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div className="history-panel">
        <div className="user-profile">
          <img src={user.image} alt={user.name} className="user-image" />
          <span className="user-name">{user.name}</span>
        </div>
        <h3>Chat History</h3>
        <button onClick={startNewSession} className="new-session-btn">New Session</button>
        <ul className="session-list">
          {sessions.map(session => (
            <li 
              key={session.id} 
              onClick={() => loadSession(session.id)}
              className={`session-item ${currentSessionId === session.id ? 'active' : ''}`}
            >
              {session.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="chatbot-container">
        <div className="chat-header">
          <h2>AI Chat Assistant</h2>
        </div>
        <div className="chat-messages">
          {currentSessionId ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'} ${msg.isError ? 'error-message' : ''}`}
              >
                <span>{msg.text.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}</span>
                {msg.visuals && msg.visuals.length > 0 && (
                  <div className="visuals">
                    {msg.visuals.map((visual, i) => (
                      <div key={i} className="visual-item">
                        <strong>Visual {i + 1}:</strong> {visual}
                        <img 
                          src={`https://via.placeholder.com/200x150?text=${encodeURIComponent(visual)}`} 
                          alt={visual}
                          className="visual-image"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-session">Start a new session to begin chatting!</div>
          )}
          {loading && <div className="loading">AI is thinking...</div>}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={loading || !currentSessionId}
          />
          <button type="submit" disabled={loading || !currentSessionId}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;