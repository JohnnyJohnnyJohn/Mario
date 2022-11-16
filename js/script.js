// Init Mario

let mario = document.getElementById("perso");

mario.src = "img/mario.gif";

let xMario = window.innerWidth / 2;
let yMario = window.innerHeight / 2;

let xCenterMario = xMario + 75;
let yCenterMario = yMario + 75;

mario.style.width= "150px";

let marioFlip = false;
let marioBlink = false;

moveImgTo("perso", xMario, yMario)

// Init Piece

let coin = document.getElementById("piece");

coin.src = "img/coin.gif";

let xCoin = Math.floor(Math.random() * (window.innerWidth - 100));
let yCoin = Math.floor(Math.random() * (window.innerHeight - 100));

let xCenterCoin = xCoin + 30;
let yCenterCoin = yCoin + 30;

moveCoin();

coin.style.left= xCoin + "px";
coin.style.top= yCoin + "px";

// Init Goomba

const goomba = new Image(138, 120);
document.body.appendChild(goomba);

goomba.style.position = "absolute";
goomba.src = "img/goomba.gif";
goomba.id = "goomba";

let xGoomba = Math.floor(Math.random() * (window.innerWidth - 100));
let yGoomba = Math.floor(Math.random() * (window.innerHeight - 100));

let xCenterGoomba = xGoomba + 30;
let yCenterGoomba = yGoomba + 37;

goomba.style.left = xGoomba + "px";
goomba.style.top = yGoomba + "px";

let stopGoomba = 0;

//_______________________________________________________________


let tryAgrain = document.createElement("h1");
document.body.appendChild(tryAgrain);

tryAgrain.id = "try";
tryAgrain.innerText = "PRESS SPACE TO TRY AGAIN";
tryAgrain.style.color = "#fd0002";
tryAgrain.style.fontSize = "32px"
tryAgrain.style.backgroundColor = "white";
tryAgrain.style.textAlign = "center";
tryAgrain.style.display = "none";

const end = new Image(400, 287);
document.body.appendChild(end);

end.style.position = "absolute";
end.src = "img/end.png";
end.id = "end";
end.style.width = "25%";
end.style.height = "auto";

end.style.left = "38%";


end.style.display = "none";

document.getElementById("score").style.color = "white";
document.getElementById("secondes").style.color = "white";
document.getElementById("score").style.textAlign = "center";
document.getElementById("secondes").style.textAlign = "center";

document.body.style.fontFamily = "monospace";
document.body.style.fontWeight = "bold";
document.body.style.backgroundImage = "url('img/back.png')";
document.body.style.backgroundSize = "cover";

document.getElementById("gameover").style.display = "none"; // Cache Img GameOver

let game = true; // game = false si Game Over

let score = 0; // Init Score

let intervalId; // Id Chrono
timer();        // Fonction Chrono

let coinIntervalId;
coinTimer();

let goombaIntervalId;
startGoomba();

const audioPiece = new Audio("audio/Audio_Piece.mp3");
const audioGameover = new Audio("audio/Audio_Gameover.mp3");
const audioGoomba = new Audio("audio/Audio_Goomba.mp3");
const audioTheme = new Audio("audio/Audio_Theme.mp3");

audioTheme.play();

function newGame(){

    // Init Mario

    xMario = window.innerWidth / 2;
    yMario = window.innerHeight / 2;

    xCenterMario = xMario + 50;
    yCenterMario = yMario + 65;

    marioFlip = false;
    mario.style.transform = "scaleX(1)";

    moveImgTo("perso", xMario, yMario);

    document.getElementById("perso").style.display = "block";

    // Init Piece

    xCoin = Math.floor(Math.random() * (window.innerWidth - 100));
    yCoin = Math.floor(Math.random() * (window.innerHeight - 100));

    xCenterCoin = xCoin + 30;
    yCenterCoin = yCoin + 36;

    moveCoin();

    document.getElementById("piece").style.display = "block";
    
    // Init Goomba

    xGoomba = Math.floor(Math.random() * (window.innerWidth - 100));
    yGoomba = Math.floor(Math.random() * (window.innerHeight - 100));

    xCenterGoomba = xGoomba + 30;
    yCenterGoomba = yGoomba + 37;

    goomba.style.left = xGoomba + "px";
    goomba.style.top = yGoomba + "px";

    stopGoomba = 0;

    document.getElementById("goomba").style.display = "block";

    //_______________________________________________________________

    document.getElementById("gameover").style.display = "none"; // Cache Img GameOver
    tryAgrain.style.display = "none";
    end.style.display = "none";

    game = true; // game = false si Game Over

    score = 0; // Init Score
    document.getElementById("score").innerText = "Score : " + score;

    timer();        // Fonction Chrono

    coinTimer();

    startGoomba();

    audioTheme.play();
}


document.addEventListener("keydown", function(event) {
    if(event.key == " " && !game){
        audioGameover.pause();
        audioGameover.currentTime = 0;
        newGame();
    }
    
    if (event.key == "ArrowLeft" && game){
        xMario = xMario<0 ? (xMario + innerWidth - 20) % innerWidth : (xMario - 20) % innerWidth;
        moveImgTo("perso", xMario, yMario);
        testCollisionCoin();
        if (!marioFlip){
            mario.style.transform = "scaleX(-1)";
            marioFlip = !marioFlip;
        }
    } else if (event.key == "ArrowUp" && game){
        yMario = yMario<0 ? (yMario + innerHeight - 20) % innerHeight : (yMario - 20) % innerHeight;
        moveImgTo("perso", xMario, yMario);
        testCollisionCoin();
    } else if (event.key == "ArrowRight" && game){
        xMario = (xMario + 20) % innerWidth;
        moveImgTo("perso", xMario, yMario);
        testCollisionCoin();
        if (marioFlip){
            mario.style.transform = "scaleX(1)";
            marioFlip = !marioFlip;
        }
    } else if (event.key == "ArrowDown" && game){
        yMario = (yMario + 20) % innerHeight;
        moveImgTo("perso", xMario, yMario);
        testCollisionCoin();
    }
});

function moveImgTo(id,x,y){
    document.getElementById(id).style.left = x + "px";
    document.getElementById(id).style.top = y + "px";
};

function moveCoin(){
    do {
        xCoin = Math.floor(Math.random() * (window.innerWidth - 100));
        yCoin = Math.floor(Math.random() * (window.innerHeight - 100));
        xCenterCoin = xCoin + 30;
        yCenterCoin = yCoin + 36;
    } while((Math.abs(xCenterCoin - xCenterMario) < 80) && (Math.abs(yCenterCoin - yCenterMario) < 100));    
    
    moveImgTo("piece",xCoin,yCoin);
}

function testCollisionCoin(){
    xCenterMario = xMario + 75;
    yCenterMario = yMario + 75;
    xCenterCoin = xCoin + 30;
    yCenterCoin = yCoin + 30;
    
    if((Math.abs(xCenterCoin - xCenterMario) < 100) && (Math.abs(yCenterCoin - yCenterMario) < 100)){
        moveCoin();
        audioPiece.pause();
        audioPiece.currentTime = 0;
        audioPiece.play();
        score++;
        document.getElementById("score").innerText = "Score : " + score;
        stopTimer(coinIntervalId);
        coinTimer();
    }
}

function testCollisionGoomba(){
    if((Math.abs(xCenterGoomba - xCenterMario) < 30) && (Math.abs(yCenterGoomba - yCenterMario) < 50)){
        audioGoomba.play();
        stopGoomba = 100;
        score == 0 ? score = 0 : score--;
        document.getElementById("score").innerText = "Score : " + score;
    }
}

function moveGoomba(){
    if (stopGoomba == 0){
        let norme = Math.sqrt(((xCenterMario - xCenterGoomba) * (xCenterMario - xCenterGoomba)) + ((yCenterMario - yCenterGoomba) * (yCenterMario - yCenterGoomba)));

        let xMove = (xCenterMario - xCenterGoomba) / norme;
        let yMove = (yCenterMario - yCenterGoomba) / norme;

        xGoomba += xMove;
        yGoomba += yMove;

        xCenterGoomba = xGoomba + 65;
        yCenterGoomba = yGoomba + 60;

        moveImgTo("goomba", xGoomba, yGoomba);
        testCollisionGoomba();
    } else {
        if (marioBlink && (Math.floor(stopGoomba/10) % 2 == 0)){
            mario.style.display = "block";
            marioBlink = false;
        } else {            
            mario.style.display = "none";
            marioBlink = true ;
        }
        stopGoomba--;
    }
    
}

function timer(){
    let chrono = 30;
    
    intervalId = setInterval(function(){
        if (chrono==1){
            chrono--;
            document.getElementById("secondes").innerText = "Temps restant : " + chrono + " s";
            document.getElementById("gameover").style.display = "block";
            tryAgrain.style.display = "block";
            end.style.display = "block";
            mario.style.display = "none";
            coin.style.display = "none";
            goomba.style.display = "none";
            game = false;
            audioTheme.pause();
            audioTheme.currentTime = 0;
            audioGameover.play();
            stopTimer(intervalId);
        } else {
            chrono--;
            document.getElementById("secondes").innerText = "Temps restant : " + chrono + " s";
        };
    }, 1000);
}

function coinTimer(){
    coinIntervalId = setInterval(function(){
        if (game){
            moveCoin();
        } else {
            stopTimer(coinIntervalId);
        }
    }, 5000);
}

function startGoomba(){
    goombaIntervalId = setInterval(function(){
        game ? moveGoomba() : stopTimer(goombaIntervalId)
    }, 10);
}

function stopTimer(id){
    clearInterval(id);
}