import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({username: "", password: ""});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  const handleSub = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const matchedUser = users.find(
      user =>
        user.email === formData.email &&
      user.password === formData.password
    )

    if (matchedUser){
      localStorage.setItem("currentUser", JSON.stringify(matchedUser))
      navigate("/")
    }
  }
  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
      <form action="" onSubmit={handleSub}className='flex flex-col gap-4'>
        <label htmlFor="">
          <input type="text" name="email" placeholder='Username or Email' value={formData.email} onChange={handleChange} required
          className='w-full px-2 py-4 bg-gray-200 border-gray-400 border'
          />
        </label>
        <label htmlFor="">
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required
          className='w-full px-2 py-4 bg-gray-200 border-gray-400 border'
          />
        </label>
        <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600' type="submit">Login</button>
      </form>
      <p className='mt-4 text-center text-sm'>Don't have an account?  <a className='text-blue-600 underline ml-1' href="/signup">Sign Up</a></p>
    </div>
  )
}

export default Login