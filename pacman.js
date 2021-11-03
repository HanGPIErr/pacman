let grille=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
    [0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,2,0],
    [0,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0],
    [0,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,0],
    [0,1,1,0,2,0,2,2,2,2,2,2,2,0,2,0,1,1,0],
    [0,0,0,0,2,0,2,0,0,1,0,0,2,0,2,0,0,0,0],
    [2,2,2,2,2,2,2,0,1,1,1,0,2,2,2,2,2,2,2],
    [0,0,0,0,2,0,2,0,0,1,0,0,2,0,2,0,0,0,0],
    [0,1,1,0,2,0,2,2,2,2,2,2,2,0,2,0,1,1,0],
    [0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,2,0],
    [0,2,2,0,2,2,2,2,2,2,2,2,2,2,2,0,2,2,0],
    [0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0],
    [0,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,2,0],
    [0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]
document.body.addEventListener("keypress",changeDirection)
let pacman={
    x:5,
    y:2,
    direction:0
}
let fantomebleu={
    x:10,
    y:11,
    direction:0
}
let score = 0

function afficheGrille() {
    document.getElementById("grille").innerHTML=""
for(let i=0; i<22;i++){
for(let j=0; j<19;j++){
    let elem=document.createElement("div")
    elem.style.gridColumnStart=j+1
    elem.style.gridRowStart=i+1
    if(grille[i][j]==0){
    elem.className="mur"
    }else if(grille[i][j]==1){
        elem.className="sol"
    }else{
        elem.className="bonbon"
    }
    document.getElementById("grille").appendChild(elem);
}
    
}
}
let numInterval=setInterval(tourDeJeu,300)

function tourDeJeu(){
    afficheGrille();
    sorties();
    mangerbonbon();
    affichePacman();
    afficheFantomebleu();
    bougepacman();
    collision();
    afficherscore();
    gagner();
}
function affichePacman() {
    let elem=document.createElement("div");
    document.getElementById("grille").appendChild(elem);
    elem.className="pacman";
    elem.style.gridColumnStart=pacman.x
    elem.style.gridRowStart=pacman.y
}
function bougepacman() {
    if (pacman.direction == 0){
        pacman.x = pacman.x+1
    }else if (pacman.direction == 1){
        pacman.x = pacman.x-1
    }else if (pacman.direction == 2){
        pacman.y = pacman.y+1
    }else{ pacman.y = pacman.y-1
    }
}
function changeDirection(event) {
    console.log(event)
    if (event.keyCode === 122) {
        pacman.direction = 3
    }else if (event.keyCode === 115) {
        pacman.direction = 2
    }else if (event.keyCode === 100) {
        pacman.direction = 0
    }else if (event.keyCode === 113) {
        pacman.direction = 1
    }else(console.log("error"))
}
function collision() {
    if (grille[pacman.y-1][pacman.x-1]==0) {
        if (pacman.direction == 0){
            pacman.x = pacman.x-1
        }else if (pacman.direction == 1){
            pacman.x = pacman.x+1
        }else if (pacman.direction == 2){
            pacman.y = pacman.y-1
        }else{ pacman.y = pacman.y+1
        }
    }
}
function mangerbonbon() {
    if (grille[pacman.y-1][pacman.x-1]==2) {
        console.log("miam")
        grille[pacman.y-1][pacman.x-1]=1
        score+=10 //score=score+10
    }
}
function afficherscore() {
    document.getElementById("score").innerHTML="score:"+score

}
function sorties() {
    if (pacman.x < 1) {
        pacman.x = 19 
    }if (pacman.x > 19) {
        pacman.x = 1
    }
}
function gagner() {
    let gagner = true
    for(let i=0; i<22;i++){
    for(let j=0; j<19;j++){
    if(grille[i][j]==2){
    gagner = false
    }
}
    }
    if (gagner==true){
        alert("vous avez gagne")
        clearInterval(numInterval) 
    }
}
function afficheFantomebleu() {
    let elem=document.createElement("div");
    document.getElementById("grille").appendChild(elem);
    elem.className="fantomebleu";
    elem.style.gridColumnStart=fantomebleu.x
    elem.style.gridRowStart=fantomebleu.y
}