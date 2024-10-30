// components/PatientList.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const doctorEmail = Cookies.get('doctors_email');
      if (doctorEmail) {
        const response = await api.get(`/getpatientsbydoctor/${doctorEmail}`);
        setPatients(response.data);
      }
    };
    fetchPatients();
  }, []);

  const viewDetails = (patient) => {
    navigate(`/patient/${patient.email}`, { state: { patient } });
  };

  return (
    <div className="container mt-4">
      <h2>Patients</h2>
      <div className="list-group">
        {patients.map((patient, index) => (
          <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
              <h5>{patient.name_}</h5>
              <p className="mb-0">Email: {patient.email}</p>
              <p className="mb-0">Age: {patient.age}</p>
            </div>
            <button className="btn btn-primary" onClick={() => viewDetails(patient)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientList;
