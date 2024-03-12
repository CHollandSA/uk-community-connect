import React from "react";
import "./App.css";
const Footer = () => {
  return (
    <footer className="footer">
      <hr className="header-line" />
      <nav>
        <ul className="nav-list2">
          <li>
            <p>© 2024 UKCC. All rights reserved.</p>
          </li>
          <li>
            <p>|</p>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li>
            <p>|</p>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
