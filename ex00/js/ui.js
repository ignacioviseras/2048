function getColor(value) {
    if (value === 0)
        return "#2f3038";
    const color = 80.64516129032259;//base color (green)
    const saturation = 100;
    const exponent = Math.log2(value);
    let lightness = Math.max(10, 85 - exponent * 5);
    return `hsl(${color}, ${saturation}%, ${lightness}%)`;
}

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

        // animacion-merges
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
                    topScore = 0;
                    scoreValue = 0;
                    clearGrid();
                    createGrid();
                });
            });
        }

    }, 50); // pequeño delay para que se vea la animación
}