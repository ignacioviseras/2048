const game = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function init() {
    const gameTable = document.querySelector(".game-table");
    const score = document.querySelector("#score-value");
    // const gameTable = document.querySelector(".game-table");//pillar este para el score-value
    gameTable.innerHTML = "";
    score.innerHTML = 0;
    
    for (let row of game) {
        for (let value of row) {
            const cell = document.createElement("div");
            cell.classList.add("num");
            cell.textContent = value == 0 ? "": value;
            gameTable.appendChild(cell);
        }
        
    }
}

init();