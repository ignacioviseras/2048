const game = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function createGrid() {
    const gameTable = document.querySelector(".game-table");
    const score = document.querySelector("#score-value");
    const scoreValue = 0;
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
    // initGame();
}

/**
    Si le pasamos 3 generara aleatorio de 0 1 2
*/
function getRandom(x) {
    return Math.floor(Math.random() * x);

}

// function initGame() {
    

// }

createGrid();