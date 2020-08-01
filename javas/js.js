var turno = "X";
var cantPlayer = 1;
var player = "X";
nuevo_juego();
function nuevo_juego() {
  let celda = document.querySelectorAll("p");
  for (let i = 0; i < celda.length; i++) {
    celda[i].innerText = "";
  }
  if (player != turno && cantPlayer == 1) {
    playBot(`${statusTable()}/${turno}`);
  }
}
function jugar(pos) {
  let celda = document.querySelectorAll("p");
  let estado;
  if (celda[pos].innerText != "") {
    alert("poscicion invalida");
  } else {
    if (turno === "X") {
      celda[pos].innerText = "X";
      estado = analizarVictoria(turno);
      turno = "O";
    } else {
      celda[pos].innerText = "O";
      estado = analizarVictoria(turno);
      turno = "X";
    }
    if (estado) nuevo_juego();
    if (cantPlayer == 1 && turno != player && !estado) {
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
  } else if (tableroLleno(tablero)) {
    alert("empate");
    gano = true;
  }
  return gano;
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

function jugadores() {
  var boton = document.querySelector("#players");
  if (cantPlayer == 1) {
    boton.innerText = "2 jugadores";
    cantPlayer = 2;
    nuevo_juego();
  } else {
    boton.innerText = "1 jugador";
    cantPlayer = 1;
    nuevo_juego();
  }
}
