import React, { useState, useEffect } from 'react';
import api from '../services/api';

function PatientMoodHistory() {
  const [moodHistory, setMoodHistory] = useState([]);

  const fetchMoodHistory = async (email) => {
    try {
      const response = await api.get('/viewmooddatabyemail', { params: { email } });
      setMoodHistory(response.data);
    } catch (error) {
      console.error('Error fetching mood history:', error);
    }
  };

  return (
    <>
    <div>
      <h2>Patient Mood History</h2>
      <input
        type="email"
        placeholder="Enter patient email"
        onBlur={(e) => fetchMoodHistory(e.target.value)}
      />
      <ul>
        {moodHistory.map((mood, index) => (
          <li key={index}>
            {mood.date} - Happy: {mood.feeling_happy}, Sad: {mood.feeling_sad}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default PatientMoodHistory;
