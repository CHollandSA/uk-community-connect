<?php
$host = 'localhost';
$username = 'cholland12';
$password = '1VdlRhK92fKn3VtV';
$dbname = 'cholland12';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
  echo "not connected" . $conn->connect_error;
} else {
  echo "connected";
}
?>
