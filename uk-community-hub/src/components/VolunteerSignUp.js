import React, { useState } from "react";
import "./App.css";

function VolunteerSignUp({ setShowForm }) {
  const [sessionName, setSessionName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(
        "https://express-backend-plum.vercel.app/volunteers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": userId, // Pass userId in the headers
          },
          body: JSON.stringify({
            sessionName,
            location,
            date,
            time,
            duration,
            maxParticipants,
            experience,
            host: "Individual",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        window.alert(
          "Session successfully sent off for approval!Check back in a few days"
        );
        setShowForm(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => setShowForm(false)}
        >
          Close
        </button>
      </div>
    </form>
  );
}

export default VolunteerSignUp;
