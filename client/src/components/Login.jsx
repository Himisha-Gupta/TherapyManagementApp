// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      console.log(response);
      if (response.data.message === "Login successful") {
        // Set the user's email in cookies
        Cookies.set('patients_email', email, { expires: 7 }); // Cookie expires in 7 days
        // setUser(email); // Update the user state
        navigate('/dashboard'); // Navigate to the dashboard
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
