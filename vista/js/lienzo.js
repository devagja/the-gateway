/*==============================
    SOLTAR TECLADO
==============================*/
var lienzo = {

    canvas: function () {
        /*==============================
            LIMPIA EL CANVAS
        ==============================*/
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /*==============================
            PINTA EL CANVAS
        ==============================*/
        escalado = 1.8;
        escaladoo = escalado + 1;

        /*==============================
        MAILS
        ==============================*/


        ctx.drawImage(datos.plano3, datos.desplazamientoEscenario / 1.5, 0, datos.plano3.naturalWidth, datos.plano3.naturalHeight );

        for (var i = 0; i < datos.posMails.length; i++) {
            ctx.drawImage(datos.imgMail,datos.posMails[i].x, datos.posMails[i].y, 32,20);
        }

        ctx.drawImage(datos.plano2, datos.desplazamientoEscenario, 0, datos.plano2.naturalWidth, datos.plano2.naturalHeight);


        for (var i = 0; i < datos.plataforma.length; i++) {
            ctx.fillStyle = "rgba(225,0,0,0.5)";
            ctx.fillRect(datos.plataforma[i].x, datos.plataforma[i].y, datos.plataforma[i].ancho, datos.plataforma[i].alto);
        }

        for (var i = 0; i < datos.posTrampas.length; i++) {
            ctx.fillStyle = "rgba(225,0,255,0.5)";
            ctx.fillRect(datos.posTrampas[i].x, datos.posTrampas[i].y, datos.posTrampas[i].ancho, datos.posTrampas[i].alto);
        }

        ctx.fillStyle = "rgba(225,255,0,0.5)";
        ctx.fillRect(datos.jugador_x, datos.jugador_y, datos.jugador_ancho, datos.jugador_alto);


        /*==============================
        TRAMPAS
        ==============================*/
        ctx.drawImage(datos.trampas, datos.desplazamientoEscenario, 0, datos.trampas.naturalWidth, datos.trampas.naturalHeight);
        /*
        for (var i = 0; i < datos.posTrampas.length; i++) {
            ctx.drawImage(datos.imgTrampas, datos.sprite_x, 0, 100, 100, datos.posTrampas[i].x, datos.posTrampas[i].y, datos.posTrampas[i].ancho, datos.posTrampas[i].alto);
        }*/

        /*==============================
        MONEDAS
        ==============================*/
        for (var i = 0; i < datos.posMonedas.length; i++) { // arreglo sucio
            if (datos.sprite_x == 0) {
                ctx.drawImage(datos.imgMonedas[i], datos.sprite_x, 0, 42, 42, datos.posMonedas[i].x, datos.posMonedas[i].y, datos.posMonedas[i].ancho, datos.posMonedas[i].alto);

            } else if (datos.sprite_x == 90) {
                ctx.drawImage(datos.imgMonedas[i], datos.sprite_x - 35, 0, 42, 42, datos.posMonedas[i].x, datos.posMonedas[i].y, datos.posMonedas[i].ancho, datos.posMonedas[i].alto);

            } else if (datos.sprite_x == 180) {
                ctx.drawImage(datos.imgMonedas[i], datos.sprite_x - 70, 0, 42, 42, datos.posMonedas[i].x, datos.posMonedas[i].y, datos.posMonedas[i].ancho, datos.posMonedas[i].alto);

            }
        }

        /*==============================
        DISPARO_JUGADOR
        ==============================*/
        if (datos.disparoDer || datos.disparoIzq) {

            ctx.drawImage(datos.imgDisparo, datos.disparo_x, datos.disparo_y, datos.disparo_ancho, datos.disparo_alto);
        }
        /*==============================
        JUGADOR
        ==============================*/
        ctx.drawImage(datos.imgJugador, datos.sprite_x, 0, 85, 109, datos.jugador_x - ((datos.imgJugador.naturalWidth / escaladoo) / 5), datos.jugador_y, datos.imgJugador.naturalWidth / (escaladoo + 1), datos.imgJugador.naturalHeight / escaladoo);


    }
}