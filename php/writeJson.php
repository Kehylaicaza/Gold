<?php
$data = $_REQUEST['identificador'];
$file = 'datos.json';

if (isset($data)) {
    $fp = fopen($file, 'w');
    fwrite($fp, utf8_decode($data));
    fclose($fp);
    //chmod($file, 0777);
    echo 'Se han guardado correctamente la información en el txt!';
}
else {
    echo 'No hay datos que guardar!';
}
?>