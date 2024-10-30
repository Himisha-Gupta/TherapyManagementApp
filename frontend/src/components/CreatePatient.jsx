import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import Cookies from 'js-cookie';

function CreatePatient() {
  const { register, handleSubmit, reset } = useForm();
  const [doctorEmail, setDoctorEmail] = useState('');

  useEffect(() => {
    const email = Cookies.get('doctors_email'); // Get doctor email from cookies
    setDoctorEmail(email); // Store in state
    console.log(doctorEmail);
  }, []);

  const onSubmit = async (data) => {
    try {
      // First, create the patient
      await api.post('/createuser', data);

      // Then, add the initial medical history
      const medicalHistory = {
        email: data.email, // Patient email for lookup
        title: data.title,
        description: data.description,
        improvement_out_of_10: data.improvement_out_of_10,
        doctor_email: doctorEmail,
      };

      await api.post('/addmedicalhistory', medicalHistory);

      alert('Patient and initial medical history created successfully');
      reset();
    } catch (error) {
      console.error('Error creating patient or adding medical history:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add New Patient</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded bg-light">
        <h4>Patient Details</h4>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            {...register('name_')}
            required
            className="form-control"
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            {...register('email')}
            required
            className="form-control"
            placeholder="Enter email address"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            {...register('age')}
            required
            className="form-control"
            placeholder="Enter age"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <select {...register('gender')} className="form-select" required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            {...register('password')}
            required
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Aadhaar:</label>
          <input
            type="text"
            {...register('aadhaar')}
            required
            className="form-control"
            placeholder="Enter Aadhaar number"
          />
        </div>

        <h4>Initial Medical History</h4>
        <div className="mb-3">
          <label className="form-label">Condition Title:</label>
          <input
            {...register('title')}
            required
            className="form-control"
            placeholder="Enter condition title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            {...register('description')}
            required
            className="form-control"
            placeholder="Describe the condition"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Improvement (Out of 10):</label>
          <input
            type="number"
            {...register('improvement_out_of_10')}
            required
            className="form-control"
            placeholder="Rate improvement from 1 to 10"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Create Patient</button>
      </form>
    </div>
  );
}

export default CreatePatient;
