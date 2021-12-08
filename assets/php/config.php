<?php
    define('USER', 'root'); 
    define('HOST', 'localhost'); 
    define('PASSWORD', ''); 
    define('DATABASE', 'supermercado'); 

    try {
        $connection = new PDO("mysql:host=".HOST.";dbname=".DATABASE, USER, PASSWORD);
    } catch (PDOException $e) {
        exit("Error: " . $e->getMessage());
    }
    ?>
