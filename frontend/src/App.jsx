import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import CreatePatient from './components/CreatePatient';
import Appointments from './components/Appointments';
import Login from './components/Login';
import Cookies from 'js-cookie';
import './App.css'; // Import the custom styles
import { FaUsers, FaUserPlus, FaCalendarAlt } from 'react-icons/fa'; // Importing icons

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('doctors_email'));
  const [activeTab, setActiveTab] = useState("patients");

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">Doctor Dashboard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeTab === "patients" ? "active" : ""}`}
                  to="/patients"
                  onClick={() => setActiveTab("patients")}
                >
                  <FaUsers className="me-1" /> View Patients
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeTab === "create-patient" ? "active" : ""}`}
                  to="/create-patient"
                  onClick={() => setActiveTab("create-patient")}
                >
                  <FaUserPlus className="me-1" /> Add Patient
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeTab === "appointments" ? "active" : ""}`}
                  to="/appointments"
                  onClick={() => setActiveTab("appointments")}
                >
                  <FaCalendarAlt className="me-1" /> View Appointments
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-5">
        <h1 className="text-center mb-4">Doctor Dashboard</h1>
        {!isLoggedIn ? (
          <div className="login-container">
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patient/:email" element={<PatientDetails />} />
            <Route path="/create-patient" element={<CreatePatient />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
