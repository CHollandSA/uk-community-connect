import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";
import { OverlayTrigger, Popover } from "react-bootstrap";

const Organization = () => {
  const [volunteerSessions, setVolunteerSessions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [sessionName, setSessionName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [experience, setExperience] = useState("");

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

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    setShowForm(true);
    setSessionName(session.SessionName);
    setLocation(session.Location);
    setDate(session.Date);
    setTime(session.Time);
    setDuration(session.Duration);
    setMaxParticipants(session.MaxParticipants);
    setExperience(session.Experience);
  };

  const handleAddSession = async () => {
    try {
      const userId = localStorage.getItem("userId");
      // Log the session data before making the POST request
      console.log("Adding session:", {
        SessionName: sessionName,
        Location: location,
        Date: date,
        Time: time,
        Duration: duration,
        MaxParticipants: maxParticipants,
        OrganizerID: userId, // Use userId from localStorage
        Experience: experience,
        Host: "Organization",
      });

      await axios.post(
        "http://localhost:8081/volunteers",
        {
          sessionName: sessionName,
          location: location,
          date: date,
          time: time,
          duration: duration,
          maxParticipants: maxParticipants,
          experience: experience,
          host: "Organization",
        },
        {
          headers: {
            "user-id": userId, // Pass userId in headers
          },
        }
      );
      fetchVolunteers(userId);
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const handleDeleteSession = async () => {
    try {
      await axios.delete(
        `http://localhost:8081/volunteers/${selectedSession.SessionID}`
      );
      fetchVolunteers(); // Fetch updated list of sessions after deletion
      setShowForm(false);
      setSelectedSession(null);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const handleUpdateSession = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.put(
        `http://localhost:8081/volunteers/${selectedSession.SessionID}`,
        {
          SessionName: sessionName,
          Location: location,
          Date: date,
          Time: time,
          Duration: duration,
          MaxParticipants: maxParticipants,
          OrganizerID: userId, // Use userId from localStorage
          Experience: experience,
          Host: "Organization",
        }
      );
      fetchVolunteers(userId);
      setShowForm(false);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission if needed
  };

  return (
    <div className="booking">
      <div className="div-heading">
        <h2>Organization Section</h2>{" "}
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <img
            src="./images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      <h4 className="booking-sub">Available Sessions</h4>

      <div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Session Name</th>
                <th>Date</th>
                {isLoggedIn && <th></th>}
              </tr>
            </thead>
            <tbody>
              {volunteerSessions.map((session, index) => (
                <tr key={index}>
                  <td>{session.SessionID}</td>
                  <td>{session.SessionName}</td>
                  <td>{session.Date}</td>
                  {isLoggedIn && (
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSelectSession(session)}
                      >
                        Select
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() => {
              setShowForm(true);
              setSessionName("");
              setLocation("");
              setDate("");
              setTime("");
              setDuration("");
              setMaxParticipants("");
              setExperience("");
              setSelectedSession(null);
            }}
          >
            Add Session
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="sessionName" className="form-label">
              Session Name:
            </label>
            <input
              type="text"
              id="sessionName"
              className="form-control"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <input
              type="text"
              id="location"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Time:
            </label>
            <input
              type="time"
              id="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration:
            </label>
            <input
              type="text"
              id="duration"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="maxParticipants" className="form-label">
              Max Participants:
            </label>
            <input
              type="number"
              id="maxParticipants"
              className="form-control"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="experience" className="form-label">
              Experience:
            </label>
            <textarea
              id="experience"
              className="form-control"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            {selectedSession ? (
              <>
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={handleDeleteSession}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateSession}
                >
                  Update
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={handleAddSession}>
                Confirm
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary close-btn"
              onClick={() => {
                setShowForm(false);
              }}
            >
              Close
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Organization;
