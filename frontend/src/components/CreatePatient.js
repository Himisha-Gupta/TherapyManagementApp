import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

function CreatePatient() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/createuser', data);
      alert('Patient created successfully');
      reset();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register('name_')} required />
      
      <label>Email:</label>
      <input type="email" {...register('email')} required />
      
      <label>Age:</label>
      <input type="number" {...register('age')} required />
      
      <label>Gender:</label>
      <select {...register('gender')}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <button type="submit">Create Patient</button>
    </form>
  );
}

export default CreatePatient;
