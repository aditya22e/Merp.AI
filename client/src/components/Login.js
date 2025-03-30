import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    // Simulate login (replace with actual authentication logic)
    const user = {
      name: username,
      image: 'https://via.placeholder.com/40?text=' + username.charAt(0).toUpperCase()
    };
    
    // Call the onLogin prop to pass user data to parent component
    onLogin(user);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Log in to your AI Chat Assistant</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="#signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;