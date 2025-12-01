const game = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
const scoreValue = 0;

function createGrid() {
    const gameTable = document.querySelector(".game-table");
    const score = document.querySelector("#score-value");
    gameTable.innerHTML = "";
    score.innerHTML = scoreValue;
    
    game[getRandom(4)][getRandom(4)] = Math.random() < 0.5 ? 2 : 4;
    game[getRandom(4)][getRandom(4)] = Math.random() < 0.5 ? 2 : 4;
    for (let row of game) {
        for (let value of row) {
            const cell = document.createElement("div");
            cell.classList.add("num");
            cell.textContent = value == 0 ? "": value;
            gameTable.appendChild(cell);
        }
    }
    console.table(game);
    playGame();
}

function updateGrid(table) {
    const gameTable = document.querySelector(".game-table");
    const cells = gameTable.children;
    let x = 0;

    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length; j++) {
            let value = game[i][j];
            cells[x].textContent = value == 0 ? "": value;
            x++;
        }
        
    }
}

/**
    Si le pasamos 3 generara aleatorio de 0 1 2
*/
function getRandom(x) {
    return Math.floor(Math.random() * x);
}

function handleUP() {
    console.log("up");
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j < game[i].length; j++) {
            let value = game[i][j];
            let x = i
            while (x > 0 && game[x-1][j] === 0) {
                game[x-1][j] = game[x][j]; // mover el valor hacia arriba
                game[x][j] = 0;            // vaciar la celda original
                x--;
            }

            // game[x][j] = value;
        }
    }
    updateGrid();

    
}

function playGame() {
    document.addEventListener("keydown", function(event) {
       if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key))
        event.preventDefault();
        switch(event.key) {
            case "ArrowUp":
                handleUP();
                break;
            case "ArrowDown":
                // handleDown();
                console.log("down");
                break;
            case "ArrowLeft":
                // handleLeft();
                console.log("left");
                break;
            case "ArrowRight":
                // handleRight();
                console.log("right");
                break;
        }
    });
}

function restartGame() {
    const btn = document.querySelector('input[type="button"]');
    btn.addEventListener("click", function () {
        console.log("cle");
        for (let i = 0; i < game.length; i++) {
            for (let j = 0; j < game[i].length; j++) {
                game[i][j] = 0;
            }
        }
        createGrid();
    });
    

}


createGrid();
restartGame();
// playGame();

