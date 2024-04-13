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

  const popover = // this popoover tells the user how to use the booking section
    (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Booking Info</Popover.Header>
        <Popover.Body>
          To book a session, simply browse through the available sessions and
          click on the "Book" button once you have selected the session you wish
          to attend. Once booked, the session will appear in your booked
          sessions list where you can view the details and cancel if necessary.{" "}
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
        `https://express-backend-plum.vercel.app/volunteers/${userId}`
      );
      const approvedSessions = response.data.filter(
        // Filters the response data to include only approved sessions. Choosing to filter what is fetched was easier than writing a new sql statement
        (session) => session.approved === 1
      );
      setVolunteerSessions(approvedSessions);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserSessions = async (userId) => {
    // fetches all the sessions booked by the current user who is logged in. Does this by using  the userId stored in local storage
    try {
      const response = await axios.get(
        `https://express-backend-plum.vercel.app/booked-sessions/${userId}`
      );
      setUserSessions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookSession = async () => {
    try {
      for (const sessionId of selectedSessionIds) {
        await axios.post(
          "https://express-backend-plum.vercel.app/session-signup",
          {
            sessionId,
            userId,
          }
        );
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
        await axios.post(
          "https://express-backend-plum.vercel.app/session-cancellation",
          {
            sessionId,
            userId,
          }
        );
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
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <img
            src="./images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      <p>
        The available sessions section allows users to book sessions they would
        like to attend. Once signed in, users can use the booked sessions
        section to view the sessions they have booked and cancel them if needed.
        If no sessions are currently available, users are encouraged to check
        back within 24 hours for newly added sessions. Please note that the
        ability to book and cancel sessions is only available to signed-in
        users.
      </p>
      {isLoggedIn && (
        <>
          <h4 className="booking-sub">Booked Sessions</h4>
          {userSessions.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Session</th>
                      <th>Location</th> {/* Added Location header */}
                      <th>Date</th>
                      <th>Time</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userSessions.map((session) => (
                      <tr key={session.SessionID}>
                        <td>{session.SessionName}</td>
                        <td>{session.Location}</td> {/* Added Location data */}
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
              </div>
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
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                {isLoggedIn && <th>Book</th>}
              </tr>
            </thead>
            <tbody>
              {volunteerSessions.map((session) => (
                <tr key={session.SessionID}>
                  <td>{session.SessionName}</td>
                  <td>{session.Location}</td>
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
