<?php

session_start();
if (!$_SESSION['validar']) {
    header("Location: ingreso");
    exit();
}
?>

<!--==============================
    INICIO
==============================-->
<div id="inicio">
<div id="cerrarSesion"><a href="salir">Cerrar Sesion</a></div>

<h2 id="saludo">!Hola <?php echo $_SESSION['primer_nombre']; ?><img style="border-radius:100%; margin-left:10px" width="30px"
src="<?php echo $_SESSION['foto']; ?>"> bienvenid@!</h2>

<!--==============================
    NIVEL 1
==============================-->
<div id="nivel1" class="niveles">
    <div class="puntaje"><?php echo $_SESSION['lvl1_score']; ?> pts</div>
    <img src="vista/img/intro/check.svg">
    <center><button onclick="inicio.elegirNivel(this)" nivel="1" id="<?php echo $_SESSION['id']; ?>">Jugar</button></center>
    <div class="puntajes">
        <h2>Mejores Puntajes</h2>
        <ul>
            <?php 
            $score1 = new GestorUsuariosController();
            $score1->puntuacionNivelController("lvl1_score");

            ?>
        </ul>
    </div>
</div>

<!--==============================
    NIVEL 2
==============================-->
<div id="nivel2" class="niveles">
    <div class="puntaje"><?php echo $_SESSION['lvl2_score']; ?> pts</div>
    <?php 
    if ($_SESSION['lvl2'] == 1) {
        echo '<img src="vista/img/intro/check.svg">
        <center><button onclick="inicio.elegirNivel(this)" nivel="2" id="' . $_SESSION['id'] . '">Jugar</button></center>';
    } else {
        echo '<img src="vista/img/intro/block.svg">';

    }
    ?>
    <div class="puntajes">
        <h2>Mejores Puntajes</h2>
        <ul>
            <?php 
            $score1 = new GestorUsuariosController();
            $score1->puntuacionNivelController("lvl2_score");

            ?>
        </ul>
    </div></div>

<!--==============================
    NIVEL 3
==============================-->
<div id="nivel3" class="niveles">
    <div class="puntaje"><?php echo $_SESSION['lvl3_score']; ?> pts</div>
    <?php 
    if ($_SESSION['lvl3'] == 1) {
        echo '<img src="vista/img/intro/check.svg">
        <center><button onclick="inicio.elegirNivel(this)" nivel="3" id="' . $_SESSION['id'] . '">Jugar</button></center>';
    } else {
        echo '<img src="vista/img/intro/block.svg">';

    }
    ?>
    <div class="puntajes">
        <h2>Mejores Puntajes</h2>
        <ul>
            <?php 
            $score1 = new GestorUsuariosController();
            $score1->puntuacionNivelController("lvl3_score");

            ?>
        </ul>
    </div>
    </div>

</div>

<!--==============================
    CANVAS
==============================-->
<canvas id="lienzo" width="1067px" height="600px"></canvas>
<div id="btnAmpliar" onclick="ampliar()">AMPLIAR JUEGO </div>

<!--==============================
    TABLERO
==============================-->

<div id="tablero">
    <div id="vidas">
        <ul>
            <li>
                <img id="vida1" src="vista\img\interfaz\vidas.png">
            </li>
            <li>
            <img id="vida2" src="vista\img\interfaz\vidas.png">
            </li>
            <li>
            <img id="vida3" src="vista\img\interfaz\vidas.png">
            </li>
        </ul>
    </div>

    <div id="monedas">

        <p>PTS </p>

        <span>0</span>
        <div id="spriteMoneda"></div>

    </div> 
    <div id="sonido">

<ul>
<li></li>
<li></li>
<li></li>
</ul>    
</div>
<div id="salida">
    <button onclick="juego.salirDelJuego()">X</button>
</div>
</div>

<!--==============================
    GAMEOVER
==============================-->
<div id="final">
<center>
<div>               
     <img src="vista/img/intro/facebook.svg" style="width: 50px; height: 50px;">
</div>
</center>
<h1>¡ENHORABUENA! <br>
<span id="puntuacionFinal">0</span> pts</h1>
<ul>
<li>
<h3>MONEDAS</h3>
<div id="spriteMonedaFinal"></div>
<h4 id="finalMonedas">
<span>100</span> pts
</h4>
</li>
<li></li>
<li>
<h3>VIDAS</h3>
<ol>
            <li>
                <img id="vida1f" style="width: 100%;"  src="vista\img\interfaz\vidas.png">
            </li>
            <li>
            <img id="vida2f" style="width: 100%;"  src="vista\img\interfaz\vidas.png">
            </li>
            <li>
            <img id="vida3f" style="width: 100%;" src="vista\img\interfaz\vidas.png">
            </li>
        </ol>
        <h4 id="finalVidas"><span>100</span> pts</h4>
        </li>
        </ul>

<!--==============================
    PRELOAD
==============================-->
<div id="carga">
<div id="preload">
<span>0%</span><br>
<meter value="0" min="0" max="100" high="90"></meter>
</div>
</div>