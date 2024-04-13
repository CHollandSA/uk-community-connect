import React, { useState } from "react";
import "./Volunteering.css";
import VolunteerSignUp from "./VolunteerSignUp";
import VolunteerOrg from "./VolunteerOrg";
import { OverlayTrigger, Popover } from "react-bootstrap";

const VolunteerInfo = () => {
  const [showIndividualForm, setShowIndividualForm] = useState(false);
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);

  const showOrganizationOptions = () => {
    setShowOrganizationForm(true); // Show the organization form directly
    setShowIndividualForm(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Information on how to volunteer</Popover.Header>
      <Popover.Body>
        The Volunteer Services Section provides users with the opportunity to
        offer their services to the system. Here's how to use it:
        <br />
        <br />
        1. Locate and click on the "Offer a Service" button to access the
        Volunteer Services Section.
        <br />
        2. Fill out the necessary information about the session you wish to
        offer. Be sure to provide detailed information to increase the
        likelihood of approval by the admin.
        <br />
        3. Once you've filled out the information, click submit.
        <br />
        4. Your session will be reviewed by the admin. If approved, it will be
        made available for other users to book.
        <br />
        <br />
        Alternatively, users can volunteer with organizations by following these
        steps:
        <br />
        1. Click on the "Volunteer with an Organization" button.
        <br />
        2. Explore the available sessions hosted by various organizations.
        <br />
        3. Select the session you are interested in volunteering for by clicking
        the "Volunteer" button.
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="volunteering">
      <div className="volunteerBtns">
        <div className="div-heading">
          <h2>Volunteer Services</h2>{" "}
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <img
              src="./images/info-circle-line-icon.png"
              alt="Info"
              className="info-icon"
            />
          </OverlayTrigger>
        </div>
        <p>
          This section allows users to offer sessions to the system. These
          sessions, hosted by the volunteers themselves, can be booked by
          users(immigrants, language learners, and citizenship seekers) once
          approved by an admin. Volunteers should provide detailed information
          to increase the likelihood of approval. If insufficient information is
          provided, the admin may deny the session.
        </p>
        <p>
          Additionally, users can choose to offer their assistance to larger
          organizations. By volunteering with an organization, users can
          contribute to their sessions and events, providing support and
          assistance where needed.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowIndividualForm(true);
            setShowOrganizationForm(false);
          }}
        >
          Offer a Volunteer Session
        </button>
        <button className="btn btn-primary" onClick={showOrganizationOptions}>
          Volunteer with an Organization
        </button>
      </div>

      {showIndividualForm && (
        <VolunteerSignUp setShowForm={setShowIndividualForm} />
      )}

      {showOrganizationForm && (
        <VolunteerOrg setShowOrganizationForm={setShowOrganizationForm} />
      )}
    </div>
  );
};

export default VolunteerInfo;
