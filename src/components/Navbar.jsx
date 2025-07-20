// import React from 'react'
import { NavLink } from "react-router-dom";   

function Navbar() {
  const isLoggedIn = true; // replace with auth logic later
  const username = "rakibul";

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <NavLink to="/" className={'logo'}>
        <p>Logo</p>
      </NavLink>
    <nav>
      <NavLink to="/" className={({isActive})=> `nav-link ${isActive?'text-sky-500':'text-black'}`}>Home</NavLink>
      <NavLink to="/login" className={({isActive})=> `nav-link ${isActive?'text-sky-500':'text-black'}`}>Login</NavLink>
      <NavLink to="/signup" className={({isActive})=> `nav-link ${isActive?'text-sky-500':'text-black'}`}>Signup</NavLink>
      <NavLink to="/profile/" className={({isActive})=> `nav-link ${isActive?'text-sky-500':'text-black'}`}>Profile</NavLink>
      <NavLink to="/create" className={({isActive})=> `nav-link ${isActive?'text-sky-500':'text-black'}`}>Create Post</NavLink>
    </nav>
    </header>
    
    
  )
}

export default Navbar;