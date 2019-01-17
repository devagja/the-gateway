<?php

class GestorUsuariosController
{
    /*==============================
        GUARDAR USUARIOS 
    ==============================*/
    static public function guardarUsuariosController($datos)
    {
        $datosController = array(
            "identificador" => $datos['identificador'],
            "primer_nombre" => $datos['primer_nombre'],
            "foto" => $datos['foto'],
            "lvl1" => true
        );

        $respuestaSeleccionar = GestorUsuariosModel::seleccionarUsuariosModel($datosController);

        // El usuario no existe en la bd
        // Lo crea
        if (!$respuestaSeleccionar) {
            $respuestaInsertar = GestorUsuariosModel::guardarUsuariosModel($datosController);
        }

        // El usuario existe o se acaba de crear
        // Se inicia sesion
        if ($respuestaSeleccionar || $respuestaInsertar == true) {

            $respuestaSeleccionar = GestorUsuariosModel::seleccionarUsuariosModel($datosController);

            session_start();

            $_SESSION['validar'] = true;
            $_SESSION['id'] = $respuestaSeleccionar['id'];
            $_SESSION['primer_nombre'] = $respuestaSeleccionar['primer_nombre'];
            $_SESSION['foto'] = $respuestaSeleccionar['foto'];
            $_SESSION['lvl1'] = $respuestaSeleccionar['lvl1'];
            $_SESSION['lvl2'] = $respuestaSeleccionar['lvl2'];
            $_SESSION['lvl3'] = $respuestaSeleccionar['lvl3'];
            $_SESSION['lvl1_score'] = $respuestaSeleccionar['lvl1_score'];
            $_SESSION['lvl2_score'] = $respuestaSeleccionar['lvl2_score'];
            $_SESSION['lvl3_score'] = $respuestaSeleccionar['lvl3_score'];
        }
    }

    /*==============================
        CONSULTA LA PUNTUACION 
    ==============================*/
    static public function puntuacionNivelController($datos)
    {
        $respuesta = GestorUsuariosModel::puntuacionNivelModel($datos);

        foreach ($respuesta as $row => $item) {
            if ($item[$datos] > 0) {
                echo '<li>
                <img src="' . $item["foto"] . '">
                <h3>' . $item["primer_nombre"] . '</h3>
                <h2>' . $item[$datos] . '</h2>
                </li>';
            }
        }
    }

    /*==============================
        GUARDA LA PUNTUACION 
    ==============================*/
    static public function guardarPuntuacionController($datos)
    {
        // selecciona el nivel a desbloquear
        $n_nivel = 0;
        if ($datos['numero_nivel'] == 3) {
            $n_nivel = $datos['numero_nivel'];
        }

        if ($datos['numero_nivel'] < 3) {
            $n_nivel = $datos['numero_nivel'] + 1;
        }

        $datosController = array(
            'nivel' => $datos['nivel'],
            'puntuacion' => $datos['puntuacion'],
            'numero_nivel' => "lvl" . $n_nivel,
            'puntuacion_nivel' => "lvl" . $datos['numero_nivel'] . "_score",
            'id' => $datos['id']
        );

        $respuesta = GestorUsuariosModel::guardarPuntuacionModel($datosController, "usuario");

        if ($respuesta == "true") {
            $r1 = GestorUsuariosModel::seleccionarPuntuacionModel($datosController, "usuario");
            session_start();
            $_SESSION['lvl1'] = $r1['lvl1'];
            $_SESSION['lvl2'] = $r1['lvl2'];
            $_SESSION['lvl3'] = $r1['lvl3'];
            $_SESSION['lvl1_score'] = $r1['lvl1_score'];
            $_SESSION['lvl2_score'] = $r1['lvl2_score'];
            $_SESSION['lvl3_score'] = $r1['lvl3_score'];
            echo "true";
        }
    }
}