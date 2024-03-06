import React, { useState } from "react";
import "./Volunteering.css";
import VolunteerSignUp from "./VolunteerSignUp";
import { OverlayTrigger, Popover } from "react-bootstrap";

const VolunteerList = () => {
  const [showIndividualForm, setShowIndividualForm] = useState(false);
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);

  const showOrganizationOptions = () => {
    setShowOrganizationForm(true); // Show the organization form directly
    setShowIndividualForm(false);
  };

  const handleCloseForm = () => {
    setShowOrganizationForm(false);
  };

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
    <div className="volunteering">
      <div className="volunteerBtns">
        <div className="div-heading">
          <h2>Volunteer Services</h2>{" "}
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <img
              src="/images/info-circle-line-icon.png"
              alt="Info"
              className="info-icon"
            />
          </OverlayTrigger>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowIndividualForm(true);
            setShowOrganizationForm(false);
          }}
        >
          Volunteer as Individual
        </button>
        <button className="btn btn-primary" onClick={showOrganizationOptions}>
          Volunteer with Organization
        </button>
      </div>

      {showIndividualForm && (
        <VolunteerSignUp setShowForm={setShowIndividualForm} />
      )}

      {showOrganizationForm && (
        <div>
          <h3>Choose an Organization:</h3>
          {/* Add your organization selection form here */}
          <button className="btn btn-danger" onClick={handleCloseForm}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VolunteerList;
