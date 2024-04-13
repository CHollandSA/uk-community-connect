import React from "react";
import "./App.css";

const Footer = () => {
  const privacy = (event) => {
    event.preventDefault();
    window.alert(
      "Thank you for visiting our website. Your privacy and the security of your personal information are of utmost importance to us. We strive to maintain the confidentiality and integrity of any data you provide while using our services. However, it's essential to understand that while we take measures to protect your information, any data you submit to the website is done so at your own risk.\n\nPlease be cautious not to insert sensitive or confidential data into any forms or fields on our website. While our staff is trained to handle your information responsibly, it is important to note that we cannot guarantee the security of data transmitted over the internet.\n\nAdditionally, to ensure the efficiency of our systems and maintain an active user base, please be aware that accounts inactive for 6 months or more may be subject to deletion. This measure helps us manage our database efficiently and protect the privacy of our users.\n\nIf you have any concerns about privacy or data security, please don't hesitate to contact us. Your feedback is valuable as we continually strive to improve our services and protect your privacy.\n\nThank you for your understanding and cooperation."
    );
  };

  const contact = (event) => {
    event.preventDefault();
    window.alert(
      "For any questions or queries contact the admin via their email: chollandsa@gmail.com"
    );
  };

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
            <a href="privacy" onClick={privacy}>
              Privacy Policy
            </a>
          </li>
          <li>
            <p>|</p>
          </li>
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

export default Footer;
