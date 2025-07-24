import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email: "", password: ""});

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
      setCurrentUser(matchedUser)
      navigate("/")
    }
    else{
      alert("Invail Username or Password")
      return
    }
  }
  return (
    <div className=' max-w-md mx-auto mt-10 p-6 bg-white shadow'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
      <form onSubmit={handleSub}className='flex flex-col gap-4'>
    
          <input type="email" name="email" placeholder='Username or Email' value={formData.email} onChange={handleChange} required
          className='input'
          />
    
    
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required
          className='input'
          />
    
        <button className='bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 rounded-lg transition' type="submit">Login</button>
      </form>
      <p className='mt-4 text-center text-sm'>Don't have an account?  <a className='text-blue-600 underline ml-1' href="/signup">Sign Up</a></p>
    </div>
  )
}

export default Login;