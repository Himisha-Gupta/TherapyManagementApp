// src/components/Navbar.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the patients_email cookie exists
    const email = Cookies.get('patients_email');
    if (!email) {
      navigate('/login'); // Redirect to the login page if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('patients_email'); // Remove the email from cookies
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Patient App</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">View Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/book-appointments">Book Appointments</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
