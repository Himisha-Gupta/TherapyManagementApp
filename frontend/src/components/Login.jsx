// Login.js
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication
    if (email === 'doctor1@gmail.com' && password === 'doctor1234') {
      Cookies.set("doctors_email","doctor1@gmail.com")
      onLoginSuccess();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      backgroundColor: '#f7f9fc',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '50px auto',
    }}>
      <h2 className="text-center" style={{ color: '#343a40', marginBottom: '20px' }}>Login to Your Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={{
              borderRadius: '5px',
              border: '1px solid #ced4da',
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            style={{
              borderRadius: '5px',
              border: '1px solid #ced4da',
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" style={{ borderRadius: '5px' }}>Login</button>
      </form>
      <p className="text-center mt-3">
        <a href="#" style={{ color: '#007bff' }}>Forgot password?</a>
      </p>
    </div>
  );
};

export default Login;
