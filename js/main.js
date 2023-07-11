const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const fps = 100; //ms
let time = 400;
let time_counter = 0;
// let x = 0;
// let y = canvas.height - 48;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

// let yVelo = 0;
// let yAccel = 0;
// let groundFlag = true;

class Entity{
    constructor(x, y){
        this.xPos   = x;
        this.yPos   = y;
        this.xVelo  = 0;
        this.yVelo  = 0;
        this.xAccel = 0;
        this.yAccel = 0;
        this.groundFlag = true;
    //    this.liveFlag = 1;
    }

    updateStatus(isLeft, isRight, isSpace){        
        if(isRight){
            this.xPos += 7;
            if (this.xPos > canvas.width){
                this.xPos = canvas.width;
            }        
        }
        if(isLeft){
            this.xPos -= 7;
            if (this.xPos < 0){
                this.xPos = 0;
            }        
        }
        if(isSpace){
            this.yVelo  = -20;
            this.yAccel = 4;
        }
        this.xVelo = this.xVelo + this.xAccel;
        this.yVelo = this.yVelo + this.yAccel;
        this.xPos  = this.xPos + this.xVelo;
        this.yPos  = this.yPos + this.yVelo;

        if(this.yPos >= canvas.height - 48){
            this.yPos = canvas.height - 48;
            this.yVelo = 0;
            this.yAccel = 0;
            // groundFlag = true;
        }
    }
}

class User extends Entity{
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        spacePressed = true;
    }
    
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp"){
        spacePressed = false;
    }
}

function draw(x, y) {
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
}

var user = new User(0, canvas.height - 48);

function main(){
    user.updateStatus(leftPressed, rightPressed, spacePressed);
    draw(user.xPos, user.yPos);
    // ctx.fillText(String(spacePressed), 20, 50);
}

setInterval(main, 1000 / fps);