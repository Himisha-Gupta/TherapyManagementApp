import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // Assuming you'll pass the patient's email via URL params
import axios from 'axios';
import Cookies from 'js-cookie';
import api from '../services/api';

const PatientDetails = () => {
//   const { email } = useParams(); // Get email from URL params
  const [patient, setPatient] = useState(null);
  const [description, setDescription] = useState('');
  const [feelingHappy, setFeelingHappy] = useState(0);
  const [feelingSad, setFeelingSad] = useState(0);
  const [feedingShaddy, setFeedingShaddy] = useState(0);
 
  const [patientEmail, setPatientEmail] = useState('');

 
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const email = Cookies.get('patients_email'); // Get doctor email from cookies
        setPatientEmail(email);
        console.log(patientEmail);
        const response = await api.get(`/filterpatientsbyemail/${email}`);
        setPatient(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    fetchPatientDetails();
  }, [patientEmail]);

  const handleAddMoodSummary = async (e) => {
    e.preventDefault();
    const moodData = {
      email: patientEmail,
      feeling_happy: feelingHappy,
      feeling_sad: feelingSad,
      feeding_shaddy: feedingShaddy,
      description,
    };

    try {
      await api.post('/addmooddata', moodData);
      alert("Mood data added successfully");
      // Reset form fields
      setDescription('');
      setFeelingHappy(0);
      setFeelingSad(0);
      setFeedingShaddy(0);
    } catch (err) {
      console.error("Error adding mood data:", err);
    }
  };

  if (!patient) {
    return <p>Loading patient details...</p>;
  }

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
            <th>Description</th>
            <th>Doctor Email</th>
            <th>Improvement (Out of 10)</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {patient.medical_history.map((history, index) => (
            <tr key={index}>
              <td>{new Date(history.date).toLocaleDateString()}</td>
              <td>{history.description}</td>
              <td>{history.doctor_email}</td>
              <td>{history.improvement_out_of_10}</td>
              <td>{history.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Mood Summary</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Feeling Shady (Out of 10)</th>
            <th>Feeling Happy (Out of 10)</th>
            <th>Feeling Sad (Out of 10)</th>
          </tr>
        </thead>
        <tbody>
          {patient.medical_summary.map((summary, index) => (
            <tr key={index}>
              <td>{new Date(summary.date).toLocaleDateString()}</td>
              <td>{summary.description}</td>
              <td>{summary.feeding_shaddy}</td>
              <td>{summary.feeling_happy}</td>
              <td>{summary.feeling_sad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Add Mood Summary</h4>
      <form onSubmit={handleAddMoodSummary}>
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
          <label>Feeling Shady (Out of 10)</label>
          <input
            type="number"
            className="form-control"
            value={feedingShaddy}
            onChange={(e) => setFeedingShaddy(e.target.value)}
            min="0"
            max="10"
            required
          />
        </div>
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
        <button type="submit" className="btn btn-success mt-2">Add Mood Summary</button>
      </form>
    </div>
  );
};

export default PatientDetails;
