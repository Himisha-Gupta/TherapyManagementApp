// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route ,  Link } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import CreatePatient from './components/CreatePatient';
import Appointments from './components/Appointments';
import Login from './components/Login';
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('doctors_email'));
  const [activeTab, setActiveTab] = useState("patients");
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Doctor Dashboard</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeTab === "patients" ? "active" : ""}`}
                    to="/patients"
                    onClick={() => setActiveTab("patients")}
                  >
                    View Patients
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeTab === "create-patient" ? "active" : ""}`}
                    to="/create-patient"
                    onClick={() => setActiveTab("create-patient")}
                  >
                    Add Patient
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeTab === "appointments" ? "active" : ""}`}
                    to="/appointments"
                    onClick={() => setActiveTab("appointments")}
                  >
                    View Appointments
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      <div className="container mt-5">
        <h1 className="text-center">Doctor Dashboard</h1>
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
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
