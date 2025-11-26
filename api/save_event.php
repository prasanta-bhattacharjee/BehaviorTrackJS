<?php
require "db.php";

$type = $_POST['event_type'] ?? "unknown";
$data = $_POST['event_data'] ?? "{}";

$stmt = $conn->prepare("INSERT INTO user_events (event_type, event_data) VALUES (?, ?)");
$stmt->bind_param("ss", $type, $data);
$stmt->execute();

echo "OK";
?>
