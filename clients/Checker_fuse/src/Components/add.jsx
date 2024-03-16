import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../Components/Add.css"
function Add() {
  const [name, setName] = useState('');
  const [Location, setLocation] = useState('');
  const [Age, setAge] = useState('');
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("I'm comming")
    // Do something with the form data, like sending it to an API
    axios.post("http://localhost:3000/post", { name, Location, Age })
      .then(result => {
        console.log(result);
        nav("/")
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <p>Insert Peer</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' className='name' name='name' onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div>
          <label htmlFor='Location'>Location:</label>
          <input type='text' className='Location' name='Location' onChange={(e) => setLocation(e.target.value)} value={Location} />
        </div>
        <div>
          <label htmlFor='Age'>Age:</label>
          <input type='text' className='Age' name='Age' onChange={(e) => setAge(e.target.value)} value={Age} />
        </div>

        <button type='submit' onClick={handleSubmit} className='buttons'>Insert</button>
      </form>
    </div>
  );
}
export default Add;