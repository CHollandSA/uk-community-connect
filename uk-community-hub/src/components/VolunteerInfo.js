import React, { useState } from 'react';
import './Volunteering.css';
import VolunteerSignUp from "./VolunteerSignUp";

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

  return (
    <div className='volunteering'>
        <div className='volunteerBtns'>
                <h2>Volunteer Sessions</h2>
          <button className='btn btn-primary' onClick={() => { setShowIndividualForm(true); setShowOrganizationForm(false); }}>Volunteer as Individual</button>
          <button className='btn btn-primary' onClick={showOrganizationOptions}>Volunteer with Organization</button>
        </div>

      {showIndividualForm && <VolunteerSignUp setShowForm={setShowIndividualForm} />}

      {showOrganizationForm && (
        <div>
          <h3>Choose an Organization:</h3>
          {/* Add your organization selection form here */}
          <button className='btn btn-danger' onClick={handleCloseForm}>Close</button>
        </div>
      )}
    </div>
  );
};

export default VolunteerList;
