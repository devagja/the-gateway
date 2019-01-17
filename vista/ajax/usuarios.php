<?php

require_once "../../controlador/usuarios.php";
require_once "../../modelo/usuarios.php";

class Ajax
{
    
    /*==============================
        LOGIN DE JUGADOR 
    ==============================*/
    public $identificador;
    public $primer_nombre;
    public $foto;

    public function gestorUsuariosAjax()
    {

        $datos = array(
            'identificador' => $this->identificador,
            'primer_nombre' => $this->primer_nombre,
            'foto' => $this->foto
        );

        GestorUsuariosController::guardarUsuariosController($datos);
    }

    /*==============================
        PASAR DE NIVEL
    ==============================*/
    public $nivel;
    public $puntuacion;
    public $numero_nivel;
    public $id;

    public function gestorPuntuacionAjax()
    {
        $datos = array(
            'nivel' => $this->nivel,
            'puntuacion' => $this->puntuacion,
            'numero_nivel' => $this->numero_nivel,
            'id' => $this->id
        );

        $respuesta = GestorUsuariosController::guardarPuntuacionController($datos);

        echo $respuesta;
    }
}

/*==============================
OBJETOS REGISTRO DE USUARIO
==============================*/

/* SI VIENE EL CAMPO IDENTIFICADOR , CREAMOS UNA CLASE AJAX
   Y LE ASIGNAMOS LOS VALORES DEL USUARIO*/
if (isset($_POST['identificador'])) {
    $a = new Ajax();
    $a->identificador = $_POST['identificador'];
    $a->primer_nombre = $_POST['primer_nombre'];
    $a->foto = $_POST['foto'];
    $a->gestorUsuariosAjax();
}

/*==============================
OBJETOS PASO DE NIVELES
==============================*/

/* SI VIENE EL CAMPO IDENTIFICADOR , CREAMOS UNA CLASE AJAX
Y LE ASIGNAMOS LOS VALORES DEL USUARIO*/
if (isset($_POST['nivel'])) {
    $b = new Ajax();
    $b->nivel = $_POST['nivel'];
    $b->puntuacion = $_POST['puntuacion'];
    $b->numero_nivel = $_POST['numero_nivel'];
    $b->id = $_POST['id'];
    $b->gestorPuntuacionAjax();
}