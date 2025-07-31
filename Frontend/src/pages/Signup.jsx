import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const validateForm = () => {
    if (!email || !username || !password) {
      handleError("All fields are required");
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      handleError("Invalid email format");
      return false;
    }

    if (username.length < 3) {
      handleError("Username must be at least 3 characters");
      return false;
    }

    if (password.length < 6) {
      handleError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { data } = await axios.post(
        "https://chat-server-j101.onrender.com/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/chats");
        }, 500);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Something went wrong. Try again.");
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="form_container">
      <h2 className="form_title">Signup Account</h2>
      <form onSubmit={handleSubmit} className="signup_form">
        <div className="form_group">
          <label htmlFor="email" className="form_label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="username" className="form_label">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
            className="form_input"
          />
        </div>
        <div className="form_group">
          <label htmlFor="password" className="form_label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            className="form_input"
          />
        </div>
        <button type="submit" className="submit-btn">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; Submit
        </button>
        <span className="login_redirect">
          Already have an account?{" "}
          <Link to={"/login"} className="login_link_1">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        closeButton={false}
        theme="dark"
      />
    </div>
  );
};

export default Signup;
