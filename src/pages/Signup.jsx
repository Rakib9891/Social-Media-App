import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  const handleSub = (e) => {
    e.preventDefault();
    console.log("Signup data", formData);
    // Here you would typically send formData to your registration API
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow'>
      <h2 className='text-center font-bold text-2xl mb-6'>Sign Up</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSub}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Username' required/>

        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required/>

        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' required/>
        <button className='bg-blue-500 hover:bg-blue-600 py-2 px-4 text-white rounded' type="submit">Sign Up</button>
      </form>
      <p className='mt-6 text-center text-sm'>Already have an account? <Link className='underline text-blue-600 ml-1' to="/login">Login</Link></p>
    </div>
  )
}

export default Signup;