import React from "react";
import "./App.css";

function VolunteerOrg({ setShowOrganizationForm }) {
  const handleCloseForm = () => {
    setShowOrganizationForm(false);
  };

  return (
    <div>
      <h3>Choose an Organization Cum:</h3>
      {/* Add your organization selection form here */}
      <button className="btn btn-danger" onClick={handleCloseForm}>
        Close
      </button>
    </div>
  );
}

export default VolunteerOrg;
