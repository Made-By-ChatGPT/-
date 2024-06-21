class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 2;
        this.vy = -2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(canvasWidth, canvasHeight) {
        this.x += this.vx;
        this.y += this.vy;

        // 壁との衝突
        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }
        if (this.y - this.radius < 0) {
            this.vy = -this.vy;
        }
    }

    collideWithPaddle(paddle) {
        if (this.x > paddle.x && this.x < paddle.x + paddle.width && this.y + this.radius > paddle.y) {
            this.vy = -this.vy;
            this.y = paddle.y - this.radius; // パドルの上にボールを配置
        }
    }

    collideWithBricks(bricks) {
        for (let c = 0; c < bricks.length; c++) {
            for (let r = 0; r < bricks[c].length; r++) {
                const b = bricks[c][r];
                if (b.status === 1) {
                    if (this.x > b.x && this.x < b.x + b.width && this.y > b.y && this.y < b.y + b.height) {
                        this.vy = -this.vy;
                        b.status = 0; // ブロックを消す
                        return;
                    }
                }
            }
        }
    }
}

class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.vx = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move(direction, canvasWidth) {
        if (direction === "left" && this.x > 0) {
            this.x -= 7;
        } else if (direction === "right" && this.x + this.width < canvasWidth) {
            this.x += 7;
        }
    }
}
