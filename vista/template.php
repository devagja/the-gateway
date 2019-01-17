<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>CANVAS</title>
    <link rel="icon" href="vista/img/intro/favicon.png">
    <link href="vista/css/estilo.css" type="text/css" rel="stylesheet" media="">
    <!-- Al ser un plugin lo cargamos desde la cabecera-->
    <script src="vista/js/screenfull.min.js"></script>
</head>

<body>


    <!--==============================
            PANTALLA VERTICAL
    ==============================-->
    <div id="vertical">

    </div>

<!--==============================
        MARCO
==============================-->
<div id="marco">

</div>

    
    <!--==============================
            CONTENEDOR
    ==============================-->
    <div id="contenedor">
        <?php
        if (isset($_GET["validar"])) {

            switch ($_GET['validar']) {
                case "inicio":
                    include "modulos/inicio.php";
                    break;
                case "salir":
                    include "modulos/salir.php";
                    break;
                default:
                    include "modulos/ingreso.php";

            }

        } else {

        }
        ?>
    </div>

    
    <!--==============================
            CREDITOS
    ==============================-->
    <footer>

        <center>
            <p>Juego desarrollado por Jose Antonio Aguilar Granados | <a href="linkedin" target="_blank">linkedin</a></p>
        </center>

    </footer>
   
    <script src="vista/js/variables_y_propiedades.js"></script>
    <script src="vista/js/inicio.js"></script>
    <script src="vista/js/juego.js"></script> 
    <script src="vista/js/lienzo.js"></script>
    <script src="vista/js/ampliarCanvas.js"></script>

</body>

</html>