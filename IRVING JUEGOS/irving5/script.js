const board = document.getElementById('chessboard');

const pieces = {
  white: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙"
  },
  black: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟"
  }
};

const layout = [
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  Array(8).fill("pawn"),
  ...Array(4).fill(Array(8).fill("")),
  Array(8).fill("pawn"),
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
];

function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "white" : "black");

      const pieceType = layout[row][col];
      let piece = "";

      if (row === 0 || row === 1) {
        piece = pieces.black[pieceType];
      }
      if (row === 6 || row === 7) {
        piece = pieces.white[pieceType];
      }

      if (piece) {
        const pieceEl = document.createElement("div");
        pieceEl.classList.add("piece");
        pieceEl.textContent = piece;
        pieceEl.setAttribute("draggable", true);

        pieceEl.addEventListener("dragstart", e => {
          e.dataTransfer.setData("text/plain", pieceEl.textContent);
          pieceEl.classList.add("dragging");
        });

        pieceEl.addEventListener("dragend", () => {
          pieceEl.classList.remove("dragging");
        });

        square.appendChild(pieceEl);
      }

      square.addEventListener("dragover", e => e.preventDefault());

      square.addEventListener("drop", e => {
        e.preventDefault();
        const draggingPiece = document.querySelector(".dragging");
        if (draggingPiece) {
          square.innerHTML = "";
          square.appendChild(draggingPiece);
        }
      });

      board.appendChild(square);
    }
  }
}

createBoard();
