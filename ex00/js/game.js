const game = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

let scoreValue = 0;
let topScore = 0;
let isMoving = false;
let merges = [];
let movements = [];

/**
    Si le pasamos 3 generara aleatorio de 0 1 2
*/
function getRandom(x) {
    return Math.floor(Math.random() * x);
}

function moveUp() {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (game[i][j] !== 0) {
                let x = i;
                while (x > 0 && game[x - 1][j] === 0) {
                    game[x - 1][j] = game[x][j];
                    game[x][j] = 0;
                    x--;
                }
                if (x !== i)
                    movements.push([x, j, "up"]);
            }
        }
    }
}


function mergeUp() {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (game[i][j] !== 0 && game[i][j] === game[i - 1][j]) {
                game[i - 1][j] *= 2;
                scoreValue += game[i - 1][j];
                game[i][j] = 0;
                merges.push([i - 1, j]);
            }
        }
    }
}

function moveDown() {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (game[i][j] !== 0) {
                let x = i;
                while (x < 3 && game[x + 1][j] === 0) {
                    game[x + 1][j] = game[x][j];
                    game[x][j] = 0;
                    x++;
                }
                if (x !== i) movements.push([x, j, "down"]);
            }
        }
    }
}


function mergeDown() {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (game[i][j] !== 0 && game[i][j] === game[i + 1][j]) {
                game[i + 1][j] *= 2;
                scoreValue += game[i + 1][j];
                game[i][j] = 0;
                merges.push([i + 1, j]);
            }
        }
    }
}

function moveLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (game[i][j] !== 0) {
                let y = j;
                while (y > 0 && game[i][y - 1] === 0) {
                    game[i][y - 1] = game[i][y];
                    game[i][y] = 0;
                    y--;
                }
                if (y !== j) movements.push([i, y, "left"]);
            }
        }
    }
}


function mergeLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (game[i][j] !== 0 && game[i][j] === game[i][j - 1]) {
                game[i][j - 1] *= 2;
                scoreValue += game[i][j - 1];
                game[i][j] = 0;
                merges.push([i, j - 1]);
            }
        }
    }
}

function moveRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (game[i][j] !== 0) {
                let y = j;
                while (y < 3 && game[i][y + 1] === 0) {
                    game[i][y + 1] = game[i][y];
                    game[i][y] = 0;
                    y++;
                }
                if (y !== j) movements.push([i, y, "right"]);
            }
        }
    }
}


function mergeRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (game[i][j] !== 0 && game[i][j] === game[i][j + 1]) {
                game[i][j + 1] *= 2;
                scoreValue += game[i][j + 1];
                game[i][j] = 0;
                merges.push([i, j + 1]);
            }
        }
    }
}

function loseGame() {
    // hay 0 en alguna celda
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length; j++) {
            if (game[i][j] === 0) 
                return false;
        }
    }

    //sii hay 2 celdas iguales puedes moverte
    //horizontal
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length - 1; j++) {
            if (game[i][j] === game[i][j + 1])
                return false;
        }
    }
    //vertical
    for (let j = 0; j < game[0].length; j++) {
        for (let i = 0; i < game.length - 1; i++) {
            if (game[i][j] === game[i + 1][j])
                return false;
        }
    }

    return true;//gameover
}

function winGame() {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            if (game[i][j] === 2048)
                return true;
    return false;
}

function clearGrid() {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            game[i][j] = 0;
}
