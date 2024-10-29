import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await api.get('/filterpatientsbyemail');
      setPatients(response.data);
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>
            {patient.name_} - {patient.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
