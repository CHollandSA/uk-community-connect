import React, { useState, useEffect } from "react";
import axios from "axios";
import { OverlayTrigger, Popover } from "react-bootstrap";

//This component was one of the last that I implemented. I was oroginally going to load a whole a new page for an admin session but thought creating a new component for it and hiding others to be easier to implement
//I did this towards the end as I had prioritised the functionality of adding users , sessions etc.

const Admin = () => {
  const [volunteerSessions, setVolunteerSessions] = useState([]); // This React Hook stores the sessions of volunteers from the backend
  const [selectedRow, setSelectedRow] = useState(null); //holds the contents of the selected row to be used
  const [isLoggedIn, setIsLoggedIn] = useState(false); // this stores the user id of the user logged in
  const [users, setUsers] = useState([]); // this stores an array of all the users in the system

  useEffect(() => {
    fetchVolunteerSessions();
    fetchUsers();
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const fetchVolunteerSessions = async () => {
    // this function fetches all volunteers from the system who have not been approved by the admin
    try {
      const response = await axios.get(
        "https://express-backend-plum.vercel.app/volunteers/unapproved" //this is the rest api end point
      );
      setVolunteerSessions(response.data); // sets the volunteer array to the returned data
    } catch (error) {
      console.error("Error fetching volunteer sessions:", error); // this error is returned if this function is not succcessful
    }
  };

  const fetchUsers = async () => {
    // this function works in the same way as the above except it fetches all the users from the system
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
    // this gets the session Id from the same row that has had its checkbox changed
    setSelectedRow(sessionId);
  };

  const handleApprove = async () => {
    if (!selectedRow) return; // Ensures a row is selected
    try {
      await axios.put(
        //axios.put updates the database
        `https://express-backend-plum.vercel.app/volunteers/${selectedRow}/approve`
      );
      fetchVolunteerSessions(); // updates the volunteer table after the Approve button is clicked
    } catch (error) {
      console.error("Error approving session:", error);
    } finally {
      setSelectedRow(null); // unselects the row to ensure it is not selected again
    }
  };

  const handleDeny = async () => {
    if (!selectedRow) return; // Ensures a row is selected
    try {
      await axios.delete(
        // deletes the row from the database
        `https://express-backend-plum.vercel.app/volunteers/${selectedRow}`
      );
      fetchVolunteerSessions(); // Refreshes table data after denial
    } catch (error) {
      console.error("Error denying session:", error);
    } finally {
      setSelectedRow(null); // Clears selected row
    }
  };

  const handleUserDelete = async (userId) => {
    // this function runs whenever selected user is to be deleted.
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
      console.error("Error deleting user:", error); //Error shown when this is not successful
    }
  };

  const popover = //this popover is imported from react-bootstrap. Its purpose is to show the user additional info when the (i) symbol is clicked
    (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Admin</Popover.Header>
        <Popover.Body>
          This section allows the admin to approve and deny volunteer sessions.
          Be sure to check the experience of the volunteer and if it is
          appropriate for the session. If you require more information you
          should email the volunteer
          <br />
          <br />
          Deny sessions that do not have good experience. We want only the best
          sessions on our system{" "}
        </Popover.Body>
      </Popover>
    );

  return (
    //directly below is the heading and the info symbol for the admin section
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
        {volunteerSessions.length > 0 ? ( //this will show all the volunteer sessions in a table that is styled using bootstarp css framework if it is greater than 0
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
                {volunteerSessions.map(
                  (
                    session //this react displays the sessions fetched from the database in the table .
                  ) => (
                    <tr key={session.SessionID}>
                      <td>{session.organizerUsername}</td>
                      <td>{session.SessionID}</td>
                      <td>{session.SessionName}</td>
                      <td>
                        {
                          new Date(session.Date).toLocaleDateString(
                            "en-GB"
                          ) /*displays the time in UK format*/
                        }
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
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          // the text below is shown if there are no new sessions submitted
          <p>No available sessions</p>
        )}
        {selectedRow && ( //shows the approve and deny button when a row is selected. When these are clicked they use the functions towards the top of the file
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
        {users.length > 0 ? ( //displays all the users from the database in the table . This table i
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
                {users.map(
                  (
                    user // maps the users to the table data from the users fetched from the database
                  ) => (
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
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          //this message will only be displayed if there is no internet connection or if all users have beeen deleted from the system
          <p>No users available</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
