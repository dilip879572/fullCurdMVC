import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const loginWithGoogle = () => {
    window.open("http://localhost:6085/auth/google/callback", "_self");
  };

  const register = async () => {
    try {
      if (!name || !email || !password || !contact) {
        alert("Please fill in all fields.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, contact }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        toast.success("Registration was successful");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        console.error(
          "Registration failed:",
          responseData.error || "Unknown error"
        );
        alert(
          "Registration failed. Please check your information and try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <br />
      <div className="row mt-5 registration">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div className="row mt-1   m-2 regist">
            <br />

            <div className="col-sm-2"></div>
            <div className="col-sm-4 mt-1 ">
              <center>
                <h5>
                  Get Started With Resume4U Get started with resume building
                </h5>
              </center>
              <label
                className="text-inverse m-2"
                htmlFor="validationCustomName"
              >
                <b style={{ color: "red", fontSize: "20px" }}> Name</b>
              </label>
              <input
                type="text"
                className="form-control m-1"
                id="validationCustomName"
                placeholder="First name"
                defaultValue="Dilip Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label
                className="text-inverse m-2"
                htmlFor="validationCustomName"
              >
                <b style={{ color: "red", fontSize: "20px" }}> Email</b>
              </label>
              <input
                type="text"
                className="form-control m-1"
                id="validationCustomName"
                placeholder="dilip.879572@gmail.com"
                defaultValue="#"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label
                className="text-inverse m-2"
                htmlFor="validationCustomName"
              >
                <b style={{ color: "red", fontSize: "20px" }}> Number</b>
              </label>
              <input
                type="text"
                className="form-control m-1"
                id="validationCustomName"
                placeholder="+91-8795720084"
                defaultValue="#"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <label
                className="text-inverse m-2"
                htmlFor="validationCustomName"
              >
                <b style={{ color: "red", fontSize: "20px" }}>Password</b>
              </label>
              <input
                type="password"
                className="form-control m-1"
                id="validationCustomName"
                placeholder="Password"
                defaultValue="dilip@1234"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              {/* <Link href=""> */}{" "}
              <button
                className="btn btn-danger mt-4  form-control"
                onClick={register}
              >
                Create Account
              </button>
              {/* </Link> */}
              <center>
                <p className="message">
                  Not Sign <a href="/">Create an account</a>
                </p>
              </center>
              <center>
                By continuing you indicate that you read and agreed to the{" "}
                <a href="https://resume4u.io/policies"> Policies.</a>
              </center>
              <br />
            </div>
            <div className="col-sm-6  mt-5">
              <img
                src="https://img.freepik.com/premium-vector/social-media-content-flat-illustration-online-post_203633-6731.jpg"
                style={{ height: "400px", width: "100%" }}
              />
              <br />
              <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                  <br />
                  <button
                    className="login-with-google-btn form-control m-1"
                    onClick={loginWithGoogle}
                  >
                    Sign In With Google
                  </button>
                </div>
                <div className="col-sm-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2"></div>

        <ToastContainer />
      </div>
      <br />
    </div>
  );
}
