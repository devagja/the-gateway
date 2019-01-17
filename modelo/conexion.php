<?php

class Conexion{

    /*==============================
        ESTABLECE LA CONEXION CON LA BD
    ==============================*/
    public function conectar(){
        $link = new PDO("mysql:host=eu-cdbr-west-02.cleardb.net;dbname=the_gateway","b9442af054b7b5","6b8c5055");
        return $link;
    }
}