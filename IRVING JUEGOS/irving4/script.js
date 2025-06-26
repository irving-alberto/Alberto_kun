const canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");
const wordDisplay = document.getElementById("word");
const lettersContainer = document.getElementById("letters");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");

const palabras = [
  "gato", "perro", "ratón", "sol", "luz", "estrella", "nube", "árbol", "flor", "río",
  "mar", "tierra", "fuego", "aire", "cielo", "lluvia", "nieve", "trueno", "viento", "montaña",
  "valle", "bosque", "desierto", "playa", "lago", "ciudad", "pueblo", "casa", "escuela", "puente",
  "carro", "tren", "avión", "barco", "bicicleta", "camino", "sendero", "reloj", "ventana", "puerta",
  "silla", "mesa", "libro", "lapiz", "papel", "computadora", "teclado", "pantalla", "ratón", "teléfono"
].map(p => p.toUpperCase());

let palabra;
let letrasCorrectas = [];
let letrasIncorrectas = [];

function iniciarJuego() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)];
  letrasCorrectas = [];
  letrasIncorrectas = [];
  message.textContent = "";
  actualizarPalabra();
  crearBotones();
  dibujarAhorcado();
}

function actualizarPalabra() {
  wordDisplay.textContent = palabra
    .split("")
    .map(letra => (letrasCorrectas.includes(letra) ? letra : "_"))
    .join(" ");
}

function crearBotones() {
  lettersContainer.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.addEventListener("click", () => manejarLetra(letra, btn));
    lettersContainer.appendChild(btn);
  }
}

function manejarLetra(letra, boton) {
  boton.disabled = true;

  if (palabra.includes(letra)) {
    letrasCorrectas.push(letra);
  } else {
    letrasIncorrectas.push(letra);
  }

  actualizarPalabra();
  dibujarAhorcado();
  revisarEstado();
}

function revisarEstado() {
  const palabraMostrada = palabra
    .split("")
    .every(letra => letrasCorrectas.includes(letra));

  if (palabraMostrada) {
    message.textContent = "¡Ganaste!";
    deshabilitarBotones();
  }

  if (letrasIncorrectas.length >= 6) {
    message.textContent = 'Perdiste. La palabra era : {palabra}'
    deshabilitarBotones();
  }
}

function deshabilitarBotones() {
  const botones = document.querySelectorAll("#letters button");
  botones.forEach(b => b.disabled = true);
}

function dibujarAhorcado() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // base
  ctx.beginPath();
  ctx.moveTo(10, 240);
  ctx.lineTo(190, 240);
  ctx.stroke();

  // poste
  ctx.moveTo(50, 240);
  ctx.lineTo(50, 20);
  ctx.lineTo(150, 20);
  ctx.lineTo(150, 40);
  ctx.stroke();

  if (letrasIncorrectas.length > 0) {
    // cabeza
    ctx.beginPath();
    ctx.arc(150, 60, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (letrasIncorrectas.length > 1) {
    // cuerpo
    ctx.beginPath();
    ctx.moveTo(150, 80);
    ctx.lineTo(150, 140);
    ctx.stroke();
  }
  if (letrasIncorrectas.length > 2) {
    // brazo izquierdo
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(120, 120);
    ctx.stroke();
  }
  if (letrasIncorrectas.length > 3) {
    // brazo derecho
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(180, 120);
    ctx.stroke();
  }
  if (letrasIncorrectas.length > 4) {
    // pierna izquierda
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(120, 180);
    ctx.stroke();
  }
  if (letrasIncorrectas.length > 5) {
    // pierna derecha
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(180, 180);
    ctx.stroke();
  }
}

resetBtn.addEventListener("click", iniciarJuego);

// Iniciar el juego al cargar
iniciarJuego();