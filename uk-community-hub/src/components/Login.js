import React, { useState } from "react";
import "./App.css";

// Login component definition
const Login = ({ handleLogin, setShowLogin }) => {
  // State variables to manage username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call handleLogin function with username and password parameters
    handleLogin(username, password);
    // Close the login modal after submission
    setShowLogin(false);
  };

  // Return JSX for the Login component
  return (
    <form className="login" onSubmit={handleSubmit}>
      {/* Username input field */}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      {/* Password input field */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {/* Login and Close buttons */}
      <div className="btnLogin">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {/* Close button to hide the login modal */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowLogin(false)}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default Login;
