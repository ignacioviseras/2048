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


document.addEventListener("DOMContentLoaded", () => {
    createGrid();
    restartGame();
});