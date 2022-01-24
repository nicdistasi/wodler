import { wordList } from './wordList.js';

var keyObjs = Array.from(document.getElementsByClassName('key'));
var gridBoxes = Array.from(document.getElementsByClassName('grid-box'));

var gameInfo = {
    word: null,
    playing: false,
    currentRow: 1,
    currentCol: 1,
    currentBox: 0,
    correctLetters: 0,
    correctPositions: 0
}

function updateBoardColors(colMap) {
    gridBoxes.forEach(box => {
        box.classList.remove("current-box");
    });
    gridBoxes[gameInfo.currentBox].classList.add("current-box");


}

function startGame() {
    var num = Math.floor(Math.random() * wordList.length)
    gameInfo.word = wordList[num];

    gameInfo.playing = true;
    updateBoardColors();
}


function typeLetter(letter) {
    if (gameInfo.playing == true ) {
        if (letter == 'Backspace') {
            if (gridBoxes[gameInfo.currentBox - 1] != undefined) {
                gridBoxes[gameInfo.currentBox - 1].innerHTML = null;
                gameInfo.currentCol--;
            }
        } else {
            if (gameInfo.currentCol < 6) {
                gridBoxes[gameInfo.currentBox].innerHTML = letter;
                gameInfo.currentCol++;
            }
        }
    }
    if (gameInfo.currentCol < 6) {
        gameInfo.currentBox = (gameInfo.currentRow -1)*5 + gameInfo.currentCol -1;
    } else {
       gameInfo.currentBox = (gameInfo.currentRow -1)*5 + gameInfo.currentCol-2; 
    }
    
    updateBoardColors();
}

function submitWord() {
    var submittedLetters = [];
    var correctLetters = gameInfo.word.split("");
    var colorMap = [];
    for (var i = gameInfo.currentBox-4; i <= gameInfo.currentBox; i++) {
        submittedLetters.push(gridBoxes[i].innerHTML);
    }
    
    for (var i = 0; i<5; i++) {
        if (submittedLetters[i] == correctLetters[i]) {
            colorMap[i] = "correct";
        } else if (correctLetters.includes(submittedLetters[i])) {
            colorMap[i] = "close";
        } else {
            colorMap[i] = "wrong";
        }
    }

    updateBoardColors(colorMap);
    
    if (colorMap.every(a => a == "correct")) {
        console.log("win");
        gameInfo.playing = false;
    } else {
        gameInfo.currentBox++;
        gameInfo.currentCol = 1;
    }
}


function keyDetect(e) {
    var keyPressed = null;
    if (e instanceof MouseEvent) {
        keyPressed = e.target.getAttribute('data-key');
    } else if (e instanceof KeyboardEvent) {
        keyPressed = e.key;
    }

    if (keyPressed == 'Enter') {
        submitWord();
    } else {
        typeLetter(keyPressed);
    }
}


document.addEventListener("keydown", keyDetect);
keyObjs.forEach(key => {
    key.addEventListener('click', keyDetect);
});

startGame();