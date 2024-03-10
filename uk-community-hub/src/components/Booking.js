import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";
import { OverlayTrigger, Popover } from "react-bootstrap";

const Booking = () => {
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
    fetchVolunteers();
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Set isLoggedIn to true if userId exists
    setUserId(userId); // Set userId state
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/volunteers");
      setVolunteerSessions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookSession = async () => {
    try {
      // Iterate through selectedSessionIds and send a POST request to insert data into SessionSignups table
      for (const sessionId of selectedSessionIds) {
        await axios.post("http://localhost:8081/session-signup", {
          sessionId,
          userId,
        });
      }
      console.log("Sessions booked successfully");
      // Clear selectedSessionIds after booking
      setSelectedSessionIds([]);
    } catch (error) {
      console.error("Error booking sessions:", error);
    }
  };

  const handleCheckboxChange = (sessionId) => {
    // Toggle the selected session ID in the state
    setSelectedSessionIds((prevIds) =>
      prevIds.includes(sessionId)
        ? prevIds.filter((id) => id !== sessionId)
        : [...prevIds, sessionId]
    );
  };

  return (
    <div className="booking">
      <div className="div-heading">
        <h2>Booking</h2>{" "}
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <img
            src="/images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      <p>This section is used for booking sessions.</p>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Session</th>
              <th>Date</th>
              <th>Time</th>
              <th>Max Participants</th>
              {isLoggedIn && <th>Book</th>}
            </tr>
          </thead>
          <tbody>
            {volunteerSessions.map((session) => (
              <tr key={session.SessionID}>
                <td>{session.SessionName}</td>
                <td>{new Date(session.Date).toLocaleDateString("en-GB")}</td>
                <td>{session.Time}</td>
                <td>{session.MaxParticipants}</td>
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
    </div>
  );
};

export default Booking;
