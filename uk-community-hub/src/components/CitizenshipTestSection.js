import React from 'react';
import './Citizenship.css';
import './App.css';

// Currently trying to add a padding of 10px to everything so it looks neater

function CitizenshipTestSection() {
  return (
    <div className='citizenship'>
      {/* Left side */}
      <div style={{ width: '50%', paddingRight: '20px' }}>
        <h2>Citizenship Section</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Right side */}
      <div style={{ width: '50%', textAlign: 'right' }}>
        {/* List of links */}
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><a href="#link1">Link 1</a></li>
          <li><a href="#link2">Link 2</a></li>
          <li><a href="#link3">Link 3</a></li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
}

export default CitizenshipTestSection;
