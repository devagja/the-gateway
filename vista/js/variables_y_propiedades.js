/*==============================
    VARIABLES DE LA LINEA DEL TIEMPO
==============================*/
var frame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
var animacion;

/*==============================
    VARIABLES DEL CANVAS
==============================*/
var canvas;
var ctx;

/*==============================
    PROPIEDADES DEL OBJETO DATOS
==============================*/
var datos = {
    id: 0,
    nivel: null,
    plano3: null,
    plano2: null,
    imgJugador: null,
    jugador_x: 70,
    jugador_y: 365,
    jugador_alto:40,
    jugador_ancho: 24,

    // mover mapa teclado
    izquierda: false,
    derecha: false,
    movimiento: 0,
    desplazamientoEscenario: 0,
    velocidad: 5,
    limiteEscenario: -2135,
    movimientoJugador: 0,

    plataforma: [],
    gravedad:1,
    limiteGravedad:20,
    peso: 0.5,
    
    salto: false,
    alturaSalto:-10,

    sprite_x:0,
    ciclo_sprite:0,
    reset:false,

    imgMonedas:[],
    posMonedas:[],

    trampas:null,
    posTrampas:[],

    movEnemigos:0,
    cambioSentidoEnemigos:false,

    imgMailbox:null,// no se usa
    posMailbox:[],

    imgMail:null,
    posMails:[],
    movMails:0,
    velMails:5,

    
    cicloMails:0,
    cambioMails:false,

    disparo: false,
    imgDisparo:null,
    disparo_x:0,
    disparo_y:0,
    disparo_ancho:15,
    disparo_alto:9,

    validarDisparo: false,
    disparoDer: false,
    disparoIzq:false,
    movDisparoJugador: 0,
    velocidadDisparoJugador: 20,

    contadorMonedas:0,
    vidas:6,
    puntuacion: 0,
    incrementoPuntuacion:0 
} 