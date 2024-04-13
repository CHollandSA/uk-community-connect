import React from "react";
import "./App.css";

// Footer component definition
const Footer = () => {
  // Function to handle privacy link click
  const privacy = (event) => {
    event.preventDefault(); // Prevent default behavior of the anchor tag
    window.alert(
      // Display privacy policy message in an alert dialog
      "Thank you for visiting our website. Your privacy and the security of your personal information are of utmost importance to us. We strive to maintain the confidentiality and integrity of any data you provide while using our services. However, it's essential to understand that while we take measures to protect your information, any data you submit to the website is done so at your own risk.\n\nPlease be cautious not to insert sensitive or confidential data into any forms or fields on our website. While our staff is trained to handle your information responsibly, it is important to note that we cannot guarantee the security of data transmitted over the internet.\n\nAdditionally, to ensure the efficiency of our systems and maintain an active user base, please be aware that accounts inactive for 6 months or more may be subject to deletion. This measure helps us manage our database efficiently and protect the privacy of our users.\n\nIf you have any concerns about privacy or data security, please don't hesitate to contact us. Your feedback is valuable as we continually strive to improve our services and protect your privacy.\n\nThank you for your understanding and cooperation."
    );
  };

  // Function to handle contact link click
  const contact = (event) => {
    event.preventDefault(); // Prevent default behavior of the anchor tag
    window.alert(
      // Display contact information in an alert dialog
      "For any questions or queries contact the admin via their email: chollandsa@gmail.com"
    );
  };

  // Return JSX for the footer component
  return (
    <footer className="footer">
      {/* Horizontal line separator */}
      <hr className="header-line" />
      {/* Navigation section */}
      <nav>
        {/* Unordered list */}
        <ul className="nav-list2">
          {/* Copyright information */}
          <li>
            <p>© 2024 UKCC. All rights reserved.</p>
          </li>
          {/* Separator */}
          <li>
            <p>|</p>
          </li>
          {/* Privacy policy link with onClick event handler */}
          <li>
            <a href="privacy" onClick={privacy}>
              Privacy Policy
            </a>
          </li>
          {/* Separator */}
          <li>
            <p>|</p>
          </li>
          {/* Contact link with onClick event handler */}
          <li>
            <a href="/contact" onClick={contact}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

// Export Footer component as default
export default Footer;
