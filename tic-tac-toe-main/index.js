const tiles = document.querySelectorAll(".tile");
const PL_X = "X";
const PL_O = "O";
let turn = PL_X;

const boardState = Array(tiles.length);
boardState.fill(null);

const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function AIclick(index) {
    if(gameOverArea.className != "visible")
    document.querySelectorAll(".tile[data-index='" + index + "']")[0].click();
}


function tileClick(event) {
    if (gameOverArea.classList.contains("visible")) {
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText != "") {
        return;
    }

    if (turn === PL_X) {
        tile.innerText = PL_X;
        boardState[tileNumber - 1] = PL_X;
        turn = PL_O;
    } else {
        tile.innerText = PL_O;
        boardState[tileNumber - 1] = PL_O;
        turn = PL_X;
    }

    checkWinner();
    if (turn == "O")
        AIplay();

}
function AIplay() {
    for (const nextexpected of DangerCombinations) {
        const { combo, expect } = nextexpected;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];

        if (
            tileValue1 != null &&
            tileValue1 === tileValue2
        ) {
            if (!checkifexists(expect)) {
                AIclick(expect)
                return;
            }
        }
    }
    playAIrandom();
}

function playAIrandom() {
    var indexes = Array.from(Array(boardState.length).keys());
    var availableIndexes = indexes.filter((index) => boardState[index] == null);
    var selectedIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    AIclick(selectedIndex + 1)
}

function checkifexists(expect) {
    //console.log(expect)
    //console.log(boardState)
    //alert('checking -  ' + expect)
   
    if (boardState[expect - 1] != null) {
        //alert('stop')
        //alert('unavailable')
        return true;
    }
    else {
        //alert('stop here')
        //alert('available')
        return false;

    }
}

function checkWinner() {
    for (const winningCombination of winningCombinations) {
        const { combo, strikeClass } = winningCombination;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];
        if (
            tileValue1 != null &&
            tileValue1 === tileValue2 &&
            tileValue1 === tileValue3
        ) {
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }

    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if (allTileFilledIn) {
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText) {
    let text = "Draw!";
    if (winnerText == "X") {
        text = `You Win!`;
    }
    else if (winnerText == "O") {
        text = `Computer Wins!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
}

function startNewGame() {
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = PL_X;
}

const winningCombinations = [
    { combo: [1, 2, 3], strikeClass: "strike-row-1" },
    { combo: [4, 5, 6], strikeClass: "strike-row-2" },
    { combo: [7, 8, 9], strikeClass: "strike-row-3" },

    { combo: [1, 4, 7], strikeClass: "strike-column-1" },
    { combo: [2, 5, 8], strikeClass: "strike-column-2" },
    { combo: [3, 6, 9], strikeClass: "strike-column-3" },

    { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
    { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];

const DangerCombinations = [
    { combo: [1, 2], expect: 3 },
    { combo: [1, 3], expect: 2 },
    { combo: [2, 3], expect: 1 },
    { combo: [2, 1], expect: 3 },
    { combo: [3, 2], expect: 1 },
    { combo: [3, 1], expect: 2 },

    { combo: [4, 5], expect: 6 },
    { combo: [4, 6], expect: 5 },
    { combo: [5, 4], expect: 6 },
    { combo: [5, 6], expect: 4 },
    { combo: [6, 5], expect: 4 },
    { combo: [6, 4], expect: 5 },

    { combo: [7, 8], expect: 9 },
    { combo: [7, 9], expect: 8 },
    { combo: [8, 7], expect: 9 },
    { combo: [8, 9], expect: 7 },
    { combo: [9, 7], expect: 8 },
    { combo: [9, 8], expect: 7 },

    { combo: [1, 4], expect: 7 },
    { combo: [1, 7], expect: 4 },
    { combo: [7, 4], expect: 1 },
    { combo: [7, 1], expect: 4 },
    { combo: [4, 7], expect: 1 },
    { combo: [4, 1], expect: 7 },


    { combo: [2, 5], expect: 8 },
    { combo: [2, 8], expect: 5 },
    { combo: [5, 2], expect: 8 },
    { combo: [5, 8], expect: 2 },
    { combo: [8, 5], expect: 2 },
    { combo: [8, 2], expect: 5 },


    { combo: [3, 6], expect: 9 },
    { combo: [3, 9], expect: 6 },
    { combo: [6, 3], expect: 9 },
    { combo: [6, 9], expect: 3 },
    { combo: [9, 3], expect: 6 },
    { combo: [9, 6], expect: 3 },

    { combo: [1, 5], expect: 9 },
    { combo: [1, 9], expect: 5 },
    { combo: [5, 9], expect: 1 },
    { combo: [5, 1], expect: 9 },
    { combo: [9, 1], expect: 5 },
    { combo: [9, 5], expect: 1 },

    { combo: [3, 5], expect: 7 },
    { combo: [3, 7], expect: 5 },
    { combo: [5, 7], expect: 3 },
    { combo: [5, 3], expect: 7 },
    { combo: [7, 3], expect: 5 },
    { combo: [7, 5], expect: 3 },
];

