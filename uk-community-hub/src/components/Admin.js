import React, { useState, useEffect } from "react";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";

const Admin = () => {
  const [volunteerSessions, setVolunteerSessions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchVolunteerSessions();
    fetchUsers();
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const fetchVolunteerSessions = async () => {
    try {
      const response = await axios.get(
        "https://express-backend-plum.vercel.app/volunteers/unapproved"
      );
      setVolunteerSessions(response.data);
    } catch (error) {
      console.error("Error fetching volunteer sessions:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://express-backend-plum.vercel.app/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCheckboxChange = (sessionId) => {
    setSelectedRow(sessionId);
  };

  const handleApprove = async () => {
    if (!selectedRow) return; // Ensure a row is selected
    try {
      await axios.put(
        `https://express-backend-plum.vercel.app/volunteers/${selectedRow}/approve`
      );
      fetchVolunteerSessions();
    } catch (error) {
      console.error("Error approving session:", error);
    } finally {
      setSelectedRow(null);
    }
  };

  const handleDeny = async () => {
    if (!selectedRow) return; // Ensure a row is selected
    try {
      await axios.delete(
        `https://express-backend-plum.vercel.app/volunteers/${selectedRow}`
      );
      fetchVolunteerSessions(); // Refresh table data after denial
    } catch (error) {
      console.error("Error denying session:", error);
    } finally {
      setSelectedRow(null); // Clear selected row
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }

      await axios.delete(
        `https://express-backend-plum.vercel.app/users/${userId}`
      );
      fetchUsers(); // Refresh user data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
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
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <img
              src="./images/info-circle-line-icon.png"
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
      <div>
        <h4 className="booking-sub">Users</h4>
        {users.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.UserID}</td>
                    <td>{`${user.FirstName} ${user.LastName}`}</td>
                    <td>{user.UserName}</td>
                    <td>{user.Email}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleUserDelete(user.UserID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
