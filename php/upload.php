<?php
//comprobamos que sea una petición ajax
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') 
{

    //obtenemos el archivo a subir
    $file = $_FILES['archivo']['name'];
    $path="../imagenes/historias/";
    //comprobamos si existe un directorio para subir el archivo
    //si no es así, lo creamos
    if(!is_dir($path)) 
        mkdir($path, 0777);
     
    //comprobamos si el archivo ha subido
    //AGREGA EL ARCHIVO
    if ($file && move_uploaded_file($_FILES['archivo']['tmp_name'],$path.$file))
    {
       sleep(1);//retrasamos la petición 3 segundos
       echo $file;//devolvemos el nombre del archivo para pintar la imagen
    }
}else{
    throw new Exception("Error Processing Request", 1);   
}