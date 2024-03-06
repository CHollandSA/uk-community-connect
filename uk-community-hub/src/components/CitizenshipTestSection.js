import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "./Citizenship.css";
import "./App.css";

function CitizenshipTestSection() {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Information</Popover.Header>
      <Popover.Body>
        Throughtout this site you will see info icons like me. Click them to
        learn more about the section you are on{" "}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="citizenship">
      <div style={{ width: "50%", paddingRight: "20px" }}>
        <div className="div-heading">
          <h2>Citizenship Section</h2>{" "}
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <img
              src="/images/info-circle-line-icon.png"
              alt="Info"
              className="info-icon"
            />
          </OverlayTrigger>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Right side */}
      <div style={{ width: "50%", textAlign: "right" }}>
        {/* List of links */}
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <a href="#link1">Link 1</a>
          </li>
          <li>
            <a href="#link2">Link 2</a>
          </li>
          <li>
            <a href="#link3">Link 3</a>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
}

export default CitizenshipTestSection;
