import React from 'react';
import './App.css';
const Footer = () => {
  return (
    <div>
           <hr className='header-line' />
           <nav>
          <ul className='nav-list'>
            <li><a href="/info">Info</a></li>
            <li><a href="/test">Test</a></li>
            <li><a href="/volunteering">Volunteering</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </nav>
    </div>
  );
};

export default Footer;