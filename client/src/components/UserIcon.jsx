import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

function UserIcon() {
  return (
    <div className="user-icon" style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      fontSize: '40px',
      color: '#667eea'
    }}>
      <FaUserCircle />
    </div>
  )
}

export default UserIcon