/*==============================
    METODOS DEL OBJETO INICIO
==============================*/

var inicio = {

    /*==============================
        METODO DE INGRESO A LA APLICACION
    ==============================*/
    iniciar: function () {
        var identificador = "2222222";
        var primer_nombre = "julio";
        var foto = "vista/img/intro/julio.png";

        // AJAX
        var xhr = new XMLHttpRequest();
        var url = "vista/ajax/usuarios.php"; // ARCHIVO DESTINO
        // xhr.open(FORMA ENVIO, DIRECCION, ASINCRONO) 
        xhr.open("POST", url, true);
        // LA FORMA QUE VAMOS A ENVIAR LAS VARIABLES POST ES COMO UN FORM DE HTML
        // xhr.setRequestHeader(NOMBRE, VALOR);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("identificador=" + identificador + "& primer_nombre=" + primer_nombre + "& foto=" + foto);


        // PHP DEVUELVE UNA RESPUESTA, SI ESTÁ LISTO, INVOCAMOS UNA FUNCION
        xhr.onreadystatechange = function () {

            // SI ESTA LISTO ES 4, SI EL ESTADO ES 200 ES CORRECTO
            if ((xhr.readyState == 4) && (xhr.status == 200)) {

                window.location = "index.php?validar=inicio";
            }
        }
    },

    /*==============================
        METODO DE SELECCION DE NIVEL
    ==============================*/
    elegirNivel: function (e) {

        datos.nivel = e.getAttribute("nivel");
        datos.id = e.getAttribute("id");

        inicio.inicioNiveles(datos.nivel);
    },

    /*==============================
        INIT DEL NIVEL SELECCIONADO 
    ==============================*/
    inicioNiveles: function (nivel) {

        document.querySelector("#inicio").parentNode.removeChild(document.querySelector("#inicio"));

        canvas = document.querySelector("#lienzo");
        ctx = canvas.getContext("2d");


        document.querySelector("#carga").style.display = "block";

        /*==============================
            PLANO 3
        ==============================*/
        datos.plano3 = new Image();
        datos.plano3.src = "vista/img/nivel" + nivel + "/plano3.png";

        /*==============================
            PLANO 2
        ==============================*/
        datos.plano2 = new Image();
        datos.plano2.src = "vista/img/nivel" + nivel + "/plano2.png";

        /*==============================
            PLATAFORMAS
        ==============================*/

        var xhr_plataforma = new XMLHttpRequest();
        xhr_plataforma.open("GET", "vista/js/json/lvl"+nivel+"/lvl" + nivel + "_plataforma.json", true);


        xhr_plataforma.send();

        xhr_plataforma.onreadystatechange = function () {
            if (xhr_plataforma.readyState == 4 && xhr_plataforma.status == 200) {
                datos.plataforma = JSON.parse(xhr_plataforma.responseText);
            }
        }

        /*==============================
            MONEDAS
        ==============================*/

        var xhr_monedas = new XMLHttpRequest();
        xhr_monedas.open("GET", "vista/js/json/lvl"+nivel+"/lvl" + nivel + "_monedas.json", true);


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
            TRAMPAS
        ==============================*/
        datos.trampas = new Image();
        datos.trampas.src = "vista/img/nivel" + nivel + "/plano1.png";

        var xhr_trampas = new XMLHttpRequest();
        xhr_trampas.open("GET", "vista/js/json/lvl"+nivel+"/lvl" + nivel + "_trampas.json", true);


        xhr_trampas.send();

        xhr_trampas.onreadystatechange = function () {
            if (xhr_trampas.readyState == 4 && xhr_trampas.status == 200) {
                datos.posTrampas = JSON.parse(xhr_trampas.responseText);

            }
        }

        /*==============================
             MAILS
        ==============================*/

        datos.imgMail = new Image();
        datos.imgMail.src = "vista/img/objetos/mail.png";

        var xhr_mailboxes = new XMLHttpRequest();
        xhr_mailboxes.open("GET", "vista/js/json/lvl"+nivel+"/lvl" + nivel + "_mailboxes.json", true);


        xhr_mailboxes.send();

        xhr_mailboxes.onreadystatechange = function () {
            if (xhr_mailboxes.readyState == 4 && xhr_mailboxes.status == 200) {
                datos.posMailbox = JSON.parse(xhr_mailboxes.responseText);
                datos.posMails = JSON.parse(xhr_mailboxes.responseText);

            }
        }

        /*==============================
            JUGADOR
        ==============================*/
        datos.imgJugador = new Image();
        datos.imgJugador.src = "vista/img/jugador/iddle.png";

        /*==============================
            DISPARO JUGADOR
        ==============================*/
        datos.imgDisparo = new Image();
        datos.imgDisparo.src = "vista/img/objetos/bala.png";

        /*==============================
            PRELOAD
        ==============================*/
        ////////////////////meterimagenesenelcargador////////////////
        var cargarArchivos = [datos.plano3, datos.plano2, datos.trampas,datos.imgDisparo,datos.imgMail];
        var numeroArchivos = 0;
        var porcentaje = 100 / cargarArchivos.length;

        for (var i = 0; i < cargarArchivos.length; i++) {

            cargarArchivos[i].addEventListener("load", precarga);
        }

        function precarga(e) {
            numeroArchivos++;

            document.querySelector("#carga span").innerHTML = porcentaje * numeroArchivos + "%";
            document.querySelector("#carga meter").value = porcentaje * numeroArchivos;

            if (numeroArchivos == cargarArchivos.length) {

                document.querySelector("#lienzo").style.display = "block";
                document.querySelector("#btnAmpliar").style.display = "block";

                document.querySelector("#tablero").style.display = "block";

                document.querySelector("#carga").style.opacity = 0;

                setTimeout(function () {

                    document.querySelector("#carga").style.display = "none";
                }, 10);

                juego.teclado();
                juego.tiempo();
            }
        }
    }
}