<?php
  $v_cad=$_REQUEST["v_cad"];
  //$archivo = $_SERVER[‘HTTP_HOST’]."data/db.json";
  $archivo = "../data/db.json";
  if (file_exists($archivo)) unlink($archivo);  //Borra el archivo
  // a+, append para anexar al final del archivo, w+ lectura,escritura puntero al inicio, trunca archivo 
  $puntero = @fopen($archivo, 'a+');   
                                      
  if(!$puntero)
  {	  
	 echo 'NOK';
  }
  else
  {
	fwrite($puntero, $v_cad, strlen($v_cad));
	echo "OK";
  }
?>