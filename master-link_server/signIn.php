<?php
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents("php://input"));

$method = $_SERVER['REQUEST_METHOD'];
    include "conexion.php";
    $mysqli = conectarDB();

    session_start();    
    $mysqli->set_charset('utf8');


    $usuario = $_POST ['usuario'];
    $password = $_POST ['password'];

    $sql = "SELECT * FROM `users` WHERE `usuario` = '$usuario' AND `password` = '$password';" ;
  
    
    if ($method == 'POST'){
    $result = mysqli_query($mysqli,$sql);
    $count = mysqli_num_rows($result);
    if ($count == 1){
        $resultados = array();
        while($fila = mysqli_fetch_assoc($result)){
            $resultados[] = $fila;
            
        }
        echo json_encode($resultados[0]);
    } else http_response_code(404);

    }
    
      $mysqli->close();
?>