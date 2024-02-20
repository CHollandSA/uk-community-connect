import React, { useState } from 'react';
import './Hero.css';
import './Header.css';
import Login from './Login';
import Signup from './Signup';
import VolunteerSignUp from './VolunteerSignUp';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userName, setUserName] = useState('');
  const [showButtons, setShowButtons] = useState(false);

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
        console.log(`Welcome back, ${data.user.firstName} ${data.user.lastName} !`);
        setUserName(data.user.username);
        localStorage.setItem('userId', data.user.userID);
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
                <li><a href="/admin">Admin</a></li>
              </ul>
            </nav>
            <div className='container2'>
            <button className='btn btn-primary' onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Login</button>
            <button className='btn btn-secondary' onClick={() => { setShowSignUp(true); setShowLogin(false); }}>Sign Up</button>
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
     <VolunteerSignUp userName= {localStorage.getItem('userName')} setShowForm={setShowSignUp} />
     <hr className='header-line' />
   </div>
)}
    </header>
  );
};

export default Header;
