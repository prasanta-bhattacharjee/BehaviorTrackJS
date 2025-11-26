<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "behavior_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Database error: " . $conn->connect_error);
}
?>
