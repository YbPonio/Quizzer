<?php 

$dsn = "mysql:
        host=localhost;
        dbname=quizzer;
        user=root;
        password=;
";

$conn = new PDO($dsn);

$result = $conn->query("SELECT * FROM `fruits`")
                ->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);