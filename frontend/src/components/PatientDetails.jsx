// components/PatientDetails.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../services/api';

function PatientDetails() {
  const { state } = useLocation();
  const { patient } = state;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [improvement, setImprovement] = useState('');
  const [feelingHappy, setFeelingHappy] = useState('');
  const [feelingSad, setFeelingSad] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [stressLevel, setStressLevel] = useState('');

  const handleAddMedicalHistory = async (e) => {
    e.preventDefault();
    const doctorEmail = Cookies.get('doctors_email');
    const historyData = {
      email: patient.email,
      title,
      description,
      improvement_out_of_10: improvement,
      doctor_email: doctorEmail,
    };

    try {
      await api.post('/addmedicalhistory', historyData);
      alert("Medical history added successfully");
      setTitle('');
      setDescription('');
      setImprovement('');
    } catch (err) {
      console.error("Error adding medical history:", err);
    }
  };

  const handleAddMoodData = async (e) => {
    e.preventDefault();
    const doctorEmail = Cookies.get('doctors_email');
    const moodData = {
      email: patient.email,
      feeling_happy: feelingHappy,
      feeling_sad: feelingSad,
      energy_level: energyLevel,
      sleep_quality: sleepQuality,
      stress_level: stressLevel,
      description: description,
    };

    try {
      await api.post('/addmooddata', moodData);
      alert("Mood data added successfully");
      setFeelingHappy('');
      setFeelingSad('');
      setEnergyLevel('');
      setSleepQuality('');
      setStressLevel('');
      setDescription('');
    } catch (err) {
      console.error("Error adding mood data:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Patient Details - {patient.name_}</h2>
      
      <h4>General Information</h4>
      <table className="table table-bordered">
        <tbody>
          <tr><th>Aadhaar</th><td>{patient.aadhaar}</td></tr>
          <tr><th>Age</th><td>{patient.age}</td></tr>
          <tr><th>Email</th><td>{patient.email}</td></tr>
          <tr><th>Gender</th><td>{patient.gender}</td></tr>
        </tbody>
      </table>

      <h4>Medical History</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Description</th>
            <th>Improvement</th>
            <th>Doctor Email</th>
          </tr>
        </thead>
        <tbody>
          {patient.medical_history.map((history, index) => (
            <tr key={index}>
              <td>{new Date(history.date).toLocaleDateString()}</td>
              <td>{history.title}</td>
              <td>{history.description}</td>
              <td>{history.improvement_out_of_10}/10</td>
              <td>{history.doctor_email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Medical Summary</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Feeling Happy (Out of 10)</th>
            <th>Feeling Sad (Out of 10)</th>
            <th>Energy Level</th>
            <th>Sleep Quality</th>
            <th>Stress Level</th>
          </tr>
        </thead>
        <tbody>
          {patient.medical_summary.map((summary, index) => (
            <tr key={index}>
              <td>{new Date(summary.date).toLocaleDateString()}</td>
              <td>{summary.description}</td>
              <td>{summary.feeling_happy}</td>
              <td>{summary.feeling_sad}</td>
              <td>{summary.energy_level}</td>
              <td>{summary.sleep_quality}</td>
              <td>{summary.stress_level}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Add Medical History</h4>
      <form onSubmit={handleAddMedicalHistory}>
        <div className="form-group">
          <label>Doctor Email</label>
          <input type="text" className="form-control" value={Cookies.get('doctors_email')} readOnly />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Improvement (Out of 10)</label>
          <input
            type="number"
            className="form-control"
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
            min="0"
            max="10"
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-2">Add Medical History</button>
      </form>

      <h4>Add Mood Data</h4>
      <form onSubmit={handleAddMoodData}>
        <div className="form-group">
          <label>Feeling Happy (Out of 10)</label>
          <input
            type="number"
            className="form-control"
            value={feelingHappy}
            onChange={(e) => setFeelingHappy(e.target.value)}
            min="0"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Feeling Sad (Out of 10)</label>
          <input
            type="number"
            className="form-control"
            value={feelingSad}
            onChange={(e) => setFeelingSad(e.target.value)}
            min="0"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Energy Level (Out of 10)</label>
          <input
            type="number"
            className="form-control"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(e.target.value)}
            min="0"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Sleep Quality (Out of 10)</label>
          <input
            type="number"
            className="form-control"
            value={sleepQuality}
            onChange={(e) => setSleepQuality(e.target.value)}
            min="0"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Stress Level (Out of 10)</label>
          <input
            type="number"
            className="form-control"
            value={stressLevel}
            onChange={(e) => setStressLevel(e.target.value)}
            min="0"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success mt-2">Add Mood Data</button>
      </form>
    </div>
  );
}

export default PatientDetails;
