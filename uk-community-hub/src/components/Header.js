import React, { useState, useEffect } from "react";
import "./Hero.css";
import "./Header.css";
import Login from "./Login";
import Signup from "./Signup";

const Header = () => {
  //these variables store
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Set username from local storage when component mounts
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
    // Close login and signup forms when toggling buttons
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(
        `https://express-backend-plum.vercel.app/login/${username}/${password}`
      );

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
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleSignUp = async (
    name,
    surname,
    username,
    email,
    password,
    isOrganization,
    companyName // Add companyName parameter
  ) => {
    try {
      const response = await fetch(
        "https://express-backend-plum.vercel.app/signup",
        {
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
            isOrganization: isOrganization ? "true" : "false", // Convert to string for consistency
            companyName, // Pass companyName in the request body
          }),
        }
      );

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
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("organization"); // Remove organization from local storage
    setUserName("");
    window.location.reload();
  };

  const scrollToSection = (section) => {
    document.querySelector(`.${section}`).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="header">
      <div className="oppositeEndsLine">
        <img src="./images/UKCCLogo.png" alt="UKCC" className="logo" />
        <h1 className="title">UK Community Connect</h1>
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

      {showLogin && (
        <div>
          <Login handleLogin={handleLogin} setShowLogin={setShowLogin} />
          <hr className="header-line" />
        </div>
      )}
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
