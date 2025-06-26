const filas = 10;
const columnas = 10;
const minas = 10;

let tablero = [];
let tiempo = 0;
let intentos = 0;
let timer;
let juegoTerminado = false;
let minasRestantes = document.getElementById("minas-restantes");

const tableroDiv = document.getElementById("tablero");
const tiempoSpan = document.getElementById("tiempo");
const intentosSpan = document.getElementById("intentos");
const mensaje = document.getElementById("mensaje");
const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");


function crearTablero() {
  tablero = [];
  tableroDiv.innerHTML = "";
  juegoTerminado = false;
  mensaje.textContent = "";
  intentos = 0;
  tiempo = 0;
  tiempoSpan.textContent = tiempo;
  intentosSpan.textContent = intentos;

  clearInterval(timer);
  timer = setInterval(() => {
    tiempo++;
    tiempoSpan.textContent = tiempo;
  }, 1000);

  // Crear tablero vacío
  for (let i = 0; i < filas; i++) {
    tablero[i] = [];
    for (let j = 0; j < columnas; j++) {
      tablero[i][j] = {
        mina: false,
        revelada: false,
        celda: document.createElement("div"),
      };
      let celda = tablero[i][j].celda;
      celda.classList.add("celda");
      celda.dataset.x = i;
      celda.dataset.y = j;
      celda.addEventListener("click", () => revelarCelda(i, j));
      tableroDiv.appendChild(celda);
    }
  }

  // Colocar minas
  let colocadas = 0;
  while (colocadas < minas) {
    let x = Math.floor(Math.random() * filas);
    let y = Math.floor(Math.random() * columnas);
    if (!tablero[x][y].mina) {
      tablero[x][y].mina = true;
      colocadas++;
    }
  }
}

function contarMinasAlrededor(x, y) {
  let conteo = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      let nx = x + dx;
      let ny = y + dy;
      if (
        nx >= 0 &&
        nx < filas &&
        ny >= 0 &&
        ny < columnas &&
        tablero[nx][ny].mina
      ) {
        conteo++;
      }
    }
  }
  return conteo;
}

function revelarCelda(x, y) {
  if (juegoTerminado || tablero[x][y].revelada) return;

  clickSound.currentTime = 0;
  clickSound.play();

  tablero[x][y].revelada = true;
  intentos++;
  intentosSpan.textContent = intentos;

  const celda = tablero[x][y].celda;
  celda.classList.add("revelada");

  if (tablero[x][y].mina) {
    celda.textContent = "💣";
    celda.dataset.mina = "true";
    juegoTerminado = true;
    clearInterval(timer);
    mensaje.textContent = "💥 Perdiste";
    revelarTodasMinas();
    document.getElementById("audioLose").play();
    return;
  }

  let minasCerca = contarMinasAlrededor(x, y);
  if (minasCerca > 0) {
    celda.textContent = minasCerca;
  } else {
    // Revelar celdas adyacentes
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let nx = x + dx;
        let ny = y + dy;
        if (
          nx >= 0 &&
          nx < filas &&
          ny >= 0 &&
          ny < columnas &&
          !tablero[nx][ny].revelada
        ) {
          revelarCelda(nx, ny);
        }
      }
    }
  }

  verificarVictoria();
}

function revelarTodasMinas() {
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (tablero[i][j].mina && !tablero[i][j].revelada) {
        const celda = tablero[i][j].celda;
        celda.textContent = "💣";
        celda.classList.add("revelada");
        celda.dataset.mina = "true";
      }
    }
  }
}

function verificarVictoria() {
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (!tablero[i][j].mina && !tablero[i][j].revelada) {
        return;
      }
    }
  }



  
  juegoTerminado = true;
  clearInterval(timer);
  mensaje.style.color = "#2e7d32"; // verde
  mensaje.textContent = "🎉 ¡Ganaste!";
  winSound.currentTime = 0;
  winSound.play();
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 },
  });
}

crearTablero();

document.getElementById("reiniciar").addEventListener("click", crearTablero);
