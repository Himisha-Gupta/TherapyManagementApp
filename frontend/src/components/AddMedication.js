import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

function AddMedication() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/addmedicalhistory', data);
      alert('Medication added successfully');
      reset();
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email:</label>
      <input type="email" {...register('email')} required />
      
      <label>Title:</label>
      <input {...register('title')} required />
      
      <label>Description:</label>
      <textarea {...register('description')} required />

      <button type="submit">Add Medication</button>
    </form>
  );
}

export default AddMedication;
