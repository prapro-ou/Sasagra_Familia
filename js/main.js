const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const fps = 100; //ms
let time = 400;
let time_counter = 0;
let x = 0;
let y = canvas.height - 48;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

let yVelo = 0;
let yAccel = 0;
let groundFlag = true;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.key == "w" || e.key == "W") {
        spacePressed = true;
    }
    
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }if(e.key == "w" || e.key == "W"){
        spacePressed = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(x, y, 48, 48);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    ctx.font = ' 48px serif';
    ctx.fillText(String(time), 20, 50)
    time_counter += 1;
    if(time_counter == fps){
        time -= 1;
        time_counter = 0;
    }

    if(rightPressed) {
        x += 7;
        if (x + 96 > canvas.width){
            x = canvas.width - 96;
        }
    }
    else if(leftPressed) {
        x -= 7;
        if (x < 0){
            x = 0;
        }
    }
    else if(spacePressed){
        time = 50;
        if(groundFlag){
            groundFlag = false;
            yVelo  = -40;
            yAccel = 5;
        }
    }

    y += yVelo;
    yVelo += yAccel;
    if(y >= canvas.height - 48){
        y = canvas.height - 48;
        yVelo = 0;
        yAccel = 0;
        groundFlag = true;
    }
}

setInterval(draw, 1000 / fps);