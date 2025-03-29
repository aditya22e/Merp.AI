// src/App.jsx
import React, { useState, useEffect } from 'react'
import UserIcon from './components/UserIcon'
import ChatInput from './components/ChatInput'
import ChatMessage from './components/ChatMessage'
import HistoryPanel from './components/HistoryPanel'
import axios from 'axios'

function App() {
  const [messages, setMessages] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    // Fetch chat history on mount
    axios.get('http://localhost:3000/api/history')
      .then(response => setHistory(response.data))
      .catch(error => console.error('Error fetching history:', error))
  }, [])

  const sendMessage = async (text) => {
    const userMessage = { sender: 'user', text, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])

    try {
      const response = await axios.post('http://localhost:3000/api/chat', { message: text })
      const botMessage = { sender: 'bot', text: response.data.reply, timestamp: new Date() }
      setMessages(prev => [...prev, botMessage])
      setHistory(prev => [...prev, { message: text, reply: response.data.reply, timestamp: new Date() }])
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="app">
      <UserIcon />
      <HistoryPanel history={history} />
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  )
}

export default App