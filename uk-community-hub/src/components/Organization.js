import React from "react";
import "./App.css";
import "./Hero.css";
// Currently trying to add a padding of 10px to everything so it looks neater

function Organization() {
  return (
    <div className="hero">
      {/* Left side */}
      <div style={{ width: "50%", paddingRight: "20px" }}>
        <h2>Organization Section</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

export default Organization;
