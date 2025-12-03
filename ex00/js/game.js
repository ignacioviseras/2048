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


function createGrid() {
    
    const gameTable = document.querySelector(".game-table");
    const score = document.querySelector("#score-value");
    const scoreTop = document.querySelector("#top-score");
    gameTable.innerHTML = "";
    score.innerHTML = scoreValue;
    scoreTop.innerHTML = topScore;
    
    game[getRandom(4)][getRandom(4)] = Math.random() < 0.5 ? 2 : 4;
    game[getRandom(4)][getRandom(4)] = Math.random() < 0.5 ? 2 : 4;
    for (let row of game) {
        for (let value of row) {
            const cell = document.createElement("div");
            cell.classList.add("num");
            cell.textContent = value == 0 ? "": value;
            cell.style.backgroundColor = getColor(value);
            gameTable.appendChild(cell);
        }
    }
    console.table(game);
    playGame();
}

function getColor(value) {
    if (value === 0)
        return "#2f3038";
    const color = 80.64516129032259;
    const saturation = 100;
    const exponent = Math.log2(value);
    let lightness = Math.max(10, 85 - exponent * 5);
    return `hsl(${color}, ${saturation}%, ${lightness}%)`;
}


function updateGrid() {
    animateMovements();

    setTimeout(() => {
        const gameTable = document.querySelector(".game-table");
        document.querySelector("#score-value").textContent = scoreValue;
        const cells = gameTable.children;

        let pos = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const value = game[i][j];
                const cell = cells[pos];

                cell.textContent = value === 0 ? "" : value;
                cell.style.backgroundColor = getColor(value);
                pos++;
            }
        }

        // merges
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                for (let [x, y] of merges)
                    animateMerge(x, y);
                merges = [];
                movements = [];
            });
        });
        if (loseGame()) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    alert("you lose :(")
                    if (confirm("Game over — Restart?")) {
                        topScore = scoreValue;
                        scoreValue = 0;
                        clearGrid();
                        createGrid();
                    }
                });
            });
        }

        if (winGame()) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    alert("You win")
                    if (confirm("Play again — Reset game")) {
                        topScore = 0;
                        scoreValue = 0;
                        clearGrid();
                        createGrid();
                    }
                });
            });
        }

    }, 50); // pequeño delay para que se vea la animación
}

function winGame() {
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length; j++) {
            if (game[i][j] === 2048) 
                return true;
        }
    }
    return false;
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

function spawnTile() {
    let empty = [];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (game[i][j] === 0) empty.push([i, j]);
        }
    }
    if (empty.length === 0)
        return;

    let [x, y] = empty[Math.floor(Math.random() * empty.length)];
    game[x][y] = Math.random() < 0.5 ? 2 : 4;

    const gameTable = document.querySelector(".game-table");
    const index = x * 4 + y;
    const cell = gameTable.children[index];
    cell.classList.add("new-tile");
    setTimeout(() => {
        cell.classList.remove("new-tile");
    }, 200);
}

function animateMerge(x, y) {
    const gameTable = document.querySelector(".game-table");
    const index = x * 4 + y;
    const cell = gameTable.children[index];

    cell.classList.add("num-merged");
    setTimeout(() => {
        cell.classList.remove("num-merged");
    }, 400);
}

function animateMovements() {
    const gameTable = document.querySelector(".game-table");
    const cells = gameTable.children;

    for (let [x, y, dir] of movements) {
        const index = x * 4 + y;
        const cell = cells[index];

        if (!cell)
            continue;
        cell.style.setProperty("--delay", `${index * 50}ms`);
        cell.classList.add("move-" + dir);
    }

    setTimeout(() => {
        for (let cell of cells) {
            cell.classList.remove("move-up", "move-down", "move-left", "move-right");
        }
    }, 120);
}



function hasChanged(before, after) {
    for (let i = 0; i < before.length; i++) {
        for (let j = 0; j < before[i].length; j++) {
            if (before[i][j] !== after[i][j]) return true;
        }
    }
    return false;
}


function handleUP() {
    const before = game.map(row => [...row]);
    moveUp();
    mergeUp();
    moveUp();
    if (hasChanged(before, game)) {
        spawnTile();
    }
    updateGrid();
}

function handleDown() {
    const before = game.map(row => [...row]);
    moveDown();
    mergeDown();
    moveDown();
    if (hasChanged(before, game)) {
        spawnTile();
    }
    updateGrid();
}

function handleLeft() {
    const before = game.map(row => [...row]);
    moveLeft();
    mergeLeft();
    moveLeft();
    if (hasChanged(before, game)) {
        spawnTile();
    }
    updateGrid();
}

function handleRight() {
    const before = game.map(row => [...row]);
    moveRight();
    mergeRight();
    moveRight();
    if (hasChanged(before, game)) {
        spawnTile();
    }
    updateGrid();
}

function playGame() {
    document.addEventListener("keydown", function(event) {
       if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key))
        event.preventDefault();
        if (isMoving)
            return;
        isMoving = true;
        switch(event.key) {
            case "ArrowUp":
                handleUP();
                break;
            case "ArrowDown":
                handleDown();
                break;
            case "ArrowLeft":
                handleLeft();
                break;
            case "ArrowRight":
                handleRight();
                break;
        }
        setTimeout(() => {
            isMoving = false;
        }, 100);
    });
}

function clearGrid() {
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length; j++) {
            game[i][j] = 0;
        }
    }
}

function restartGame() {
    const btn = document.querySelector('input[type="button"]');
    btn.addEventListener("click", function () {
        topScore = scoreValue;
        scoreValue = 0;
        clearGrid();
        createGrid();
    });
}

createGrid();
restartGame();

