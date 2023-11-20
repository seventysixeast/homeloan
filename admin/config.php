<?php
	error_reporting(0);
	header('Access-Control-Allow-Origin: *');

	$DB_host = "localhost";
    $DB_user = "root";
    $DB_pass = "";
    $DB_name = "homeloan";
    $conn = mysqli_connect($DB_host , $DB_user , $DB_pass ,$DB_name );
?>