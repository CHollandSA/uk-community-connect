import React, { useState, useEffect } from "react";
import "./Hero.css";
import "./Header.css";
import Login from "./Login";
import Signup from "./Signup";

// Header component definition
const Header = () => {
  // State variables
  const [showLogin, setShowLogin] = useState(false); // Toggle for displaying login form
  const [showSignUp, setShowSignUp] = useState(false); // Toggle for displaying signup form
  const [userName, setUserName] = useState(""); // User's username
  const [showButtons, setShowButtons] = useState(false); // Toggle for displaying navigation buttons

  // Effect hook to set username from local storage when component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Function to toggle display of navigation buttons
  const toggleButtons = () => {
    setShowButtons(!showButtons);
    // Close login and signup forms when toggling buttons
    setShowLogin(false);
    setShowSignUp(false);
  };

  // Function to handle login
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ username, password }), // Convert data to JSON format
      });

      const data = await response.json();
      let userType;

      if (data.success) {
        setUserName(data.user.username);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("userId", data.user.userID);

        // Check if the logged-in user is an organization
        if (data.user.company === 1) {
          // Use the correct property name here
          localStorage.setItem("organization", "1"); // Set organization to '1' if organizerid is '1'
          userType = "Organization";
        } else {
          localStorage.setItem("organization", "0"); // Otherwise, set organization to '0'
          userType = "Individual";
        }

        // Reload the page after login
        window.location.reload();
        window.alert(
          `Welcome back, ${data.user.firstName}!\nYour user type is: ${userType}`
        );
      } else {
        console.log("User not found");
        window.alert("Username or password is incorrect");
      }
    } catch (error) {
      console.error("Error making API call:", error);
      window.alert("Username or password is incorrect");
    }
  };

  // Function to handle signup
  const handleSignUp = async (
    name,
    surname,
    username,
    email,
    password,
    isOrganization,
    companyName
  ) => {
    try {
      const response = await fetch("http://localhost:8081/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          username,
          email,
          password,
          isOrganization: isOrganization ? "true" : "false", // Converted to string for consistency
          companyName,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        window.alert("You have successfully signed up!\nYou may now sign in.");
        return true;
      } else {
        console.error(data.error);
        return false;
      }
    } catch (error) {
      console.error("Error signing up:", error);
      return false;
    }
  };
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("organization"); // Remove organization from local storage
    setUserName("");
    window.location.reload();
  };

  // Function to scroll to a specific section
  const scrollToSection = (section) => {
    const element = document.querySelector(`.${section}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      console.error(`Element with class '${section}' not found.`);
    }
  };

  return (
    <header className="header">
      {/* Logo and title */}
      <div className="oppositeEndsLine">
        <img src="./images/UKCCLogo.png" alt="UKCC" className="logo" />
        <h1 className="title">UK Community Connect</h1>
        {/* Toggle buttons for navigation */}
        <div className="showButtons">
          {showButtons ? (
            <img
              className="close"
              src=".\images\close.png"
              onClick={toggleButtons}
              alt="menu"
            />
          ) : (
            <img
              className="burger"
              src=".\images\hamburger.png"
              onClick={toggleButtons}
              alt="menu"
            />
          )}
          {userName && <p className="user-name">{userName}</p>}
        </div>
      </div>

      <div className="header-content">
        {/* Navigation buttons */}
        {showButtons && (
          <div className="container">
            <nav>
              <ul className="nav-list">
                <li>
                  <a
                    href="#info"
                    onClick={() => scrollToSection("div-heading")}
                  >
                    <u>Info</u>
                  </a>
                </li>
                <li>
                  <a
                    href="#citizenship"
                    onClick={() => scrollToSection("citizenship")}
                  >
                    <u>Citizenship</u>
                  </a>
                </li>
                <li>
                  <a
                    href="#volunteering"
                    onClick={() => scrollToSection("volunteering")}
                  >
                    <u>Volunteer</u>
                  </a>
                </li>
                <li>
                  <a href="#booking" onClick={() => scrollToSection("booking")}>
                    <u>Book</u>
                  </a>
                </li>
              </ul>
            </nav>
            {/* Login, signup, and logout buttons */}
            <div className="container2">
              {!userName ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowLogin(true);
                      setShowSignUp(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowSignUp(true);
                      setShowLogin(false);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <hr className="header-line" />

      {/* Login form */}
      {showLogin && (
        <div>
          <Login handleLogin={handleLogin} setShowLogin={setShowLogin} />
          <hr className="header-line" />
        </div>
      )}
      {/* Signup form */}
      {showSignUp && (
        <div>
          <Signup handleSignUp={handleSignUp} setShowSignUp={setShowSignUp} />
          <hr className="header-line" />
        </div>
      )}
    </header>
  );
};

export default Header;
