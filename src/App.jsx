
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Always visible */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
