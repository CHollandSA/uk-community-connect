import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "./Hero.css";
import "./App.css";

export default function HeroSection() {
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
    <section className="hero">
      <img
        src="\images\Flag_Of_the_United_Kingdom.png"
        alt="UK"
        className="hero--photo"
      />
      <div className="div-heading">
        <h2 className="hero--header">Information</h2>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <img
            src="/images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      <p className="hero--text">
        The "UK Community Connect'' project is a web application designed to
        empower newcomers to the United Kingdom as they pursue citizenship and
        integration into British society. At its core, this project aligns with
        the United Nations Sustainable Development Goal (UNSDG) of "Quality
        Education," focusing on providing educational resources and support to
        those on the path to becoming UK citizens.
      </p>
    </section>
  );
}
