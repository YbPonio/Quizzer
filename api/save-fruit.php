<?php 

$dsn = "mysql:
        host=localhost;
        dbname=quizzer;
        user=root;
        password=;
";

$conn = new PDO($dsn);

$name = $_GET['name'];
$score = $_GET['score'];

$result = $conn->query("INSERT INTO `score` (`id`, `name`, `score`) VALUES (NULL, '$name', '$score');");