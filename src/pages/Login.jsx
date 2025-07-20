import React, { useState } from 'react'

function Login() {
  const [formData, setFormData] = useState({username: "", password: ""});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  const handleSub = (e) => {
    e.preventDefault();
    console.log("Login data", formData);
    // Here you would typically send formData to your authentication API
  }
  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
      <form action="" onSubmit={handleSub}className='flex flex-col gap-4'>
        <label htmlFor="">
          <input type="text" name="username" placeholder='Username or Email' value={formData.username} onChange={handleChange} required/>
        </label>
        <label htmlFor="">
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required/>
        </label>
        <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600' type="submit">Login</button>
      </form>
      <p className='mt-4 text-center text-sm'>Don't have an account?  <a className='text-blue-600 underline ml-1' href="/signup">Sign Up</a></p>
    </div>
  )
}

export default Login