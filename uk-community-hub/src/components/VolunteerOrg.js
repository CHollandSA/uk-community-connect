import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function VolunteerOrg({ setShowOrganizationForm }) {
  const [volunteerSessions, setVolunteerSessions] = useState([]);

  useEffect(() => {
    fetchVolunteerSessions();
  }, []);

  const fetchVolunteerSessions = async () => {
    try {
      const response = await axios.get(
        "https://express-backend-plum.vercel.app/volunteersessions"
      );
      setVolunteerSessions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVolunteerClick = (sessionName, organization) => {
    window.alert(
      `(This feature is not complete yet. This message is to demonstrate what this feature will do.) You have kindly volunteered to help Organization:${organization} for the session: ${sessionName}`
    );
  };

  return (
    <div>
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
          {volunteerSessions.map((session) => (
            <tr key={session.SessionID}>
              <td>{session.OrganizationName}</td>
              <td>{session.SessionName}</td>
              <td>{new Date(session.Date).toLocaleDateString("en-GB")}</td>
              <td>{session.Time}</td>
              <td>{session.Location}</td>
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
