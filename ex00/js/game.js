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
    playGame();
}

/**
    Si le pasamos 3 generara aleatorio de 0 1 2
*/
function getRandom(x) {
    return Math.floor(Math.random() * x);
}

function playGame() {
    document.addEventListener("keydown", function(event) {
       if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key))
        event.preventDefault();
        switch(event.key) {
            case "ArrowUp":
                // handleUP();
                console.log("up");
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

