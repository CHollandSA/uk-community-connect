import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function VolunteerOrg({ setShowOrganizationForm }) {
  // State variable to store volunteer sessions
  const [volunteerSessions, setVolunteerSessions] = useState([]);

  // Fetch volunteer sessions when component mounts
  useEffect(() => {
    fetchVolunteerSessions();
  }, []);

  // Function to fetch volunteer sessions from the backend
  const fetchVolunteerSessions = async () => {
    try {
      // Fetch data from the backend API
      const response = await axios.get(
        "http://localhost:8081/volunteersessions"
      );
      // Set the volunteer sessions state with the fetched data
      setVolunteerSessions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle volunteer button click
  const handleVolunteerClick = (sessionName, organization) => {
    // Show an alert indicating successful volunteer registration
    window.alert(
      `You have kindly volunteered to help out the organization ${organization} for their session: ${sessionName}`
    );
  };

  // JSX for rendering the volunteer sessions table
  return (
    <div className="table-responsive">
      <h3>Volunteer Sessions:</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Session</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Volunteer</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through volunteer sessions and rendering table rows */}
          {volunteerSessions.map((session) => (
            <tr key={session.SessionID}>
              <td>{session.OrganizationName}</td>
              <td>{session.SessionName}</td>
              <td>{new Date(session.Date).toLocaleDateString("en-GB")}</td>
              <td>{session.Time}</td>
              <td>{session.Location}</td>
              {/* Volunteer button to register as a volunteer */}
              <td>
                <button
                  className="btn btn-primary mb-1"
                  onClick={() =>
                    handleVolunteerClick(
                      session.SessionName,
                      session.OrganizationName
                    )
                  }
                >
                  Volunteer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to close the volunteer organization form */}
      <button
        className="btn btn-danger"
        onClick={() => setShowOrganizationForm(false)}
      >
        Close
      </button>
    </div>
  );
}

export default VolunteerOrg;
