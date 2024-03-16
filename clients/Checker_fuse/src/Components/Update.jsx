import React, { useState, useEffect } from 'react';
import "../Components/Add.css";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi'; // Import Joi for validation

// Define Joi schema for validation
const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().label('Name'),
    location: Joi.string().allow('').optional().label('Location'),
    age: Joi.number().integer().min(18).max(120).required().label('Age'),
    dob: Joi.date().label('Date of Birth') // Assuming DOB is a date field
});

function Update() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        console.log("ID:", id); // Debugging: Check the value of id
        axios.get('http://localhost:3000/get/' + id)
            .then(result => {
                setName(result.data.name);
                setLocation(result.data.Location);
                setAge(result.data.Age);
                setDob(result.data.DOB); // Set DOB from fetched data
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate data using Joi schema
        const { error } = schema.validate({ name, location, age, dob });
        if (error) {
            console.error(error);
            return; // Stop submission if validation fails
        }

        axios.patch("http://localhost:3000/patch/" + id, { name, Location: location, Age: age, DOB: dob }) // Included DOB in data object
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <p>Update Peer</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' className='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='Location'>Location:</label>
                    <input type='text' className='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='Age'>Age:</label>
                    <input type='text' className='Age' value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='DOB'>Date of Birth:</label>
                    <input type='text' className='DOB' value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>

                <button type='submit' className='buttons'>Update</button>
            </form>
        </div>
    )
}

export default Update;
