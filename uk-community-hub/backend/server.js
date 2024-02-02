
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'sql8.freesqldatabase.com',
  user: 'sql8680787',
  password: 'ChywQAuaes',
  database: 'sql8680787'
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});



app.post('/signup', (req, res) => {
  const { name, surname, email, password, username } = req.body;

  // Check if the username or email already exists
  const checkUserQuery = 'SELECT COUNT(*) AS count FROM users WHERE UserName = ? OR Email = ?';
  db.query(checkUserQuery, [username, email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking existing user:', checkErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const userExists = checkResult[0].count > 0;
    if (userExists) {
      // User already exists, return an error response
      return res.status(400).json({ error: 'User already exists in the system' });
    }

    // Insert the new user
    const insertUserQuery = 'INSERT INTO users (FirstName, LastName, Email, Password, UserName) VALUES (?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [name, surname, email, password, username], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error executing INSERT query:', insertErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log(insertResult);
      console.log('User inserted successfully');
      return res.status(200).json({ message: 'User inserted successfully' });
    });
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE UserName = ? AND Password = ?';
  db.query(sql, [username, password], (err, data) => {
    if (err) {
      console.error('Error executing SELECT query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        user: {// this is creating a user from the data found and sending it to the front end 
          username: data[0].UserName,
          firstName: data[0].FirstName,
          lastName: data[0].LastName,
        },
      });
    } else {
      return res.status(200).json({ success: false });
    }
  });
});



app.post('/volunteers', (req, res) => {
  const { name, email, skills } = req.body;

  const sql = 'INSERT INTO volunteers (name, email, skills) VALUES (?, ?, ?)';
  db.query(sql, [name, email, skills], (err, result) => {
    if (err) {
      console.error('Error executing INSERT query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log(result);
    return res.status(200).json({ message: 'Data inserted successfully' });
  });
});

app.get('/volunteers', (req, res) => {
  const sql = 'SELECT * FROM VolunteerSessions';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing SELECT query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json(data);
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});