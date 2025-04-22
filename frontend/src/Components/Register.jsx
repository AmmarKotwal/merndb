import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from 'react';
import axios from 'axios';


export default function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [age, setAge] = useState(0);

  function clear() {
    setName("");
    setEmail("");
    setPass("");
    setAge(0);
  }

  function save_data() {
    try {
      axios.post("http://localhost:7062/ammar/reg", {
      name: name,
      email: email,
      password: pass,
      age: age
    })
    toast.success("Data Saved Successfully");
    clear();

    } catch (error) {
      toast.error(error)
      console.log(error)
    }
    
  }

  return (
    <div className='container'> <hr /><br />

      <h1>User Registration Form</h1><hr /><br />

      <label>Enter Your Name</label>
      <input className='form-control my-2' type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name' /><br /><br />
      <label>Enter Your Email</label>
      <input className='form-control my-2' type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email' /><br /><br />
      <label>Enter Your Password</label>
      <input className='form-control my-2' type="password" value={pass} onChange={(e)=> setPass(e.target.value)} placeholder='Enter Password' /><br /><br />
      <label>Enter Your Age</label>
      <input className='form-control my-2' type="number" value={age} onChange={(e)=> setAge(e.target.value)} placeholder='Enter Age' /><br /><br />
      <button className='btn btn-outline-success my-2' onClick={save_data}>Submit</button>
      <ToastContainer />

    </div>
  )
}
