function nuevo_juego(){
    var celda=document.querySelectorAll("p")
    for (let i = 0; i < celda.length; i++) {
        celda[i].innerText="";
        }
}
function jugar(pos){
    var celda=document.querySelectorAll("p");
    if(celda[pos].innerText!=""){
        alert("poscicion invalida");
    }else{
        if(turno==="X"){
            celda[pos].innerText="X"
            analizarVictoria(turno)
            turno="O"
        }else{
            celda[pos].innerText="O"
            analizarVictoria(turno)
            turno="X"
        }

    }
}
function analizarVictoria(turn){
    var tablero=document.querySelectorAll("p")
    var gano=false;
    if((tablero[0].innerText===tablero[1].innerText&& tablero[1].innerText===tablero[2].innerText && tablero[2].innerText===turn) ||
        (tablero[3].innerText===tablero[4].innerText&& tablero[4].innerText===tablero[5].innerText && tablero[5].innerText===turn) ||
        (tablero[6].innerText===tablero[7].innerText&& tablero[7].innerText===tablero[8].innerText && tablero[8].innerText===turn) ||
        (tablero[0].innerText===tablero[3].innerText&& tablero[3].innerText===tablero[6].innerText && tablero[6].innerText===turn) ||
        (tablero[1].innerText===tablero[4].innerText&& tablero[4].innerText===tablero[7].innerText && tablero[7].innerText===turn) ||
        (tablero[2].innerText===tablero[5].innerText&& tablero[5].innerText===tablero[8].innerText && tablero[8].innerText===turn) ||
        (tablero[0].innerText===tablero[4].innerText&& tablero[4].innerText===tablero[8].innerText && tablero[8].innerText===turn) ||
        (tablero[2].innerText===tablero[4].innerText&& tablero[4].innerText===tablero[6].innerText && tablero[6].innerText===turn))
    {
        gano=true
    }
    if(gano){
        alert("gano el jugador " + turn)
        nuevo_juego()
    }else if(tableroLleno(tablero)){
        alert("empate")
        nuevo_juego()
    }
}
function tableroLleno(tablero){
    var lleno= true
    for (let i = 0; i < tablero.length; i++) {
        if(tablero[i].innerText===""){
            lleno=false
        }
        
    }
    return lleno;
}
turno="x"
var contadorJugadas=0;
