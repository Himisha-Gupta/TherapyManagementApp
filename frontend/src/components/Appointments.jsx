import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await api.get('/getappointments'); // Ensure this endpoint exists and works
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Function to toggle appointment status
  const toggleStatus = async (appointment) => {
    const newStatus = appointment.status === 'incomplete' ? 'confirmed' : 'incomplete';
    try {
      await api.post('/appointmentstatusupdate', {
        _id: appointment._id,
        status: newStatus,
      });
      console.log(`Updated appointment ${appointment._id} to ${newStatus}`);
      await fetchAppointments(); // Wait for fetchAppointments to complete after update
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Appointments</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Patient Email</th>
            <th>Appointment Date</th>
            <th>Slot</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.patientemail}</td>
              <td>{new Date(appointment.appointmentdate).toLocaleString()}</td>
              <td>{appointment.slot}</td>
              <td>{appointment.status}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleStatus(appointment)}
                >
                  {appointment.status === 'incomplete' ? 'Confirm' : 'Unconfirm'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
