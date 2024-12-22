let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;
let player1Name = '';
let player2Name = '';
let theme = 'day';


document.getElementById('start-game').addEventListener('click', () => {
    player1Name = document.getElementById('player1-name').value.trim(); 
    player2Name = document.getElementById('player2-name').value.trim(); 


    document.getElementById('player1-error').textContent = '';
    document.getElementById('player2-error').textContent = '';


    let isValid = true;

    if (!player1Name) {
        document.getElementById('player1-error').textContent = 'Entering name is required.';
        isValid = false; 
    }

    if (!player2Name) {
        document.getElementById('player2-error').textContent = 'Entering name is required.'; 
        isValid = false; 
    }

    if (!isValid) {
        return; 
    }
    console.log('Starting game...'); 
    document.querySelector('.landing-page').style.display = 'none';
    document.querySelector('.game-page').style.display = 'block';
    document.getElementById('player1-display').textContent = `${player1Name} (X)`;
    document.getElementById('player2-display').textContent = `${player2Name} (O)`;
    updateTheme();
    resetGame();
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        if (gameBoard[this.dataset.index] || isGameOver) return;
        gameBoard[this.dataset.index] = currentPlayer;
        this.textContent = currentPlayer;

        if (checkWinner()) {
            isGameOver = true;
            document.getElementById('winner-announcement').textContent = `${currentPlayer === 'X' ? player1Name : player2Name} Wins!`;
            document.getElementById('winner-announcement').classList.add('visible'); 
            document.getElementById('restart-btn').style.display = 'block'; 
            highlightWinningCells();
        } else if (checkForDraw()) {
            isGameOver = true;
            document.getElementById('winner-announcement').textContent = 'It\'s a Draw!';
            document.getElementById('winner-announcement').classList.add('visible'); 
            document.getElementById('restart-btn').style.display = 'block'; 
        }

        else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});
function checkWinner() {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winner = winningCombination.find(combination => {
        return gameBoard[combination[0]] && 
               gameBoard[combination[0]] === gameBoard[combination[1]] && 
               gameBoard[combination[0]] === gameBoard[combination[2]];
    });

    return winner ? true : false;
}

function checkForDraw() {
    return gameBoard.every(cell => cell !== '');
}

function highlightWinningCells() {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningCombination.forEach(combination => {
        if (gameBoard[combination[0]] && gameBoard[combination[0]] === gameBoard[combination[1]] && gameBoard[combination[0]] === gameBoard[combination[2]]) {
            combination.forEach(index => {
                document.querySelector(`.cell[data-index="${index}"]`).classList.add('winner');
            });
        }
    });
}

document.getElementById('restart-btn').addEventListener('click', () => {
    console.log('Restarting game...'); 
    resetGame();
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner'); 
    });
    document.getElementById('winner-announcement').textContent = ''; 
    document.getElementById('winner-announcement').classList.remove('visible'); 
    document.getElementById('restart-btn').style.display = 'none';


    document.querySelector('.landing-page').style.display = 'block';
    document.querySelector('.game-page').style.display = 'none';

    document.getElementById('player1-name').value = '';
    document.getElementById('player2-name').value = '';
    document.getElementById('player1-error').textContent = '';
    document.getElementById('player2-error').textContent = '';
});


function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
}

document.getElementById('theme-btn').addEventListener('click', () => {
    if (isGameOver) return; 
    theme = theme === 'day' ? 'night' : 'day';
    updateTheme();
});

function updateTheme() {
    document.body.className = theme === 'day' ? 'day-theme' : 'night-theme';
    document.getElementById('theme-icon').textContent = theme === 'day' ? '☀️' : '🌙';
}

for (let i = 0; i < 20; i++) { 
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.width = `${Math.random() * 50 + 20}px`; 
    circle.style.height = circle.style.width; 
    circle.style.top = `${Math.random() * 100}vh`;
    circle.style.left = `${Math.random() * 100}vw`; 
    circle.style.animationDelay = `${Math.random() * 5}s`;
    circle.style.transform = `translateZ(${Math.random() * 100}px)`;
    document.querySelector('.background-animation').appendChild(circle);
}