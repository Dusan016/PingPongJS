const canvas = document.getElementById("pong");
const context = canvas.getContext('2d');

const user1 = {
    x : 0,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "white",
    score : 0
}

const user2 = {
    x : canvas.width - 10,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "white",
    score : 0
}

const net = {
    x : canvas.width/2 - 1,
    y : 0,
    width: 2,
    height: 10,
    color: "white"
}

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    speed : 5,
    velocityX : 5,
    velocityY : 5,
    color : "white"
}

function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color){
    context.fillStyle = color;
    context.font = "35px fantasy";
    context.fillText(text, x, y);
}

function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
function render(){
    drawRect(0, 0, 600, 400, "black");
    drawText(user1.score, canvas.width/4, canvas.height/5, "white");
    drawText(user2.score, 3*canvas.width/4, canvas.height/5, "white");
    drawNet();
    drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
    drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

canvas.addEventListener("mousemove", moveUser1);

function moveUser1(evt){
    let rect = canvas.getBoundingClientRect();
    user1.y = evt.clientY - rect.top - user1.height/2;
}

function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    let computerLevel = 0.5;
    user2.y += (ball.y - (user2.y + user2.height/2)) * computerLevel;
    
    if((ball.y + ball.radius > canvas.height) || (ball.y - ball.radius < 0)){
        ball.velocityY = - ball.velocityY;
    }
    let player = (ball.x < canvas.width/2) ? user1 : user2;

    if(collision(ball,player)){
        
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint;

        let direction = (ball.x < canvas.width/2) ? 1 : -1;

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad);
        
        ball.speed += 0.5;
        
    }
    if(ball.x - ball.radius < 0){
        user2.score++;
        resetBall();
    }
    else if(ball.x + ball.radius > canvas.width){
        user1.score++;
        resetBall();
    }
}

function game(){
    update();
    render();
}

const framePerSeconds = 50;
setInterval(game,1000/framePerSeconds);






