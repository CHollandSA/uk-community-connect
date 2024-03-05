import React, { useState, useEffect } from 'react';
import './Hero.css';
import './Header.css';
import Login from './Login';
import Signup from './Signup';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userName, setUserName] = useState('');
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Set username from local storage when component mounts
    const storedUserName = localStorage.getItem('username');
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
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log(`Welcome back, ${data.user.firstName} ${data.user.lastName} ${data.user.company}!`);
        setUserName(data.user.username);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('userId', data.user.userID);
        
        // Check if the logged-in user is an organization
        if (data.user.company === 1) { // Use the correct property name here
          localStorage.setItem('organization', '1'); // Set organization to '1' if organizerid is '1'
        } else {
          localStorage.setItem('organization', '0'); // Otherwise, set organization to '0'
        }
        
        // Reload the page after login
         window.location.reload();
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };


  const handleSignUp = async (name, surname, username, email, password, isOrganization, companyName) => {
    try {
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          surname,
          username,
          email,
          password,
          isOrganization: String(isOrganization), // Convert to string for consistency
          companyName,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        return true;
      } else {
        console.error(data.error);
        return false;
      }
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  };

  const handleLogout = () => {
    // Clear username from local storage when logging out
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('organization'); // Remove organization from local storage
    setUserName('');
    // Reload the page after logout
    window.location.reload();
  };

  return (
    <header className='header'>
      <div className="oppositeEndsLine">
        <img src="/images/UKCCLogo.png" alt="UKCC" className='logo' />
        <h1 className='title'>UK Community Connect</h1>
        <div className='showButtons'>
          {showButtons ? (
            <img
              className="close"
              src="\images\close.png"
              onClick={toggleButtons}
              alt="menu"
            />
          ) : (
            <img
              className="burger"
              src="\images\hamburger.png"
              onClick={toggleButtons}
              alt="menu"
            />
          )}
          {userName && <p className='user-name'>{userName}</p>}
        </div>
      </div>

      <div className='header-content'>
        {showButtons && (
          <div className='container'>
            <nav>
              <ul className='nav-list'>
                <li><a href="/info">Info</a></li>
                <li><a href="/test">Test</a></li>
                <li><a href="/volunteering">Volunteering</a></li>
                <li><a href="/volunteering">Book</a></li>
              </ul>
            </nav>
            <div className='container2'>
              {!userName ? (
                <>
                  <button className='btn btn-primary' onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Login</button>
                  <button className='btn btn-secondary' onClick={() => { setShowSignUp(true); setShowLogin(false); }}>Sign Up</button>
                </>
              ) : (
                <button className='btn btn-secondary' onClick={handleLogout}>Logout</button>
              )}
            </div>
          </div>
        )}
      </div>
      <hr className='header-line' />

      {showLogin && (
        <div>
          <Login handleLogin={handleLogin} setShowLogin={setShowLogin} />
          <hr className='header-line' />
        </div>
      )}
      {showSignUp && (
        <div>
          <Signup handleSignUp={handleSignUp} setShowSignUp={setShowSignUp} />
          <hr className='header-line' />
        </div>
      )}
    </header>
  );
};

export default Header;
