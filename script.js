document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');
    let currentPlayer = 'X';
    let gameActive = true;
    let moves = 0;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (clickedCell, cellIndex) => {
        gameState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        moves++;

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (moves === 9) {
            message.textContent = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const restartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        moves = 0;
        gameState = ['', '', '', '', '', '', '', '', ''];
        message.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            const clickedCell = cell;
            const cellIndex = index;

            if (gameState[cellIndex] === '' && gameActive) {
                handleCellClick(clickedCell, cellIndex);
            }
        });
    });

    restartBtn.addEventListener('click', restartGame);
});
