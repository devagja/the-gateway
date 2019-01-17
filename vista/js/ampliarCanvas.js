var contenedor = document.querySelector("#contenedor");
var ampliarLienzo = document.querySelector("#lienzo");
var btnAmpliar = document.querySelector("#btnAmpliar");
var ampliarTablero = document.querySelector("#tablero");

function ampliar() {

    contenedor.style.width = "100%";
    contenedor.style.height = "100vh";
    contenedor.style.margin = "0";

    ampliarTablero.style.width = "100%";

    ampliarLienzo.style.width = "100%";
    ampliarLienzo.style.height = "100vh";

    btnAmpliar.innerHTML = "REDUCIR JUEGO";
    btnAmpliar.style.position = "fixed";
    btnAmpliar.style.zIndex = "1";
    btnAmpliar.style.top = "60px";
    btnAmpliar.style.left = "10px";

    if (screenfull.enabled) {
        screenfull.request(document.querySelector("#contenedor"));

    }
    btnAmpliar.setAttribute("onclick", "reducir()");
}

function reducir() {

    contenedor.style.width = "1067px";
    contenedor.style.height = "600px";
    contenedor.style.margin = "5vh auto";


    ampliarLienzo.style.width = "1067px";
    ampliarLienzo.style.height = "600px";

    btnAmpliar.innerHTML = "AMPLIAR JUEGO";
    btnAmpliar.style.position = "relative";
    btnAmpliar.style.zIndex = "0";
    btnAmpliar.style.top = "0";
    btnAmpliar.style.left = "0";

    if (screenfull.enabled) {
        screenfull.exit();

    }
    btnAmpliar.setAttribute("onclick", "ampliar()");
}