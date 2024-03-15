import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";
import { OverlayTrigger, Popover } from "react-bootstrap";

const Organization = () => {
  const [volunteerSessions, setVolunteerSessions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSessionIds, setSelectedSessionIds] = useState([]);
  const [userId, setUserId] = useState(null);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Information</Popover.Header>
      <Popover.Body>
        Throughout this site you will see info icons like me. Click them to
        learn more about the section you are on{" "}
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    setIsLoggedIn(!!userId);
    fetchVolunteers(userId);
  }, []);

  const fetchVolunteers = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/volunteers/${userId}`
      );
      const formattedSessions = response.data.map((session) => ({
        ...session,
        Date: new Date(session.Date).toISOString().split("T")[0], // Format the date string
      }));
      const filteredSessions = formattedSessions.filter(
        (session) =>
          session.Host === "Organization" &&
          session.OrganizerID === parseInt(userId)
      );
      setVolunteerSessions(filteredSessions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookSession = async () => {
    try {
      for (const sessionId of selectedSessionIds) {
        await axios.post("http://localhost:8081/session-signup", {
          sessionId,
          userId,
        });
      }
      console.log("Sessions booked successfully");
      setSelectedSessionIds([]);
      fetchVolunteers(userId); // Refresh the sessions after booking
      // fetchUserSessions(userId); // eslint-disable-next-line
    } catch (error) {
      console.error("Error booking sessions:", error);
    }
  };

  const handleCheckboxChange = (sessionId) => {
    setSelectedSessionIds((prevIds) =>
      prevIds.includes(sessionId)
        ? prevIds.filter((id) => id !== sessionId)
        : [...prevIds, sessionId]
    );
  };

  const handleInputChange = (index, field, value) => {
    const updatedSessions = [...volunteerSessions];
    if (field === "Date") {
      // Format the date string
      const date = new Date(value).toISOString().split("T")[0];
      updatedSessions[index][field] = date;
    } else {
      updatedSessions[index][field] = value;
    }
    setVolunteerSessions(updatedSessions);
  };

  return (
    <div className="booking">
      <div className="div-heading">
        <h2>Organization Section</h2>{" "}
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <img
            src="/images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      <h4 className="booking-sub">Available Sessions</h4>
      {volunteerSessions.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Session Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Max Participants</th>
                <th>Experience</th>
                <th>Host</th>
                {isLoggedIn && <th>Book</th>}
              </tr>
            </thead>
            <tbody>
              {volunteerSessions.map((session, index) => (
                <tr key={session.SessionID}>
                  <td>
                    <input
                      type="text"
                      value={session.SessionName}
                      onChange={(e) =>
                        handleInputChange(index, "SessionName", e.target.value)
                      }
                      className="input-small" // Apply the CSS class
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={session.Location}
                      onChange={(e) =>
                        handleInputChange(index, "Location", e.target.value)
                      }
                      className="input-small" // Apply the CSS class
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={session.Date}
                      onChange={(e) =>
                        handleInputChange(index, "Date", e.target.value)
                      }
                      className="input-small" // Apply the CSS class
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={session.Time}
                      onChange={(e) =>
                        handleInputChange(index, "Time", e.target.value)
                      }
                      className="input-small" // Apply the CSS class
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={session.Duration}
                      onChange={(e) =>
                        handleInputChange(index, "Duration", e.target.value)
                      }
                      className="input-small" // Apply the CSS class
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={session.MaxParticipants}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "MaxParticipants",
                          e.target.value
                        )
                      }
                      className="input-small" // Apply the CSS class
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={session.Experience}
                      onChange={(e) =>
                        handleInputChange(index, "Experience", e.target.value)
                      }
                      className="input-small" // Apply the CSS class
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={session.Host}
                      onChange={(e) =>
                        handleInputChange(index, "Host", e.target.value)
                      }
                      className="input-small" // Apply the CSS class
                    />
                  </td>
                  {isLoggedIn && (
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(session.SessionID)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {isLoggedIn && (
            <button className="btn btn-primary" onClick={handleBookSession}>
              Book
            </button>
          )}
        </div>
      ) : (
        <p>No Available Sessions</p>
      )}
    </div>
  );
};

export default Organization;
