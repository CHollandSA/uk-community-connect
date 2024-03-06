import React from "react";
import "./App.css";
import "./Hero.css";
import { OverlayTrigger, Popover } from "react-bootstrap";
// Currently trying to add a padding of 10px to everything so it looks neater

function Organization() {
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
    <div className="hero">
      <div style={{ width: "50%", paddingRight: "20px" }}>
        <div className="div-heading">
          <h2>Organization Section</h2>{" "}
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
    </div>
  );
}

export default Organization;
