
import './App.css'
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"))
  })
  return (
    <Router>
      <div>
       { currentUser && <Navbar /> }
        <Routes>
          <Route path="/" element={currentUser?<Home/>:<Login setCurrentUser={setCurrentUser}/>} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser}/>} />
          <Route path="/profile" element={currentUser?<Profile />: <Login/>} />
          <Route path="/create" element={currentUser?<CreatePost />:<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
