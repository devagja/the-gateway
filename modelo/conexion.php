<?php

class Conexion{

    /*==============================
        ESTABLECE LA CONEXION CON LA BD
    ==============================*/
    public function conectar(){
        $link = new PDO("mysql:host=localhost;dbname=the_gateway","dwes","abc123.");
        return $link;
    }
}