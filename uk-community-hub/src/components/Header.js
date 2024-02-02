import React, { useState } from 'react';
import './App.css';
import './Hero.css';
import './Header.css';
import Login from './Login';
import Signup from './Signup';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userName, setUserName] = useState('');

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
        // Set the username in state
        setUserName(data.user.username);
        // Store the username in local storage
        localStorage.setItem('userName', data.user.username);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  const handleSignUp = async (name, surname, username, email, password) => {
    try {
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, username, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Successfully signed up!');
        setShowSignUp(false);
        return true; // Indicate success to the Signup component
      } else {
        console.log('Error signing up:', data.error);
        return false; // Indicate failure to the Signup component
      }
    } catch (error) {
      console.error('Error making API call:', error);
      return false; // Indicate failure to the Signup component
    }
  };
  
  
  

  return (
    <header className='header'>
      <div className='navyHi'>
      <div className='logo-container'>
        <img src="\images\UKCCLogo.png" alt="UKCC" className='logo' />
      </div>
      <div className='header-content'>
        <nav>
          <ul className='nav-list'>
            <li><a href="/info">Info</a></li>
            <li><a href="/test">Test</a></li>
            <li><a href="/volunteering">Volunteering</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </nav>

  <div>
  <img src="\images\login.png" alt="User" className='user-icon' />
  {userName && <p className='user-name'>{userName}</p>}
  <button className='btn btn-primary' onClick={() => {setShowLogin(true); setShowSignUp(false);}}>Login</button>
  <button className='btn btn-secondary' onClick={() => {setShowSignUp(true); setShowLogin(false);}}>Sign Up</button>
  </div>

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
      </div>
    </header>
  );
};

export default Header;