// import React from 'react'
import { NavLink } from "react-router-dom";

function Navbar() {
  const isLoggedIn = true; // replace with auth logic later
  const username = "rakibul";

  return (
    <header className="flex justify-between items-center px-2 py-1 bg-white shadow fixed top-0 left-0 right-0 z-50">
      <NavLink to="/" className={"logo text-xl font-bold"}>
        <p className="text-blue-500">My App</p>
      </NavLink>

      <nav className="flex space-x-6 text-sm font-medium text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? "text-sky-500" : "text-black"}`
          }
        >
          Home
        </NavLink>

        {/* <NavLink to="/login" className={({isActive})=> `nav-link ${isActive?'text-sky-500':'text-black'}`}>Login</NavLink> */}

        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `nav-link ${isActive ? "text-sky-500" : "text-black"}`
          }
        >
          Signup
        </NavLink>

        <NavLink
          to="/profile/"
          className={({ isActive }) =>
            `nav-link ${isActive ? "text-sky-500" : "text-black"}`
          }
        >
          Profile
        </NavLink>

        {/* <NavLink to="/create" className={({isActive})=> `nav-link ${isActive?'text-sky-500':'text-black'}`}>Create Post</NavLink> */}
      </nav>
    </header>
  );
}

export default Navbar;
