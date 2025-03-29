// src/components/ChatMessage.jsx
import React from 'react'

function ChatMessage({ message }) {
  return (
    <div className={`message ${message.sender}`} style={{
      margin: '10px 0',
      padding: '10px',
      borderRadius: '8px',
      maxWidth: '70%',
      alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
      background: message.sender === 'user' ? '#667eea' : '#e9ecef',
      color: message.sender === 'user' ? 'white' : 'black'
    }}>
      {message.text}
    </div>
  )
}

export default ChatMessage