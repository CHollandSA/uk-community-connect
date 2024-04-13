import React, { useState } from "react";

const Signup = ({ handleSignUp, setShowSignUp }) => {
  // State variables to manage form input values and component state
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isOrganization, setIsOrganization] = useState(false); // State for checkbox
  const [companyName, setCompanyName] = useState(""); // State for company name
  const [error, setError] = useState(""); // State for error message

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Validation checks
    if (
      !name ||
      !surname ||
      !username ||
      !email ||
      !password ||
      !repeatPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      password.length <= 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      setError(
        "Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    // Additional validation for company name if signing up as an organization
    if (isOrganization && !companyName) {
      setError("Please provide the company name");
      return;
    }

    // Call the handleSignUp function passed from the parent component
    const success = await handleSignUp(
      name,
      surname,
      username,
      email,
      password,
      isOrganization,
      companyName
    );

    // Handle success or failure of signup attempt
    if (success) {
      setShowSignUp(false); // Close the signup form if signup is successful
    } else {
      setError("Username or email already taken"); // Display error message if signup fails
    }
  };

  // JSX for the Signup component
  return (
    <form className="sign-up" onSubmit={handleSubmit}>
      {/* Display error message if there's an error */}
      {error && <p className="errorMessage">Error: {error}</p>}
      {/* Form input fields */}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          className="form-control"
          id="surname"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
      </div>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
      <div className="form-group">
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          className="form-control"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
        />
      </div>
      {/* Checkbox for organization signup */}
      <div className="form-group">
        <input
          type="checkbox"
          id="isOrganization"
          checked={isOrganization}
          onChange={(event) => setIsOrganization(event.target.checked)}
        />
        <label htmlFor="isOrganization">
          Are you signing up as part of an organization?
        </label>
      </div>
      {/* Additional input field for company name if signing up as organization */}
      {isOrganization && (
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </div>
      )}
      {/* Form submission and close buttons */}
      <div className="btnLogin">
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowSignUp(false)}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default Signup;
