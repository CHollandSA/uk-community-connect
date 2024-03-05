import React, { useState } from "react";
//import './Login.css';
import "./App.css";

const Login = ({ handleLogin, setShowLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Pass the username and password to handleLogin
    handleLogin(username, password);
    setShowLogin(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="btnLogin">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
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
