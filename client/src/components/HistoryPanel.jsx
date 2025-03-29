// src/components/HistoryPanel.jsx
import React from 'react'

function HistoryPanel({ history }) {
  return (
    <div className="history-panel" style={{
      width: '250px',
      background: '#fff',
      borderRight: '1px solid #ddd',
      padding: '40px',
      overflowY: 'auto'
    }}>
      <h3>Chat History</h3>
      {history.length === 0 ? (
        <p>No history yet</p>
      ) : (
        history.map((item, index) => (
          <div key={index} style={{ marginBottom: '15px', border: '2px solid #eee', paddingBottom: '10px', }}>
            <p style={{ fontSize: '12px', color: '#666' }}>
              {new Date(item.timestamp).toLocaleString()}
            </p>
            <p style={{ fontWeight: 'bold' }}>You: {item.message}</p>
            <p>Bot: {item.reply}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default HistoryPanel