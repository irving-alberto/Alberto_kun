const tablero = document.getElementById("tablero");
const fichas = document.getElementById("fichas");
const resultado = document.getElementById("resultado");
const botonVerificar = document.getElementById("verificar");

const letrasDisponibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const diccionario = ["GATO", "CASA", "PERRO", "LUNA", "SOL", "RISA", "MESA", "SAL", "MAR", "RAYO"];

function crearTablero() {
  tablero.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");
    casilla.setAttribute("data-index", i);
    casilla.addEventListener("dragover", e => e.preventDefault());
    casilla.addEventListener("drop", colocarFicha);
    tablero.appendChild(casilla);
  }
}

function generarFichas(n = 7) {
  fichas.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const letra = letrasDisponibles[Math.floor(Math.random() * letrasDisponibles.length)];
    const div = document.createElement("div");
    div.className = "ficha";
    div.textContent = letra;
    div.setAttribute("draggable", true);
    div.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", letra);
      e.dataTransfer.setData("source", e.target.id);
    });
    fichas.appendChild(div);
  }
}

function colocarFicha(e) {
  const letra = e.dataTransfer.getData("text");
  if (e.target.textContent === "") {
    e.target.textContent = letra;
  }
}

botonVerificar.addEventListener("click", () => {
  const letrasEnTablero = Array.from(document.querySelectorAll(".casilla"))
    .map(c => c.textContent)
    .filter(c => c !== "")
    .join("");

  if (diccionario.includes(letrasEnTablero)) {
    resultado.textContent = "✅es una palabra válida!;"
    resultado.style.color = "green";
  } else {
    resultado.textContent = "❌no está en el diccionario.;"
    resultado.style.color = "red";
  }
});

crearTablero();
generarFichas();
