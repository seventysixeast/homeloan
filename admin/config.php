<?php
	error_reporting(0);
	// header('Access-Control-Allow-Origin: *');
    // // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    // header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    // ini_set('upload_max_filesize', '20M');
    // ini_set('post_max_size', '20M');
	$DB_host = "localhost";
    $DB_user = "root";
    $DB_pass = "";
    $DB_name = "homeloan";
    $conn = mysqli_connect($DB_host , $DB_user , $DB_pass ,$DB_name );

    ini_set('upload_max_filesize', '20M');
    ini_set('post_max_size', '20M');
?>