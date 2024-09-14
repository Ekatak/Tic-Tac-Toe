const board = document.getElementById('game-board');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset-button');


let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
        return;
    }

    gameBoard[index] = currentPlayer;
    renderBoard();
    
    const winner = checkWinner();
    if (winner) {
        resultDisplay.textContent = `Player ${winner} wins!`;
        resultDisplay.classList.add('result-text');
        gameActive = false;
    } else if (checkTie()) {
        resultDisplay.textContent = "It's a tie!";
        resultDisplay.classList.add('result-text');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleClick(index));
        board.appendChild(cell);
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    resultDisplay.textContent = '';
    resultDisplay.classList.remove('result-text');
    renderBoard();
}

resetButton.addEventListener('click', resetGame);

// Initialize the game
renderBoard();
