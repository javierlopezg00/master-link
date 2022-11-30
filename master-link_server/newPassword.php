<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));

$method = $_SERVER['REQUEST_METHOD'];
    include "conexion.php";
    $mysqli = conectarDB();

    $JSONData = file_get_contents("php://input");
    $dataObject = json_decode($JSONData);

    session_start();    
    $mysqli->set_charset('utf8');


    if($method == "PUT"){
    $id = $dataObject-> id;
    $newPassword = $dataObject-> newPassword;

    $result = mysqli_query($mysqli,"UPDATE `users` SET `password`='$newPassword' WHERE id = '$id'");
    } 
      $mysqli->close();
    
?>

