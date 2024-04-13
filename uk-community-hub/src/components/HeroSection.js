import React, { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "./Hero.css";
import "./App.css";

export default function HeroSection() {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">
        <b>Information Section:</b>
      </Popover.Header>
      <Popover.Body>
        You can use the above header in these ways. Click the hambuger button
        and use the links there to take you to your desired section. Log by
        clicking Log In In with an exisiting account by entering your username
        and password. You can also sign clicking the sign up button and filling
        in the required fields then clicking Sign Up.
        <br />
        <br /> Continuing without logging in leads users to an information
        section that elucidates the website's purpose. Below this, users find
        valuable information about citizenship application, citizenship tests,
        learning English, local activities and events, along with links to other
        helpful sites.
      </Popover.Body>
    </Popover>
  );
  const [showPurpose, setShowPurpose] = useState(false); // State to manage visibility

  return (
    <section className="hero">
      <img src="./images/UK-Flag.png" alt="UK" className="hero--photo" />
      <div className="div-heading">
        <h2 className="hero--header">Information</h2>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <img
            src="./images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      <p>
        The "UK Community Connect'' project is a web application designed to
        empower newcomers to the United Kingdom as they pursue citizenship and
        integration into British society. At its core, this project aligns with
        the United Nations Sustainable Development Goal (UNSDG) of "Quality
        Education," focusing on providing educational resources and support to
        those on the path to becoming UK citizens.
      </p>
      <button
        className="btn btn-info"
        onClick={() => setShowPurpose(!showPurpose)}
      >
        Click for more/less info
      </button>
      {showPurpose && (
        <p>
          <strong>Purpose of the Website:</strong> The primary purpose of the
          "UK Community Connect" project is to support individuals navigating
          the complex process of obtaining UK citizenship and integrating into
          British society. By offering a comprehensive platform, the website
          aims to facilitate access to essential resources, guidance, and
          support services tailored to the needs of newcomers. Through
          educational initiatives and community engagement, the project strives
          to foster a sense of belonging and empowerment among individuals
          embarking on their citizenship journey.
          <br />
          <strong>How to Use the Website:</strong>
          <ol>
            <li>
              Explore Resources: Navigate through the website to access a
              diverse range of educational resources, articles, and guides
              designed to support individuals at every stage of their
              citizenship journey.
            </li>
            <li>
              {" "}
              Book Sessions: Use the booking system to schedule sessions with
              experienced mentors, educators, and community leaders. Select from
              a variety of available sessions tailored to your interests and
              needs.
            </li>
            <li>
              Engage with Volunteers: Connect with volunteers who are dedicated
              to supporting newcomers in their integration process. Participate
              in volunteer-led activities, workshops, and community events to
              enhance your learning and social interaction.
            </li>
            <li>
              Purpose of Volunteering: Volunteering provides an opportunity for
              individuals to contribute their time, skills, and expertise to
              support newcomers on their citizenship journey. By volunteering,
              individuals can make a meaningful impact in their communities,
              foster social inclusion, and promote cross-cultural understanding.
              Through volunteer-led initiatives and activities, participants can
              build connections, develop valuable skills, and gain a deeper
              understanding of diverse cultures and perspectives. Volunteering
              not only benefits newcomers by providing essential support and
              guidance but also enriches the lives of volunteers by fostering
              personal growth, empathy, and a sense of fulfillment.
            </li>
          </ol>{" "}
        </p>
      )}
    </section>
  );
}
