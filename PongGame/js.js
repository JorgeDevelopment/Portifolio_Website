const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const score = document.querySelector("#score");
const reset = document.querySelector("#reset");
const gameW = gameboard.width;
const gameh = gameboard.height;
const boardBack = "forestgreen";
const pad1color = "lightblue";
const pad2color = "red";
const padborder = "black";
const ballcolor = "yellow";
const ballborder = "black";
const ballradius = 12.25;
const padspeed = 50;
let intervalId;
let ballspeed = 1;
let ballx = gameW/2;
let bally = gameh/2;
let ballXdirec = 0;
let ballYdirec = 0;
let p1score = 0;
let p2score = 0;
let pad1 ={
    width:25,
    height: 100,
    x : 0,
    y : 0
}
let pad2 ={
    width:25,
    height: 100,
    x : gameW - 25,
    y : gameh - 100
}

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

gameStart();
 
function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalId = setTimeout (() =>{
        clearsBoard();
        drawpads();
        moveBall();
        drawBall(ballx,bally);
        checkCollision();
        nextTick();
    },10
    );
};
function clearsBoard(){
    ctx.fillStyle = boardBack;
    ctx.fillRect(0,0,gameW,gameh);
};
function drawpads(){
    ctx.strokeStyle=padborder;

    ctx.fillStyle = pad1color;
    ctx.fillRect(pad1.x, pad1.y, pad1.width, pad1.height);
    ctx.strokeRect(pad1.x, pad1.y, pad1.width, pad1.height);

    ctx.fillStyle = pad2color;
    ctx.fillRect(pad2.x, pad2.y, pad2.width, pad2.height);
    ctx.strokeRect(pad2.x, pad2.y, pad2.width, pad2.height);

};
function createBall(){
    ballspeed = 1;
    if(Math.round(Math.random())==1)
    ballXdirec =1;
    else
    ballXdirec = -1;

    if(Math.round(Math.random())==1)
    ballYdirec =1;
    else
    ballYdirec = -1;

    ballx = gameW / 2;
    bally = gameh /2;
    drawBall(ballx,bally);
};
function moveBall(){
    ballx += (ballspeed * ballXdirec);
    bally += (ballspeed * ballYdirec);

};
function drawBall(){
    ctx.fillStyle = ballcolor;
    ctx.strokeStyle = ballborder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballx,bally, ballradius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkCollision(){
    if(bally <=0 + ballradius){
        ballYdirec *= -1;
    }
    if(bally >= gameh - ballradius){
        ballYdirec *= -1;
    }
    if(ballx <= 0 ){
        p2score +=1;
        updateScore();
        createBall();
        return;
    }
    if(ballx >= gameW ){
        p1score +=1;
        updateScore();
        createBall();
        return;
    }
    if(ballx <= (pad1.x + pad1.width + ballradius)){
        if(bally > pad1.y && bally < pad1.y + pad1.height){
            ballx = (pad1.x + pad1.width) + ballradius;
            ballXdirec *= -1;
            ballspeed += 0.5;
        }
    }
    if(ballx >= (pad2.x - ballradius)){
        if(bally > pad2.y && bally < pad2.y + pad2.height){
            ballx = pad2.x - ballradius;
            ballXdirec *= -1;
            ballspeed += 0.5;
        }
    }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const pad1Up = 87;
    const pad1down = 83;
    const pad2Up = 38;
    const pa2down = 40;

    switch(keyPressed){
        case(pad1Up):
            if(pad1.y > 0){
               pad1.y -= padspeed; 
            }
            break;
        case(pad1down):
            if(pad1.y < gameh - pad1.height){
            pad1.y += padspeed;
            }  
            break;
            case(pad2Up):
            if(pad2.y > 0){
               pad2.y -= padspeed; 
            }
            break;
        case(pa2down):
            if(pad2.y < gameh - pad2.height){
                pad2.y += padspeed;
            }  
            break;
    }
};
function updateScore(){
    score.textContent = `${p1score} : ${p2score}`
};
function resetGame(){
    p1score = 0;
    p2score = 0;

     pad1 ={
        width:25,
        height: 100,
        x : 0,
        y : 0
    }
     pad2 ={
        width:25,
        height: 100,
        x : gameW - 25,
        y : gameh - 100
    };
    ballspeed = 1;
    ballx = 0;
    bally = 0;
    ballXdirec = 0;
    ballYdirec = 0;
    updateScore ();
    clearInterval(intervalId);
    gameStart();
};