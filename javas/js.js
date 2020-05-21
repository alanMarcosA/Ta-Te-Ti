var turno = "X";
var cantPlayer = prompt("jugadores(1 o 2)");
var player;
if (cantPlayer == 1) {
  player = prompt("juega con X o O");
}
if (player != turno) {
  playBot(`${statusTable()}/${turno}`);
}
function nuevo_juego() {
  let celda = document.querySelectorAll("p");
  for (let i = 0; i < celda.length; i++) {
    celda[i].innerText = "";
  }
}
function jugar(pos) {
  let celda = document.querySelectorAll("p");
  if (celda[pos].innerText != "") {
    alert("poscicion invalida");
  } else {
    if (turno === "X") {
      celda[pos].innerText = "X";
      analizarVictoria(turno);
      turno = "O";
    } else {
      celda[pos].innerText = "O";
      analizarVictoria(turno);
      turno = "X";
    }
    console.log(cantPlayer + " " + turno + player);
    if (cantPlayer == 1 && turno != player) {
      playBot(`${statusTable()}/${turno}`);
    }
  }
}
function analizarVictoria(turn) {
  let tablero = document.querySelectorAll("p");
  let gano = false;
  if (
    (tablero[0].innerText === tablero[1].innerText &&
      tablero[1].innerText === tablero[2].innerText &&
      tablero[2].innerText === turn) ||
    (tablero[3].innerText === tablero[4].innerText &&
      tablero[4].innerText === tablero[5].innerText &&
      tablero[5].innerText === turn) ||
    (tablero[6].innerText === tablero[7].innerText &&
      tablero[7].innerText === tablero[8].innerText &&
      tablero[8].innerText === turn) ||
    (tablero[0].innerText === tablero[3].innerText &&
      tablero[3].innerText === tablero[6].innerText &&
      tablero[6].innerText === turn) ||
    (tablero[1].innerText === tablero[4].innerText &&
      tablero[4].innerText === tablero[7].innerText &&
      tablero[7].innerText === turn) ||
    (tablero[2].innerText === tablero[5].innerText &&
      tablero[5].innerText === tablero[8].innerText &&
      tablero[8].innerText === turn) ||
    (tablero[0].innerText === tablero[4].innerText &&
      tablero[4].innerText === tablero[8].innerText &&
      tablero[8].innerText === turn) ||
    (tablero[2].innerText === tablero[4].innerText &&
      tablero[4].innerText === tablero[6].innerText &&
      tablero[6].innerText === turn)
  ) {
    gano = true;
  }
  if (gano) {
    alert(`gano el jugador ${turn}`);
    nuevo_juego();
  } else if (tableroLleno(tablero)) {
    alert("empate");
    nuevo_juego();
  }
}
function tableroLleno(tablero) {
  let lleno = true;
  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i].innerText === "") {
      lleno = false;
    }
  }
  return lleno;
}

async function playBot(jugada) {
  let respuesta = await fetch(
    `https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/${jugada}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "stujo-tic-tac-toe-stujo-v1.p.rapidapi.com",
        "x-rapidapi-key": "311e92868amshdcc60eef47807adp12e4c0jsnf933b52d72dc",
      },
    }
  );
  let res = await respuesta.json();
  console.log(res);
  jugar(res.recommendation);
}

function statusTable() {
  let celda = document.querySelectorAll("p");
  let tablero = "";
  for (let i = 0; i < celda.length; i++) {
    tablero += celda[i].innerText != "" ? celda[i].innerText : "-";
  }
  console.log(tablero);
  return tablero;
}
