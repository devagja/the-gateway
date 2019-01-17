/*==============================
    METODOS DEL OBJETO JUEGO
==============================*/

var juego = {

    /*==============================
SALIR JUEGO
    ==============================*/
    salirDelJuego: function () {
        window.location.reload();
    },
    /*==============================
    EVENTOS TECLADO
==============================*/
    teclado: function () {
        document.addEventListener("keydown", juego.oprimir);
        document.addEventListener("keyup", juego.soltar);
    },

    /*==============================
        OPRIMIR TECLADO
    ==============================*/
    oprimir: function (tecla) {

        tecla.preventDefault();

        if (tecla.keyCode == 37) {
            datos.izquierda = true;
        }
        if (tecla.keyCode == 39) {
            datos.derecha = true;
        }
        if (tecla.keyCode == 38) {
            datos.salto = true;
        }
        if (tecla.keyCode == 32) {
            datos.disparo = true;
        }
    },

    /*==============================
        SOLTAR TECLADO
    ==============================*/
    soltar: function (tecla) {

        tecla.preventDefault();

        if (tecla.keyCode == 37) {
            datos.izquierda = false;
            datos.imgJugador.src = "vista/img/jugador/iddle.png";
        }
        if (tecla.keyCode == 39) {
            datos.derecha = false;
            datos.imgJugador.src = "vista/img/jugador/iddle.png";

        }
        if (tecla.keyCode == 38) {
            datos.salto = false;
        }
        if (tecla.keyCode == 32) {
            datos.disparo = false;
        }
    },

    tiempo: function () {
        /*==============================
            LLAMADA DEL CANVAS
        ==============================*/
        lienzo.canvas();
        /*==============================
           CICLO DEL SPRITE
       ==============================*/
        if (datos.ciclo_sprite >= 270) {
            datos.ciclo_sprite = 0;
        } else {
            datos.ciclo_sprite += 5;
        }

        //no es optimo
        switch (datos.ciclo_sprite) {

            case 0:
                datos.sprite_x = 0;
                break;
            case 90:
                datos.sprite_x = 90;
                break;
            case 180:
                datos.sprite_x = 180;
                break;
        }

        /*==============================
            CICLO TRAMPAS
        ==============================*/
        if (datos.movEnemigos <= 0) {
            datos.cambioSentidoEnemigos = false;
        }
        if (datos.movEnemigos >= 100) {
            datos.cambioSentidoEnemigos = true;
        }
        if (!datos.cambioSentidoEnemigos) {
            datos.movEnemigos++;
        } else {
            datos.movEnemigos--;
        }

        //no es optimo
        switch (datos.ciclo_sprite) {

            case 0:
                datos.sprite_x = 0;
                break;
            case 90:
                datos.sprite_x = 90;
                break;
            case 180:
                datos.sprite_x = 180;
                break;
        }

        /*==============================
            MOVIMIENTO HORIZONTAL ESCENARIO
        ==============================*/
        datos.desplazamientoEscenario += datos.movimiento;
        /*==============================
           MOVIMIENTO HORIZONTAL JUGADOR
        ==============================*/
        if (datos.desplazamientoEscenario <= datos.limiteEscenario) {
            datos.jugador_x += datos.movimientoJugador
        }
        /*==============================
            MOVIMIENTO HORIZONTAL PLATAFORMA
        ==============================*/
        for (var i = 0; i < datos.plataforma.length; i++) {
            datos.plataforma[i].x += datos.movimiento;
        }
        /*==============================
            MOVIMIENTO HORIZONTAL MONEDAS
        ==============================*/
        for (var i = 0; i < datos.posMonedas.length; i++) {
            datos.posMonedas[i].x += datos.movimiento;
        }
        /*==============================
            MOVIMIENTO HORIZONTAL TRAMPAS
        ==============================*/
        for (var i = 0; i < datos.posTrampas.length; i++) {
            datos.posTrampas[i].x += datos.movimiento;
        }
        /*==============================
            MOVIMIENTO HORIZONTAL MAILBOXES
        ==============================*/
        for (var i = 0; i < datos.posMailbox.length; i++) {

            datos.posMailbox[i].x += datos.movimiento;
        }
        /*==============================
            MOVIMIENTO HORIZONTAL MAILS
        ==============================*/
        for (var i = 0; i < datos.posMails.length; i++) {

            datos.posMails[i].x += datos.movimiento;
        }
        /*==============================
            MOVIMIENTO IZQUIERDA
        ==============================*/
        if (datos.izquierda) {

            if (datos.desplazamientoEscenario >= 0) {
                datos.movimiento = 0;

            } else if (datos.desplazamientoEscenario <= datos.limiteEscenario) {

                if (datos.jugador_x <= 70) {
                    datos.movimiento = datos.velocidad;

                } else {
                    datos.movimiento = 0;
                    datos.movimientoJugador = -datos.velocidad;
                }

            } else {
                datos.movimiento = datos.velocidad;
            }

            if (datos.gravedad == 0) {
                datos.imgJugador.src = "vista/img/jugador/run_left.png";

            }
            if (datos.salto && datos.gravedad == 0) {
                datos.imgJugador.src = "vista/img/jugador/jump_left.png";
            }
        }

        /*==============================
            MOVIMIENTO DERECHA
        ==============================*/
        if (datos.derecha) {

            if (datos.desplazamientoEscenario <= datos.limiteEscenario) {
                datos.movimiento = 0;
                datos.movimientoJugador = datos.velocidad;

            } else {
                datos.movimiento = -datos.velocidad;
            }

            if (datos.gravedad == 0) {
                datos.imgJugador.src = "vista/img/jugador/run_right.png";
            }
            if (datos.salto && datos.gravedad == 0) {
                datos.imgJugador.src = "vista/img/jugador/jump_right.png";
            }
        }

        /*==============================
            DETENIENDO MOVIMIENTO ESCENARIO Y JUGADOR
        ==============================*/
        if (!datos.izquierda && !datos.derecha) {
            datos.movimiento = 0;
            datos.movimientoJugador = 0;
        }

        /*==============================
            GRAVEDAD
        ==============================*/
        datos.jugador_y += datos.gravedad;
        if (datos.gravedad < datos.limiteGravedad) {
            datos.gravedad += datos.peso;
        }

        /*==============================
            COLISION CON PLATAFORMA
        ==============================*/
        for (var i = 0; i < datos.plataforma.length; i++) {

            function colisionPlataforma() {
                // no colision arriba
                if ((datos.jugador_y + datos.jugador_alto) < datos.plataforma[i].y) {
                    return false;
                }
                // no colision abajo
                if ((datos.jugador_y) > (datos.plataforma[i].y + datos.plataforma[i].alto)) {
                    return false;
                }
                // no colision izquierda
                if ((datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x) {
                    return false;
                }
                // no colision derecha
                if ((datos.jugador_x) > (datos.plataforma[i].x + datos.plataforma[i].ancho)) {
                    return false;
                }
                return true;
            }
            cP = colisionPlataforma();
            if (cP && (datos.jugador_y + datos.jugador_alto) < datos.plataforma[i].y + datos.gravedad) {
                datos.gravedad = 0;
                datos.jugador_y = datos.plataforma[i].y - datos.jugador_alto;
            }

            if (cP && (datos.jugador_y - datos.gravedad) > datos.plataforma[i].y + datos.plataforma[i].alto) {
                datos.gravedad = 1;
                datos.jugador_y = datos.plataforma[i].y + datos.plataforma[i].alto;
            }

            if (datos.desplazamientoEscenario <= datos.limiteEscenario) {

                if (cP && (datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x + datos.movimientoJugador) {
                    datos.movimientoJugador = 0;
                    datos.jugador_x = datos.plataforma[i].x - datos.jugador_ancho;
                }
                if (cP && (datos.jugador_x - datos.movimientoJugador) > datos.plataforma[i].x + datos.plataforma[i].ancho) {
                    datos.movimientoJugador = 0;
                    datos.jugador_x = datos.plataforma[i].x + datos.plataforma[i].ancho;
                }
            } else {

                if (cP && (datos.jugador_x + datos.jugador_ancho) < datos.plataforma[i].x - datos.movimiento) {
                    datos.movimiento = 0;
                    datos.jugador_x = datos.plataforma[i].x - datos.jugador_ancho;
                }
                if (cP && (datos.jugador_x + datos.movimiento) > datos.plataforma[i].x + datos.plataforma[i].ancho) {
                    datos.movimiento = 0;
                    datos.jugador_x = datos.plataforma[i].x + datos.plataforma[i].ancho;
                }
            }

            /*==============================
                SALTO
            ==============================*/
            if (datos.salto && datos.gravedad == 0 && datos.jugador_y == datos.plataforma[i].y - datos.jugador_alto) {
                datos.gravedad = datos.alturaSalto;
            }
        }


        /*==============================
            COLISION CON MONEDA
        ==============================*/
        for (var i = 0; i < datos.posMonedas.length; i++) {

            function colisionMoneda() {
                // no colision arriba
                if ((datos.jugador_y + datos.jugador_alto) < datos.posMonedas[i].y) {
                    return false;
                }
                // no colision abajo
                if ((datos.jugador_y) > (datos.posMonedas[i].y + datos.posMonedas[i].alto)) {
                    return false;
                }
                // no colision izquierda
                if ((datos.jugador_x + datos.jugador_ancho) < datos.posMonedas[i].x) {
                    return false;
                }
                // no colision derecha
                if ((datos.jugador_x) > (datos.posMonedas[i].x + datos.posMonedas[i].ancho)) {
                    return false;
                }
                return true;
            }

            if (colisionMoneda()) {
                datos.posMonedas[i].y = -500;
                datos.contadorMonedas += 10;
                document.querySelector("#monedas span").innerHTML = datos.contadorMonedas;

            }
        }

        /*==============================
            COLISION CON TRAMPA
        ==============================*/
        for (var i = 0; i < datos.posTrampas.length; i++) {

            function colisionTrampa() {
                // no colision arriba
                if ((datos.jugador_y + datos.jugador_alto) < datos.posTrampas[i].y) {
                    return false;
                }
                // no colision abajo
                if ((datos.jugador_y) > (datos.posTrampas[i].y + datos.posTrampas[i].alto)) {
                    return false;
                }
                // no colision izquierda
                if ((datos.jugador_x + datos.jugador_ancho) < datos.posTrampas[i].x) {
                    return false;
                }
                // no colision derecha
                if ((datos.jugador_x) > (datos.posTrampas[i].x + datos.posTrampas[i].ancho)) {
                    return false;
                }
                return true;
            }

            cT = colisionTrampa();
            if (cT && (datos.jugador_y + datos.jugador_alto) < datos.posTrampas[i].y + datos.gravedad) {
                datos.salto = true;

                if (datos.vidas % 2 == 0) {
                    document.getElementById("vida" + datos.vidas / 2).src = "vista/img/interfaz/vidas-rotas.png";
                    //  document.querySelector("#vidas ul li:nth-child(" + datos.vidas / 2 + ")").innerHTML = " ";
                } else {
                    //  document.querySelector("#vidas ul li:nth-child(" + Math.trunc(datos.vidas / 2) + 1 + ")").src = "vista\img\interfaz\vidas-empty.png";
                    document.getElementById("vida" + (Math.trunc(datos.vidas / 2) + 1)).src = "vista/img/interfaz/vidas-empty.png";
                }
                datos.vidas--;
                if (datos.vidas == 0) {
                    datos.reset = true;
                }

                setTimeout(function () {
                    datos.salto = false;
                }, 360);
            }
            //innecesario las trampas no colisionan por debajo
            if (cT && (datos.jugador_y - datos.gravedad) > datos.posTrampas[i].y + datos.posTrampas[i].alto) {

            }

            // mover la camara se queda muy violento, solo se restan puntos de vida
            if (datos.desplazamientoEscenario <= datos.limiteEscenario) {

                // final
                if (cT && (datos.jugador_x + datos.jugador_ancho) < datos.posTrampas[i].x + datos.movimientoJugador) {
                    datos.movimientoJugador = 0;
                    datos.jugador_x = datos.posTrampas[i].x - datos.jugador_ancho;
                }
                if (cT && (datos.jugador_x - datos.movimientoJugador) > datos.posTrampas[i].x + datos.posTrampas[i].ancho) {
                    datos.movimientoJugador = 0;
                    datos.jugador_x = datos.posTrampas[i].x + datos.posTrampas[i].ancho;
                }
            } else {
                // resto juego
                if (cT && (datos.jugador_x + datos.jugador_ancho) < datos.posTrampas[i].x - datos.movimiento) {
                    datos.movimiento = 0;
                    datos.jugador_x = datos.posTrampas[i].x - datos.jugador_ancho;
                }
                if (cT && (datos.jugador_x + datos.movimiento) > datos.posTrampas[i].x + datos.posTrampas[i].ancho) {
                    datos.movimiento = 0;
                    datos.jugador_x = datos.posTrampas[i].x + datos.posTrampas[i].ancho;
                }
            }


        }

        /*==============================   
            CICLO DE MAILS
        ==============================*/

        if (datos.cicloMails >= 5000) {
            datos.cicloMails = 0;
        } else {
            datos.cicloMails += 20;
        }

        for (var i = 0; i <= datos.cicloMails; i += 1000) {
            if (datos.cicloMails >= i) {
                datos.cambioMails = true;
                datos.movMails = datos.velMails;
            }
            if (datos.cicloMails >= i + 900) {
                datos.cambioMails = false;

                datos.movMails = 0;
            }
        }

        if (datos.cambioMails) {
            for (var i = 0; i < datos.posMails.length; i++) {
                datos.posMails[i].x -= datos.movMails;
            }
        } else {
            for (var i = 0; i < datos.posMails.length; i++) {
                datos.posMails[i].x = datos.posMailbox[i].x;
            }
        }

        /*==============================
            COLISION CON MAIL
        ==============================*/
        for (var i = 0; i < datos.posMails.length; i++) {

            function colisionMail() {
                // no colision arriba
                if ((datos.jugador_y + datos.jugador_alto) < datos.posMails[i].y) {
                    return false;
                }
                // no colision abajo
                if ((datos.jugador_y) > (datos.posMails[i].y + datos.posMails[i].alto)) {
                    return false;
                }
                // no colision izquierda
                if ((datos.jugador_x + datos.jugador_ancho) < datos.posMails[i].x) {
                    return false;
                }
                // no colision derecha
                if ((datos.jugador_x) > (datos.posMails[i].x + datos.posMails[i].ancho)) {
                    return false;
                }
                return true;
            }

            if (colisionMail()) { //hacer que el sprite del muñeco parpadee
                datos.posMails[i].y += -500;

                if (datos.vidas < 0) {
                    if (datos.vidas % 2 == 0) {
                        document.getElementById("vida" + datos.vidas / 2).src = "vista/img/interfaz/vidas-rotas.png";
                        //  document.querySelector("#vidas ul li:nth-child(" + datos.vidas / 2 + ")").innerHTML = " ";
                    } else {
                        //  document.querySelector("#vidas ul li:nth-child(" + Math.trunc(datos.vidas / 2) + 1 + ")").src = "vista\img\interfaz\vidas-empty.png";
                        document.getElementById("vida" + (Math.trunc(datos.vidas / 2) + 1)).src = "vista/img/interfaz/vidas-empty.png";
                    }
                }
                datos.vidas--;

                if (datos.vidas == 0) {
                    datos.reset = true;
                }
                m = i;
                setTimeout(function () {
                    datos.posMails[m].y += 500;
                    datos.posMails[m].x = -500;
                }, 500)

            }
        }

        /*==============================
            DISPAROS DEL JUGADOR
        ==============================*/
        if (datos.disparo) {
            datos.movDisparoJugador = 0;
            datos.disparo_y = datos.jugador_y + 7;

            if (datos.izquierda) {
                datos.disparoIzq = true;
                datos.disparoDer = false;
            }
            if (datos.derecha) {
                datos.disparoDer = true;
                datos.disparoIzq = false;

            }
        }
        if (datos.disparoIzq) {
            datos.disparo_x = datos.jugador_x + datos.movDisparoJugador;
            datos.movDisparoJugador -= datos.velocidadDisparoJugador

        }
        if (datos.disparoDer) {
            datos.disparo_x = datos.jugador_x + datos.movDisparoJugador;
            datos.movDisparoJugador += datos.velocidadDisparoJugador

        }

        /*==============================
            COLISION BALA CON MAIL 
        ==============================*/
        for (var i = 0; i < datos.posMails.length; i++) {

            function colisionDisparoMail() {
                // no colision arriba
                if ((datos.disparo_y + datos.disparo_alto) < datos.posMails[i].y) {
                    return false;
                }
                // no colision abajo
                if ((datos.disparo_y) > (datos.posMails[i].y + datos.posMails[i].alto)) {
                    return false;
                }
                // no colision izquierda
                if ((datos.disparo_x + datos.disparo_ancho) < datos.posMails[i].x) {
                    return false;
                }
                // no colision derecha
                if ((datos.disparo_x) > (datos.posMails[i].x + datos.posMails[i].ancho)) {
                    return false;
                }
                return true;
            }

            if (colisionDisparoMail()) { //hacer que el sprite del muñeco parpadee
                datos.disparo_y += -500;
                datos.posMails[i].y += -500;
                m = i;

                setTimeout(function () {
                    datos.posMails[m].y += 500;
                    datos.posMails[m].x = -500;
                }, 500)

            }
        }
        /*==============================
            COLISION BALA CON PLATAFORMAS 
        ==============================*/
        for (var i = 0; i < datos.plataforma.length; i++) {

            function colisionDisparoPlataforma() {
                // no colision arriba
                if ((datos.disparo_y + datos.disparo_alto) < datos.plataforma[i].y) {
                    return false;
                }
                // no colision abajo
                if ((datos.disparo_y) > (datos.plataforma[i].y + datos.plataforma[i].alto)) {
                    return false;
                }
                // no colision izquierda
                if ((datos.disparo_x + datos.disparo_ancho) < datos.plataforma[i].x) {
                    return false;
                }
                // no colision derecha
                if ((datos.disparo_x) > (datos.plataforma[i].x + datos.plataforma[i].ancho)) {
                    return false;
                }
                return true;
            }
            cP = colisionDisparoPlataforma();

            if (cP) {
                datos.disparo_y = -500;
            }

        }

        /*==============================
        CAIDA DEL JUGADOR POR FUERA DEL ESCENARIO
        ==============================*/
        if (datos.jugador_y > 600) {
            datos.reset = true;
        }

        /*==============================
            RESETEAR EL NIVEL
        ==============================*/
        if (datos.reset) {

            datos.reset = false;
            datos.gravedad = 1;
            datos.desplazamientoEscenario = 0;
            datos.movimiento = 0;
            datos.jugador_x = 70;
            datos.jugador_y = 365;

            /*==============================
                RESET CONTADOR MONEDAS
            ==============================*/
            datos.contadorMonedas = 0;
            document.querySelector("#monedas span").innerHTML = datos.contadorMonedas;

            /*==============================
                RESET CONTADOR VIDAS
            ==============================*/
            datos.vidas = 6;


            /*==============================
                RESET VIDAS
            ==============================*/
            for (i = 1; i < 4; i++) {
                document.getElementById("vida" + i).src = "vista/img/interfaz/vidas.png";

            }



            /*==============================
                RESET DE LA PLATAFORMA
            ==============================*/

            var xhr_plataforma = new XMLHttpRequest();
            xhr_plataforma.open("GET", "vista/js/json/lvl" + datos.nivel + "/lvl" + datos.nivel + "_plataforma.json", true);


            xhr_plataforma.send();

            xhr_plataforma.onreadystatechange = function () {
                if (xhr_plataforma.readyState == 4 && xhr_plataforma.status == 200) {
                    datos.plataforma = JSON.parse(xhr_plataforma.responseText);
                }
            }

            /*==============================
                RESET MONEDAS
            ==============================*/
            var xhr_monedas = new XMLHttpRequest();
            xhr_monedas.open("GET", "vista/js/json/lvl" + datos.nivel + "/lvl" + datos.nivel + "_monedas.json", true);

            xhr_monedas.send();

            xhr_monedas.onreadystatechange = function () {
                if (xhr_monedas.readyState == 4 && xhr_monedas.status == 200) {
                    datos.posMonedas = JSON.parse(xhr_monedas.responseText);

                    for (var i = 0; i < datos.posMonedas.length; i++) {

                        datos.imgMonedas[i] = new Image();
                        datos.imgMonedas[i].src = "vista/img/objetos/moneda.png";
                    }
                }
            }

            /*==============================
                RESET TRAMPAS
            ==============================*/

            datos.trampas = new Image();
            datos.trampas.src = "vista/img/nivel" + datos.nivel + "/plano1.png";

            var xhr_trampas = new XMLHttpRequest();
            xhr_trampas.open("GET", "vista/js/json/lvl" + datos.nivel + "/lvl" + datos.nivel + "_trampas.json", true);


            xhr_trampas.send();

            xhr_trampas.onreadystatechange = function () {
                if (xhr_trampas.readyState == 4 && xhr_trampas.status == 200) {
                    datos.posTrampas = JSON.parse(xhr_trampas.responseText);
                }
            }


            /*==============================
                RESET MAILBOXES & MAILS
            ==============================*/

            datos.imgMail = new Image();
            datos.imgMail.src = "vista/img/objetos/mail.png";

            var xhr_mailboxes = new XMLHttpRequest();
            xhr_mailboxes.open("GET", "vista/js/json/lvl" + datos.nivel + "/lvl" + datos.nivel + "_mailboxes.json", true);


            xhr_mailboxes.send();

            xhr_mailboxes.onreadystatechange = function () {
                if (xhr_mailboxes.readyState == 4 && xhr_mailboxes.status == 200) {
                    datos.posMailbox = JSON.parse(xhr_mailboxes.responseText);
                    datos.posMails = JSON.parse(xhr_mailboxes.responseText);

                }
            }
        }


        /*==============================
            EJECUTANDO LINEA DE TIEMPO
        ==============================*/
        animacion = frame(juego.tiempo);

        /*==============================
            FINAL DEL NIVEL
        ==============================*/
        if (datos.jugador_x >= 1000) {

            cancelAnimationFrame(animacion);

            document.querySelector("#final").style.display = "block";

            document.querySelector("#finalMonedas span").innerHTML = datos.contadorMonedas;
            document.querySelector("#finalVidas span").innerHTML = 17 * datos.vidas;

            datos.puntuacion = datos.contadorMonedas + (17 * datos.vidas);

            if (datos.vidas <= 2) {

                document.getElementById("vida1f").src = "vista/img/interfaz/vidas.png";
            } else {
                document.getElementById("vida1f").src = "vista/img/interfaz/vidas-rotas.png";
            }


            if (datos.vidas <= 4) {

                document.getElementById("vida2f").src = "vista/img/interfaz/vidas.png";
            } else if (datos.vidas == 3) {
                document.getElementById("vida2f").src = "vista/img/interfaz/vidas-rotas.png";
            } else {
                document.getElementById("vida2f").src = "vista/img/interfaz/vidas-empty.png";

            }
            if (datos.vidas == 6) {

                document.getElementById("vida3f").src = "vista/img/interfaz/vidas.png";
            } else if (datos.vidas == 5) {
                document.getElementById("vida3f").src = "vista/img/interfaz/vidas-rotas.png";
            } else {
                document.getElementById("vida3f").src = "vista/img/interfaz/vidas-empty.png";

            }

            datos.incrementoPuntuacion = 0;
            var intervalo = setInterval(() => {
                if (datos.incrementoPuntuacion > Math.trunc(datos.puntuacion)) {
                    datos.incrementoPuntuacion = datos.puntuacion;
                    document.querySelector("#puntuacionFinal").innerHTML = datos.puntuacion;
                    clearInterval(intervalo);
                    setTimeout(() => {
                        var xhr = new XMLHttpRequest();
                        var nivel = true;
                        var puntuacion = datos.puntuacion;
                        var numero_nivel = datos.nivel;
                        var id = datos.id;
                        var url = "vista/ajax/usuarios.php";
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhr.send("nivel=" + nivel + "& puntuacion=" + puntuacion + "& numero_nivel=" + numero_nivel + "& id=" + id);

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                //  if (xhr.responseText == "true") {
                                window.location = "inicio";
                                //}
                            }
                        }
                    }, 5000);
                } else {
                    datos.incrementoPuntuacion++;
                    document.querySelector("#puntuacionFinal").innerHTML = datos.incrementoPuntuacion;
                }
            }, 16);


        }
    }
}