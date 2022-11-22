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
    $result = mysqli_query($mysqli,"SELECT * FROM links;");
    } else if($method == 'POST'){
    $link = $dataObject-> link;
    $descripcion = $dataObject-> descripcion;
    $tipo = $dataObject-> tipo;
    $result = mysqli_query($mysqli, "INSERT INTO links(`link`, `descripcion`, `tipo`) VALUES ('$link','$descripcion','$tipo')");
    
  }else if($method == "PUT"){
    $id = $dataObject-> id;
    $link = $dataObject-> link;
    $descripcion = $dataObject-> descripcion;
    $tipo = $dataObject-> tipo;

    $result = mysqli_query($mysqli,"UPDATE links SET `link`='$link',`descripcion`='$descripcion',`tipo`='$tipo' WHERE id = '$id'");
    } else if($method == "DELETE"){
      $id = $dataObject-> id;
      $result = mysqli_query($mysqli,"DELETE FROM `links` WHERE id = '$id'");
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