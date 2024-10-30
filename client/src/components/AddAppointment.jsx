// AddAppointment.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Cookies from 'js-cookie'; // Ensure you have js-cookie installed

const AddAppointment = () => {
  const [patientEmail, setPatientEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [slot, setSlot] = useState('');
  const [message, setMessage] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch the patient email from cookies
    const email = Cookies.get('patients_email');
    if (email) {
      setPatientEmail(email);
      fetchAppointments(email); // Fetch appointments for this email
    }
  }, []);

  const fetchAppointments = async (email) => {
    try {
      const response = await api.get(`/getappointmentsbyemail/${email}`); // Adjust your endpoint as needed
      setAppointments(response.data); // Assuming response data is an array of appointments
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/addappointment', {
        patientemail: patientEmail,
        appointmentdate: appointmentDate,
        slot: slot,
      });
      setMessage(response.data.message);
      // Clear the form fields after submission
      setAppointmentDate('');
      setSlot('');
      // Fetch updated appointments
      fetchAppointments(patientEmail);
    } catch (error) {
      console.error('Error adding appointment:', error);
      setMessage('Failed to add appointment. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Appointment</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientEmail" className="form-label">Patient Email</label>
          <input
            type="email"
            className="form-control"
            id="patientEmail"
            value={patientEmail}
            readOnly // Make email field read-only since it's fetched from cookies
          />
        </div>
        <div className="mb-3">
          <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="slot" className="form-label">Time Slot</label>
          <input
            type="time"
            className="form-control"
            id="slot"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Appointment</button>
      </form>

      {/* Displaying booked appointments */}
      <h3 className="mt-4">Booked Appointments</h3>
      {appointments.length > 0 ? (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Appointment Date</th>
              <th>Time Slot</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{new Date(appointment.appointmentdate).toLocaleDateString()}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No booked appointments found.</p>
      )}
    </div>
  );
};

export default AddAppointment;
