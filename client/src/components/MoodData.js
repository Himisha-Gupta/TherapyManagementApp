// src/components/MoodData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoodData = ({ email }) => {
  const [moodData, setMoodData] = useState([]);
  const [newMood, setNewMood] = useState({
    feeling_happy: 0,
    feeling_sad: 0,
    feeding_shaddy: 0,
    description: '',
  });

  useEffect(() => {
    fetchMoodData();
  }, []);

  const fetchMoodData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/viewmooddatabyemail?email=${email}`);
      setMoodData(response.data);
    } catch (error) {
      console.error("Error fetching mood data:", error);
    }
  };

  const addMoodData = async () => {
    try {
      await axios.post('http://localhost:5000/addmooddata', { ...newMood, email });
      fetchMoodData();
    } catch (error) {
      console.error("Error adding mood data:", error);
    }
  };

  const deleteMoodData = async (moodId) => {
    try {
      await axios.delete('http://localhost:5000/deletemood', { data: { email, mood_id: moodId } });
      fetchMoodData();
    } catch (error) {
      console.error("Error deleting mood data:", error);
    }
  };

  return (
    <div>
      <h2>Mood Data</h2>
      <div>
        <input type="text" placeholder="Description" onChange={(e) => setNewMood({ ...newMood, description: e.target.value })} />
        <button onClick={addMoodData}>Add Mood</button>
      </div>
      <ul>
        {moodData.map((mood, index) => (
          <li key={index}>
            {mood.description} - {mood.date}
            <button onClick={() => deleteMoodData(mood._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodData;
