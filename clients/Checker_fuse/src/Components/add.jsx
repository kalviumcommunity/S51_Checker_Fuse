import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../Components/Add.css";
import { useForm } from 'react-hook-form';
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().label('Name'),
  location: Joi.string().allow('').optional().label('Location'),
  age: Joi.number().integer().min(18).max(120).required().label('Age'),
});

function Add() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const nav = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const { error } = userSchema.validate(data); // Validate data using Joi schema
      if (error) {
        throw error; // Re-throw the error for display in form
      }

      // Send validated data to the backend
      const response = await axios.post("http://localhost:3000/post", data);
      console.log(response);
      nav("/");
    } catch (err) {
      console.error(err); // Handle validation or API errors
    }
  };

  return (
    <div className='container'>
      <p>Insert Peer</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            className='name'
            name='name'
            {...register('name', { required: true, maxLength: 30 })}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className='error'>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor='Location'>Location:</label>
          <input
            type='text'
            className='Location'
            name='location'
            {...register('location')} // No validation for optional field
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <span className='error'>{errors.location.message}</span>}
        </div>
        <div>
          <label htmlFor='Age'>Age:</label>
          <input
            type='text'
            className='Age'
            name='age'
            {...register('age', { required: true, min: 18, max: 120 })} // Register with validation rules
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <span className='error'>{errors.age.message}</span>}
        </div>

        <button type='submit' className='buttons'>
          Insert
        </button>
      </form>
    </div>
  );
}

export default Add;
