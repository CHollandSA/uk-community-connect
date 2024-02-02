import React, { useState, useEffect } from 'react';
import './Volunteering.css';
import axios from 'axios';
import VolunteerSignUp from "./VolunteerSignUp";

const VolunteerList = () => {
  const [volunteerSessions, setVolunteerSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState(''); // Add state for the user name

  useEffect(() => {
    fetchVolunteers();
    // Check if the user is already logged in when the component mounts
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/volunteers');
      setVolunteerSessions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='volunteer'>
      <h2>Volunteer Sessions</h2>

      {userName && ( // Show the button only if the user is logged in
        <div>
          <button onClick={() => setShowForm(true)}>Volunteer</button>
        </div>
      )}

      {showForm && <VolunteerSignUp setShowForm={setShowForm} />}

      <div className='table-wrapper-scroll-y'>
        {volunteerSessions.length === 0 ? (
          <p>No volunteers available.</p>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>Session</th>
                <th>Date</th>
                <th>Time</th>
                <th>Max Participants</th>
                <th>Book</th>
              </tr>
            </thead>
            <tbody>
              {volunteerSessions.map((session) => (
                <tr key={session.SessionID}>
                  <td>{session.SessionName}</td>
                  <td>
                    {new Date(session.Date).toLocaleDateString('en-GB')}
                  </td>
                  <td>{session.Time}</td>
                  <td>{session.MaxParticipants}</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VolunteerList;