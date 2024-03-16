import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";
import { OverlayTrigger, Popover } from "react-bootstrap";

const Booking = () => {
  const [volunteerSessions, setVolunteerSessions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSessionIds, setSelectedSessionIds] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userSessions, setUserSessions] = useState([]);

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
    fetchUserSessions(userId);
  }, []);

  const fetchVolunteers = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/volunteers/${userId}`
      );
      setVolunteerSessions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserSessions = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/booked-sessions/${userId}`
      );
      setUserSessions(response.data);
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
      fetchUserSessions(userId); // same as above
    } catch (error) {
      console.error("Error booking sessions:", error);
    }
  };

  const handleCancelSession = async () => {
    try {
      for (const sessionId of selectedSessionIds) {
        await axios.post("http://localhost:8081/session-cancellation", {
          sessionId,
          userId,
        });
      }
      console.log("Deleted booking successfully");
      setSelectedSessionIds([]);
      fetchVolunteers(userId); // Refresh the sessions after booking
      fetchUserSessions(userId); // same as above
    } catch (error) {
      console.error("Error cancelling sessions:", error);
    }
  };

  const handleCheckboxChange = (sessionId) => {
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
            src="./images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      {isLoggedIn && (
        <>
          <h4 className="booking-sub">Booked Sessions</h4>
          {userSessions.length > 0 ? (
            <>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Session</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {userSessions.map((session) => (
                    <tr key={session.SessionID}>
                      <td>{session.SessionName}</td>
                      <td>
                        {new Date(session.Date).toLocaleDateString("en-GB")}
                      </td>
                      <td>{session.Time}</td>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(session.SessionID)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="btn btn-danger m-1"
                onClick={handleCancelSession}
              >
                Remove
              </button>
            </>
          ) : (
            <p>No sessions linked to the user</p>
          )}
        </>
      )}
      <h4 className="booking-sub">Available Sessions</h4>
      {volunteerSessions.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Session</th>
                <th>Date</th>
                <th>Time</th>
                {isLoggedIn && <th>Book</th>}
              </tr>
            </thead>
            <tbody>
              {volunteerSessions.map((session) => (
                <tr key={session.SessionID}>
                  <td>{session.SessionName}</td>
                  <td>{new Date(session.Date).toLocaleDateString("en-GB")}</td>
                  <td>{session.Time}</td>
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

export default Booking;
