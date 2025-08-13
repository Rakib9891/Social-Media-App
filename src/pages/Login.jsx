import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/login_bg.jpg";

function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSub = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      setCurrentUser(matchedUser);
      navigate("/");
    } else {
      alert("Invail Username or Password");
      return;
    }
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
            Welcome!
          </h2>
          <form onSubmit={handleSub} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Username or Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input bg-gradient-to-br from-[#19334d] via-[#31618f] to-[#2282e3]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input bg-gradient-to-br from-[#19334d] via-[#31618f] to-[#2282e3] "
            />

            <button
              className="bg-gradient-to-br from-[#19334d] via-[#31618f] to-[#2282e3] text-white py-2 px-4 hover:bg-[#19334d]  rounded-2xl transition shadow-md"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}

            <Link className="underline  ml-1" to="/signup">
              Sign Up
            </Link>
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
