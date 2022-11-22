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


    

    if ($method == 'GET'){
    $result = mysqli_query($mysqli,"SELECT * FROM users;");
    } else if($method == 'POST'){
    $nombre = $dataObject-> nombre;
    $apellido = $dataObject-> apellido;
    $usuario = $dataObject-> usuario;
    $tipo = $dataObject-> tipo;
    $result = mysqli_query($mysqli, "INSERT INTO users(`nombre`, `apellido`, `usuario`, `tipo`) VALUES ('$nombre','$apellido','$usuario','$tipo')");
    
  }else if($method == "PUT"){
    $id = $dataObject-> id;
    $nombre = $dataObject-> nombre;
    $apellido = $dataObject-> apellido;
    $usuario = $dataObject-> usuario;
    $tipo = $dataObject-> tipo;

    $result = mysqli_query($mysqli,"UPDATE users SET `nombre`='$nombre',`apellido`='$apellido',`usuario`='$usuario',`tipo`='$tipo' WHERE id = '$id'");
    } else if($method == "DELETE"){
      $id = $dataObject-> id;
      $result = mysqli_query($mysqli,"DELETE FROM `users` WHERE id = '$id'");
      }
    
    if ($method == 'GET') {
        $resultados = array();
        while($fila = mysqli_fetch_assoc($result)){
            $resultados[] = $fila;
        }
        echo json_encode($resultados);
      } else {
        echo mysqli_affected_rows($sql);
      }
      $mysqli->close();
    
?>