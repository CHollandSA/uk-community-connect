import React from 'react';
import './Citizenship.css';

//currently trying to add a padding of 10px to everything so it looks neater s

function CitizenshipTestSection() {
  return (
    <div className='citizenship' >
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
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
          {/* Add more links as needed */}
        </ul>

        
      </div>
    </div>
  );
}

export default CitizenshipTestSection;
