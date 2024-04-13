import React, { useState, useEffect } from "react";
import axios from "axios"; // Importing axios for making HTTP requests
import "./Booking.css"; // Importing styles for the component
import { OverlayTrigger, Popover } from "react-bootstrap"; // Importing components from react-bootstrap

// Organization component definition
const Organization = () => {
  // State variables to manage component state
  const [volunteerSessions, setVolunteerSessions] = useState([]); // State to store volunteer sessions
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [selectedSession, setSelectedSession] = useState(null); // State to store the selected session
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

  // State variables to store form input values
  const [sessionName, setSessionName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [experience, setExperience] = useState("");

  // Popover content
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Organization</Popover.Header>
      <Popover.Body>
        Upon successful login, users with organization privileges are shown a
        table displaying the sessions they have created. They can also add new
        sessions by filling out a form with session details and clicking the
        confirm button. They may also edit and delete sessions they have
        already.
      </Popover.Body>
    </Popover>
  );

  // Fetch volunteer sessions and update state when component mounts
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage
    setIsLoggedIn(!!userId); // Update login status
    fetchVolunteers(userId); // Fetch volunteer sessions
  }, []);

  // Function to fetch volunteer sessions from the backend
  const fetchVolunteers = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/volunteers/${userId}`
      ); // Fetch sessions for the current user
      // Format session dates and filter sessions for organization
      const formattedSessions = response.data.map((session) => ({
        ...session,
        Date: new Date(session.Date).toISOString().split("T")[0], // Format the date string
      }));
      const filteredSessions = formattedSessions.filter(
        (session) =>
          session.Host === "Organization" &&
          session.OrganizerID === parseInt(userId)
      );
      setVolunteerSessions(filteredSessions); // Update volunteer sessions state
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  // Function to handle selection of a session
  const handleSelectSession = (session) => {
    setSelectedSession(session); // Set the selected session
    setShowForm(true); // Show the form
    // Set form input values to the selected session details
    setSessionName(session.SessionName);
    setLocation(session.Location);
    setDate(session.Date);
    setTime(session.Time);
    setDuration(session.Duration);
    setMaxParticipants(session.MaxParticipants);
    setExperience(session.Experience);
  };

  // Function to add a new session
  const handleAddSession = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get user ID from local storage
      // Make a POST request to add the session
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
            "user-id": userId, // Pass user ID in headers
          },
        }
      );
      fetchVolunteers(userId); // Fetch updated list of sessions
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error("Error adding session:", error); // Log any errors
    }
  };

  // Function to delete a session
  const handleDeleteSession = async () => {
    try {
      if (!selectedSession) {
        console.error("No session selected for deletion."); // Log an error if no session is selected
        return;
      }
      // Make a DELETE request to delete the selected session
      await axios.delete(
        `http://localhost:8081/volunteers/${selectedSession.SessionID}`
      );
      const userId = localStorage.getItem("userId"); // Get user ID from local storage
      fetchVolunteers(userId); // Fetch updated list of sessions after deletion
      setShowForm(false); // Hide the form
      setSelectedSession(null); // Reset selected session
    } catch (error) {
      console.error("Error deleting session:", error); // Log any errors
      alert(
        "An error occurred while deleting the session. Please try again later."
      ); // Show an alert message
    }
  };

  // Function to validate form inputs
  const validateInputs = () => {
    // Validate session name length
    if (sessionName.length < 3 || sessionName.length > 20) {
      alert(
        "Session name should be between 5 and 20 characters long.\nThere is more space in the Experience section"
      );
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
    return true; // Return true if all validations pass
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
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
      alert("Please fill in all fields."); // Show an alert message if any field is empty
      return;
    }
    if (!validateInputs()) {
      return; // Stop form submission if inputs are invalid
    }
    handleAddSession(); // Call handleAddSession to add the session
  };

  // Function to handle session update
  const handleUpdateSession = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Get user ID from local storage
      // Validate inputs
      if (!validateInputs()) {
        return; // Stop update if inputs are invalid
      }
      // Make a PUT request to update the selected session
      await axios.put(
        `http://localhost:8081/volunteers/${selectedSession.SessionID}`,
        {
          SessionName: sessionName,
          Location: location,
          Date: date,
          Time: time,
          Duration: duration,
          MaxParticipants: maxParticipants,
          OrganizerID: userId, // Use user ID from local storage
          Experience: experience,
          Host: "Organization",
        }
      );
      fetchVolunteers(userId); // Fetch updated list of sessions
      setShowForm(false); // Hide the form
      setSelectedSession(null); // Reset selected session
    } catch (error) {
      console.error("Error updating session:", error); // Log any errors
    }
  };

  // Function to handle input change and trim leading/trailing whitespace
  const handleInputChange = (setter, value) => {
    const trimmedValue = value.trim(); // Trim leading and trailing whitespace
    setter(trimmedValue); // Set the trimmed value using the provided setter function
  };

  // JSX for the Organization component
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
              {/* Render volunteer sessions */}
              {volunteerSessions.map((session, index) => (
                <tr key={index}>
                  <td>{session.SessionID}</td>
                  <td>{session.SessionName}</td>
                  <td>{session.Date}</td>
                  {isLoggedIn && (
                    <td>
                      {/* Button to select a session */}
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
          {/* Button to add a new session */}
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() => {
              setShowForm(true); // Show the form
              // Reset form input values and selected session
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

      {/* Form to add/update session */}
      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          {/* Session Name input */}
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

          {/* Location input */}
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

          {/* Date input */}
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

          {/* Time input */}
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

          {/* Duration input */}
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

          {/* Max Participants input */}
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

          {/* Experience input */}
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

          {/* Action buttons */}
          <div className="mb-3">
            {selectedSession ? ( // Conditional rendering based on selected session
              <>
                {/* Delete and Update buttons for existing session */}
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
              // Confirm button for adding a new session
              <button className="btn btn-primary" onClick={handleSubmit}>
                Confirm
              </button>
            )}
            {/* Close button to hide the form */}
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
