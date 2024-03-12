const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "sql8.freesqldatabase.com",
  user: "sql8680787",
  password: "ChywQAuaes",
  database: "sql8680787",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.get("/users/:username", (req, res) => {
  const { username } = req.params;

  const sql = "SELECT id FROM users WHERE UserName = ?";
  db.query(sql, [username], (err, data) => {
    if (err) {
      console.error("Error executing SELECT query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length > 0) {
      const userId = data[0].id;
      return res.status(200).json({ id: userId });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
});

app.post("/signup", (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    username,
    isOrganization,
    companyName,
  } = req.body;

  // Check if the username or email already exists
  const checkUserQuery =
    "SELECT COUNT(*) AS count FROM users WHERE UserName = ? OR Email = ?";
  db.query(checkUserQuery, [username, email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking existing user:", checkErr);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const userExists = checkResult[0].count > 0;
    if (userExists) {
      // User already exists, return an error response
      return res
        .status(400)
        .json({ error: "User already exists in the system" });
    }

    // Insert the new user
    const insertUserQuery =
      "INSERT INTO users (FirstName, LastName, Email, Password, UserName, Company) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      insertUserQuery,
      [name, surname, email, password, username, isOrganization],
      (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error executing INSERT query:", insertErr);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("User inserted successfully");

        if (isOrganization === "true") {
          // Insert into Organizations table only if isOrganization is true
          const insertOrganizationQuery =
            "INSERT INTO Organizations (Name, UserID) VALUES (?, ?)";
          db.query(
            insertOrganizationQuery,
            [companyName, insertResult.insertId],
            (orgInsertErr, orgInsertResult) => {
              if (orgInsertErr) {
                console.error(
                  "Error inserting into Organizations table:",
                  orgInsertErr
                );
                return res.status(500).json({ error: "Internal Server Error" });
              }
              console.log("Organization inserted successfully");
            }
          );
        }

        return res.status(200).json({ message: "User inserted successfully" });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE UserName = ? AND Password = ?";
  db.query(sql, [username, password], (err, data) => {
    if (err) {
      console.error("Error executing SELECT query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        user: {
          // this is creating a user from the data found and sending it to the front end
          userID: data[0].UserID,
          username: data[0].UserName,
          firstName: data[0].FirstName,
          lastName: data[0].LastName,
          company: data[0].Company,
        },
      });
    } else {
      return res.status(200).json({ success: false });
    }
  });
});

app.post("/volunteers", (req, res) => {
  const {
    sessionName,
    location,
    date,
    time,
    duration,
    maxParticipants,
    experience,
  } = req.body;
  const organizerId = req.headers["user-id"]; // Retrieve userId from headers

  const sql =
    "INSERT INTO VolunteerSessions (SessionName, Location, Date, Time, Duration, MaxParticipants, OrganizerID, Experience, MaxVolunteers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      sessionName,
      location,
      date,
      time,
      duration,
      maxParticipants,
      organizerId,
      experience,
      maxParticipants,
    ],
    (err, result) => {
      if (err) {
        console.error("Error executing INSERT query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log(result);
      return res.status(200).json({ message: "Data inserted successfully" });
    }
  );
});

app.get("/volunteers/:userId", (req, res) => {
  const { userId } = req.params;

  // Query to fetch sessions that the user has not signed up for
  const sql = `
    SELECT *
    FROM VolunteerSessions
    WHERE SessionID NOT IN (
      SELECT SessionID FROM SessionSignups WHERE UserID = ?
    )
  `;
  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Error executing SELECT query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.post("/session-signup", (req, res) => {
  const { sessionId, userId } = req.body;

  const sql = "INSERT INTO SessionSignups (SessionID, UserID) VALUES (?, ?)";
  db.query(sql, [sessionId, userId], (err, result) => {
    if (err) {
      console.error("Error executing INSERT query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Session signed up successfully");
    return res.status(200).json({ message: "Session signed up successfully" });
  });
});

app.post("/session-cancellation", (req, res) => {
  const { sessionId, userId } = req.body;

  const sql = "DELETE FROM SessionSignups WHERE SessionID = ? AND UserID = ?";
  db.query(sql, [sessionId, userId], (err, result) => {
    if (err) {
      console.error("Error executing DELETE query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Successfully cancelled session");
    return res.status(200).json({ message: "Successfully cancelled session" });
  });
});

app.get("/booked-sessions/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT VolunteerSessions.SessionID, SessionName, Date, Time
    FROM SessionSignups
    INNER JOIN VolunteerSessions ON SessionSignups.SessionID = VolunteerSessions.SessionID
    WHERE UserID = ?
  `;
  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Error executing SELECT query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(data);
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
