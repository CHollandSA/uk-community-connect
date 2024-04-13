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
      <Popover.Header as="h3">Organization</Popover.Header>
      <Popover.Body>
        Upon successful login, users with organization privileges are shown a
        table displaying the sessions they have created. They can also add new
        sessions by filling out a form with session details and clicking the
        confirm button.They may also edit and delete sessions they have already.
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
        `https://express-backend-plum.vercel.app/volunteers/${userId}`
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
        "https://express-backend-plum.vercel.app/volunteers",
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
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const handleDeleteSession = async () => {
    try {
      if (!selectedSession) {
        console.error("No session selected for deletion.");
        return;
      }
      await axios.delete(
        `https://express-backend-plum.vercel.app/volunteers/${selectedSession.SessionID}`
      );
      const userId = localStorage.getItem("userId");
      fetchVolunteers(userId); // Fetch updated list of sessions after deletion
      setShowForm(false);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error deleting session:", error);
      alert(
        "An error occurred while deleting the session. Please try again later."
      );
    }
  };

  const validateInputs = () => {
    // Validate session name length
    if (sessionName.length < 5 || sessionName.length > 20) {
      alert("Session name should be between 5 and 20 characters long.");
      return false;
    }

    // Validate location length
    if (location.length < 5 || location.length > 100) {
      alert("Location should be between 5 and 100 characters long.");
      return false;
    }

    // Validate experience length
    if (experience.length < 10 || experience.length > 100) {
      alert("Experience should be between 5 and 100 characters long.");
      return false;
    }

    // Validate duration
    if (duration > 8) {
      alert("Ensure your session is not too long!");
      return false;
    }

    // Validate date
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    if (date < currentDate) {
      alert("Please select a date in the future.");
      return false;
    }
    if (date > maxDate) {
      alert("Please select a date within one year from today.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs before submission
    if (
      !sessionName ||
      !location ||
      !date ||
      !time ||
      !duration ||
      !maxParticipants ||
      !experience
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateInputs()) {
      return;
    }

    handleAddSession();
  };

  const handleUpdateSession = async () => {
    try {
      const userId = localStorage.getItem("userId");
      // Validate inputs
      if (!validateInputs()) {
        return;
      }

      await axios.put(
        `https://express-backend-plum.vercel.app/volunteers/${selectedSession.SessionID}`,
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

  const handleInputChange = (setter, value) => {
    // Trim leading and trailing whitespace from the input value
    const trimmedValue = value.trim();
    setter(trimmedValue);
  };

  return (
    <div className="booking">
      <div className="div-heading">
        <h2>Organization Section</h2>{" "}
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <img
            src="./images/info-circle-line-icon.png"
            alt="Info"
            className="info-icon"
          />
        </OverlayTrigger>
      </div>
      <h4 className="booking-sub">Your Sessions</h4>

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
            <label htmlFor="Location:" className="form-label">
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
              type="number"
              id="duration"
              className="form-control"
              value={duration}
              onChange={(e) => handleInputChange(setDuration, e.target.value)}
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
              <button className="btn btn-primary" onClick={handleSubmit}>
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
