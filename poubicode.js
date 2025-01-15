var canva = {
    width: 500,
    height: 500,
    color: [0, 0, 0],
};

var ball = {
    x: canva.width / 2,
    y: canva.height - 200,
    xspeed: -2,
    yspeed: 1,
    color: [0, 255, 0],
    r: 12,
};

var paddle = {
    x: 0,
    y: 0,
    width: 50,
    height: 10,
    // blue paddle 
    color: [0, 0, 255],
};

var bricks = [];

var brickSchematic = {
    width: 100,
    height: 40,
    color: [255, 0, 0],
};

function createBricks() {
    var row = canva.width / brickSchematic.width;
    var col = canva.height / brickSchematic.height;
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            let newBrick = {
                x: i * brickSchematic.width,
                y: j * brickSchematic.height,
                width: brickSchematic.width,
                height: brickSchematic.height,
                color: brickSchematic.color,
            };
            bricks.push(newBrick);
        }
        if (i >= row - 1) {
            //  console.log(i)
            break;
        }
    }
}
createBricks();

function setup() {
    createCanvas(canva.width, canva.height);
    background(canva.color);
}

function draw() {
    background(canva.color);
    drawBall();
    drawPaddle();
    gameOver();
    drawBricks();
    //console.log(bricks, bricks.length)
    win();
}

function drawBall() {
    ball.y += ball.yspeed;
    ball.x += ball.xspeed;
    fill(ball.color);
    ellipse(ball.x, ball.y, ball.r * 2);
    // si la balle touche le bord droit
    if (ball.x + ball.r >= canva.width) {
        ball.x = canva.width - ball.r - 1;
        ball.xspeed *= -1;
    }
    // si la balle touche le bord gauche
    if (ball.x - ball.r <= 0) {
        ball.x = ball.r + 1;
        ball.xspeed *= -1;
    }
    // si la balle touche le bord haut
    if (ball.y - ball.r <= 0) {
        ball.y = ball.r + 1;
        ball.yspeed *= -1;
    }

    if (ball.x >= paddle.x && ball.x <= paddle.x + paddle.width && ball.y + ball.r >= paddle.y) {
        ball.yspeed *= -1;
    }

    for (let i = 0; i < bricks.length; i++) {
        // si la balle touche une brique en haut
        if (
            ball.y + ball.r >= bricks[i].y &&
            ball.y + ball.r <= bricks[i].y + bricks[i].height &&
            ball.x > bricks[i].x &&
            ball.x < bricks[i].x + bricks[i].width
        ) {
            ball.yspeed *= -1;
            bricks.splice(i, 1);
            continue;
        }
        // si la balle touche une brique en bas
        if (
            ball.y - ball.r <= bricks[i].y + bricks[i].height &&
            ball.y - ball.r >= bricks[i].y &&
            ball.x > bricks[i].x &&
            ball.x < bricks[i].x + bricks[i].width
        ) {
            ball.yspeed *= -1;
            bricks.splice(i, 1);
            continue;
        }
        // si la balle touche une brique à gauche
        if (
            ball.x + ball.r >= bricks[i].x &&
            ball.x + ball.r <= bricks[i].x + bricks[i].width &&
            ball.y > bricks[i].y &&
            ball.y < bricks[i].y + bricks[i].height
        ) {
            ball.xspeed *= -1;
            bricks.splice(i, 1);
            continue;
        }

        // si la balle touche une brique à droite
        if (
            ball.x - ball.r <= bricks[i].x + bricks[i].width &&
            ball.x - ball.r >= bricks[i].x &&
            ball.y > bricks[i].y &&
            ball.y < bricks[i].y + bricks[i].height
        ) {
            ball.xspeed *= -1;
            bricks.splice(i, 1);
            continue;
        }
    }

}

function drawPaddle() {
    paddle.y = canva.height - 20;
    paddle.x = mouseX;
    fill(paddle.color);
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function gameOver() {
    if (ball.y - ball.r >= canva.height) {
        noLoop();
        fill('red')
        textSize(32);
        text('Game over', 180, 250)

    }
}

function drawBricks() {
    bricks.forEach((brick) => {
        fill(brick.color);
        rect(brick.x, brick.y, brick.width, brick.height);
    })
}

function win() {
    if (bricks.length == '0') {
        noLoop();
        fill('green');
        textSize(32);
        text('You win', 180, 250);
    }
}

/////////////////////////////::::
coldParameters = [random(140, 290), random(100), random(100)];
coldPalette = generatePalette(4, coldParameters);
GRIDCOLORS[i] = coldPalette[curColorIndex]
coldPalette.splice(curColorIndex, 1);

//draw
background(coldPalette[Palette.length - 1]);