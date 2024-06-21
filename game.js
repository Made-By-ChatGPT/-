const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ball = new Ball(canvas.width / 2, canvas.height - 30, 10, "#0095DD");
const paddle = new Paddle((canvas.width - 75) / 2, canvas.height - 10, 75, 10, "#0095DD");

const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, width: brickWidth, height: brickHeight, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    ball.draw(ctx);
    paddle.draw(ctx);
    ball.update(canvas.width, canvas.height);
    ball.collideWithPaddle(paddle);
    ball.collideWithBricks(bricks);

    if (rightPressed) {
        paddle.move("right", canvas.width);
    } else if (leftPressed) {
        paddle.move("left", canvas.width);
    }

    if (ball.y + ball.radius > canvas.height) {
        document.location.reload(); // ゲームオーバー
    }

    requestAnimationFrame(draw);
}

draw();
