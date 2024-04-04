"use client"
import React, { useState } from "react";
import "./Home.css";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }

      const data = { email, password };
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const token = result.token; 
        localStorage.setItem("token", token);
        toast.success("Login was successful.");
        setTimeout(() => {
          window.location.href = "/Adddata";
        }, 2000);
      } else {
        toast.error(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user">
                  {" "}
                  <FaUserAlt />
                </i>
                <input
                  type="text"
                  className="login__input"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="User name / Email"
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock">
                  <RiLockPasswordFill />
                </i>
                <input
                  type="password"
                  className="login__input"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                />
              </div>
              <button type="button" className="button login__submit" onClick={handleLogin}>
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <Link to="/Register">
                <p>Register</p>
              </Link>
            </form>
            <div className="social-login">
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram">
                  {" "}
                  <FaInstagramSquare />
                </a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
