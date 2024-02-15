import React, { useState, useEffect } from 'react';
import './Volunteering.css';
import axios from 'axios';
import VolunteerSignUp from "./VolunteerSignUp";

const VolunteerList = () => {
  const [showIndividualForm, setShowIndividualForm] = useState(false);
  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [organizationOptions, setOrganizationOptions] = useState([]);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);



  const showOrganizationOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8081/organizations');
      setOrganizationOptions(response.data);
      setShowOrganizationForm(true);
      setShowIndividualForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='volunteering'>
      <h2>Volunteer Sessions</h2>

      {userName && (
        <div className='volunteerBtns'>
          <button className='btn btn-primary' onClick={() => setShowIndividualForm(true)}>Volunteer as Individual</button>
          <button className='btn btn-secondary' onClick={showOrganizationOptions}>Volunteer with Organization</button>
        </div>
      )}

      {showIndividualForm && <VolunteerSignUp setShowForm={setShowIndividualForm} />}

      {showOrganizationForm && (
        <div>
          <h3>Choose an Organization:</h3>
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                {/* Add other headings as needed */}
              </tr>
            </thead>
            <tbody>
              {organizationOptions.map((org) => (
                <tr key={org.id}>
                  <td>{org.companyName}</td>
                  {/* Add other cells with organization data */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

     
    </div>
  );
};

export default VolunteerList;
