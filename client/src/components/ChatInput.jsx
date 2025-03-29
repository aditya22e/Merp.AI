// src/components/ChatInput.jsx
import React, { useState } from 'react'
import { FaPaperPlane, FaBars } from 'react-icons/fa'

function ChatInput({ onSend }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onSend(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '10px', marginRight: '10px' }}>
        <FaBars style={{ cursor: 'pointer', color: '#667eea' }} />
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={{
          flex: 1,
          padding: '10px',
          borderRadius: '20px',
          border: '1px solid #ddd'
        }}
      />
      <button type="submit" style={{
        marginLeft: '10px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer'
      }}>
        <FaPaperPlane />
      </button>
    </form>
  )
}

export default ChatInput