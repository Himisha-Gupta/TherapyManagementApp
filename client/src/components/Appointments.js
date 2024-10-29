// src/components/Appointments.js
import React, { useState } from 'react';
import axios from 'axios';

const Appointments = ({ email }) => {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  const bookAppointment = async () => {
    try {
      await axios.post('http://localhost:5000/addappointment', {
        patientemail: email,
        appointmentdate: date,
        slot,
      });
      alert("Appointment booked successfully");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Slot" onChange={(e) => setSlot(e.target.value)} />
      <button onClick={bookAppointment}>Book</button>
    </div>
  );
};

export default Appointments;
