// src/components/Medication.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Medication = ({ email }) => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/filterpatientsbyemail?email=${email}`);
      setMedications(response.data.medical_history || []);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  return (
    <div>
      <h2>Medications</h2>
      <ul>
        {medications.map((med, index) => (
          <li key={index}>{med.title}: {med.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Medication;
