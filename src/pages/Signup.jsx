import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/login_bg.jpg";

function Signup({ setCurrentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSub = (e) => {
    e.preventDefault();
    console.log("Signup data", formData);
    // Here you would typically send formData to your registration API
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // check if already exists

    const userExists = users.find((u) => u.email === formData.email);
    if (userExists) {
      alert("This email already has an account ");
      return;
    }

    // adding user to arry
    const allUserList = [...users, formData];
    localStorage.setItem("users", JSON.stringify(allUserList));

    // setting current user (login)
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setCurrentUser(formData);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-dvh w-dvw  bg-gradient-to-br from-[#19334d] via-[#31618f] to-[#2282e3]">

      <div className="flex h-[80vh] w-[80vw] shadow-2xl rounded-2xl overflow-hidden">

        <div
          style={{ backgroundImage: `url(${loginBg})` }}
          className="w-2/3 bg-cover bg-center bg-no-repeat"
        ></div>

        <div className=" bg-[#4a90ce] p-20  w-1/3 backdrop-blur-xl flex flex-col justify-center items-center text-white">

          <h2 className="text-2xl font-bold mb-6 text-center text-[#f6f8f5] shadow-2xl">
            Sign Up
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSub}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="input bg-gradient-to-br from-[#19334d] via-[#31618f] to-[#2282e3]"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="input bg-gradient-to-br from-[#19334d] via-[#31618f] to-[#2282e3]"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="input bg-gradient-to-br from-[#19334d] via-[#31618f] to-[#2282e3]"
            />
            <button
              className="bg-gradient-to-br from-[#19334d] via-[#31618f] to-[#2282e3] text-white py-2 px-4 hover:bg-[#19334d]  rounded-2xl transition shadow-md"
              type="submit"
            >
              Sign Up
            </button>

          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            
            <Link className="underline text-blue-600 ml-1" to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
