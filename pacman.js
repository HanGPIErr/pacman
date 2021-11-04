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

let copygrille=JSON.parse(JSON.stringify(grille))

document.body.addEventListener("keypress",changeDirection)
document.getElementById("rejouer").addEventListener("click", rejouer)
let pacman={
    x:5,
    y:2,
    direction:0
}

// TABLEAU //

let tableaufantome1=[{
    x:10,
    y:11,
    direction:0
}, {
    x:10,
    y:11,
    direction:0
}, {
    x:10,
    y:11,
    direction:0
}, {
    x:10,
    y:11,
    direction:0
}]

let copyfantome=JSON.parse(JSON.stringify(tableaufantome1))

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

// TOUR DE JEU //

function tourDeJeu(){
    afficheGrille();
    bougepacman();
    collision();
    sorties();
    mangerbonbon();
    affichePacman();
    afficherscore();
    gagner();
    for(i=0;i<tableaufantome1.length;i++){
        sortiesfantome1(i);
        perdu(i);
        bougefantome1(i);
        fantomecollision(i);
        affichefantome1(i);
        perdu(i);    
    }

}

// PACMAN //

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
        }else if (pacman.direction ==3){
             pacman.y = pacman.y+1
        }
    }
}
function sorties() {
    if (pacman.x < 1) {
        pacman.x = 19 
    }if (pacman.x > 19) {
        pacman.x = 1
    }
}
function mangerbonbon() {
    if (grille[pacman.y-1][pacman.x-1]==2) {
        console.log("miam")
        grille[pacman.y-1][pacman.x-1]=1
        score+=10 //score=score+10
    }
}

// ALERT INFO GAME //

function afficherscore() {
    document.getElementById("score").innerHTML="score:"+score

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
        prompt("vous avez gagne")
        clearInterval(numInterval) 
    }
}
function perdu(num) {
    if (tableaufantome1[num].x==pacman.x && tableaufantome1[num].y == pacman.y) {
        prompt("vous avez perdu")
        clearInterval(numInterval)
    }
}
function rejouer() {
    clearInterval(numInterval)
    grille=JSON.parse(JSON.stringify(copygrille))
    pacman.x=5
    pacman.y=2
    pacman.direction=0
    tableaufantome1=JSON.parse(JSON.stringify(copyfantome))
    numInterval=setInterval(tourDeJeu,300)
    score=0
}


// FANTOME BLEU//

function affichefantome1(num) {
    let elem=document.createElement("div");
    document.getElementById("grille").appendChild(elem);
    elem.className="fantome"+(num%4);
    elem.style.gridColumnStart=tableaufantome1[num].x
    elem.style.gridRowStart=tableaufantome1[num].y
}
function getRandomInt(max) {
    return Math.floor(Math.random()*max)
}
function bougefantome1(num) {
    tableaufantome1[num].direction = getRandomInt(4);
    if (tableaufantome1[num].direction == 0){
        tableaufantome1[num].x = tableaufantome1[num].x+1
    }else if (tableaufantome1[num].direction == 1){
        tableaufantome1[num].x = tableaufantome1[num].x-1
    }else if (tableaufantome1[num].direction == 2){
        tableaufantome1[num].y = tableaufantome1[num].y+1
    }else if (tableaufantome1[num].direction == 3){
        tableaufantome1[num].y = tableaufantome1[num].y-1
    }
}
function fantomecollision(num) {
    if (grille[tableaufantome1[num].y-1][tableaufantome1[num].x-1]==0) {
        if (tableaufantome1[num].direction == 0){
            tableaufantome1[num].x = tableaufantome1[num].x-1
        }else if (tableaufantome1[num].direction == 1){
            tableaufantome1[num].x = tableaufantome1[num].x+1
        }else if (tableaufantome1[num].direction == 2){
            tableaufantome1[num].y = tableaufantome1[num].y-1
        }else if (tableaufantome1[num].direction ==3){
            tableaufantome1[num].y = tableaufantome1[num].y+1
        }
    }
}
function sortiesfantome1(num) {
    if (tableaufantome1[num].x < 1) {
        tableaufantome1[num].x = 19 
    }if (tableaufantome1[num].x > 19) {
        tableaufantome1[num].x = 1
    }
}
