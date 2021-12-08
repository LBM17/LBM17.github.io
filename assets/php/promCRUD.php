<?php
    require('config.php');
    //Se establece la cabecera 
    header("Content-Type: application/json; charset=UTF-8");
    //Se recoge el objeto por método GET en este caso un objeto de la clase promocion 
    $promocion = json_decode($_GET["objetoProm"], false); 
    $nombre = $promocion->nombre;  
    $seccion= $promocion->categoria; 
    $descripcion = $promocion->descripcion; 
    $activa = $promocion->activa; 
    $query = $connection->prepare("INSERT INTO promociones VALUES(:nombre, :seccion, :descripcion, :activa)");
    $query->execute(array(':nombre'=>$nombre, ':seccion'=>$seccion, ':descripcion'=>$descripcion, ':activa'=>$activa)); 
    if($query){ echo json_encode($promocion);}
?> 