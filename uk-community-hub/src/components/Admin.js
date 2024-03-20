import React, { useState, useEffect } from "react";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";

const Admin = () => {
  const [volunteerSessions, setVolunteerSessions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchVolunteerSessions();
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const fetchVolunteerSessions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/volunteers/unapproved"
      );
      setVolunteerSessions(response.data);
    } catch (error) {
      console.error("Error fetching volunteer sessions:", error);
    }
  };

  const handleCheckboxChange = (sessionId) => {
    setSelectedRow(sessionId);
  };

  const handleApprove = async () => {
    if (!selectedRow) return; // Ensure a row is selected
    try {
      await axios.put(
        `http://localhost:8081/volunteers/${selectedRow}/approve`
      );
      fetchVolunteerSessions(); // Refresh table data after approval
    } catch (error) {
      console.error("Error approving session:", error);
    } finally {
      setSelectedRow(null); // Clear selected row
    }
  };

  const handleDeny = async () => {
    if (!selectedRow) return; // Ensure a row is selected
    try {
      await axios.delete(`http://localhost:8081/volunteers/${selectedRow}`);
      fetchVolunteerSessions(); // Refresh table data after denial
    } catch (error) {
      console.error("Error denying session:", error);
    } finally {
      setSelectedRow(null); // Clear selected row
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Information</Popover.Header>
      <Popover.Body>
        Throughout this site you will see info icons like me. Click them to
        learn more about the section you are on{" "}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="hero">
      <div>
        <div className="div-heading">
          <h2>Admin Page</h2>{" "}
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <img
              src="./images/info-circle-line-icon.png"
              alt="Info"
              className="info-icon"
            />
          </OverlayTrigger>
        </div>
        <h4 className="booking-sub">Available Sessions</h4>
        {volunteerSessions.length > 0 ? (
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Session ID</th>
                  <th>Session Name</th>
                  <th>Date</th>
                  <th>Experience</th>
                  <th>Approve</th>
                </tr>
              </thead>
              <tbody>
                {volunteerSessions.map((session) => (
                  <tr key={session.SessionID}>
                    <td>{session.organizerUsername}</td>
                    <td>{session.SessionID}</td>
                    <td>{session.SessionName}</td>
                    <td>
                      {new Date(session.Date).toLocaleDateString("en-GB")}
                    </td>
                    <td>{session.Experience}</td>
                    <td>
                      {isLoggedIn && (
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(session.SessionID)
                          }
                          checked={selectedRow === session.SessionID}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No available sessions</p>
        )}
        {selectedRow && (
          <div>
            <button className="btn btn-success mb-2" onClick={handleApprove}>
              Approve
            </button>
            <button className="btn btn-danger mb-2" onClick={handleDeny}>
              Deny
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
