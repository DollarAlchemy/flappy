/* game.js */
const emojis = ['😀', '😂', '😍', '😎', '🤩', '🥳', '😜', '🤔', '🤖', '👻', '🎃', '🐱', '🐶', '🦊', '🐼', '🐵', '🐸', '🐯'];
let cards = [...emojis, ...emojis];
let firstCard, secondCard;
let lockBoard = false;
let timer = 0;
let score = 0;
let matches = 0;
let moves = 0;
let bestTime = localStorage.getItem('bestTime') || "-";
let interval;

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    document.getElementById("restartButton").addEventListener("click", restartGame);
    updateBestTimeDisplay();
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    const gameBoard = document.getElementById('gameBoard');
    if (!gameBoard) return;
    gameBoard.innerHTML = '';
    matches = 0;
    moves = 0;
    
    cards.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
    startTimer();
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.innerText = this.dataset.emoji;
    this.classList.add('flipped');
    playFlipSound();
    moves++;
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    lockBoard = true;
    
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            score += 10;
            matches++;
            document.getElementById('score').innerText = score;
            playMatchSound();
            resetBoard();
            checkGameEnd();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.innerText = '';
            secondCard.innerText = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 800);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
    clearInterval(interval);
    timer = 0;
    document.getElementById('timer').innerText = timer;
    interval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerText = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

function checkGameEnd() {
    if (matches === emojis.length) {
        stopTimer();
        setTimeout(() => {
            displayEndScreen();
        }, 500);
    }
}

function displayEndScreen() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `<div class='end-screen'>
        <h2>🎉 Congratulations! 🎉</h2>
        <p>You completed the game in <strong>${timer}</strong> seconds with <strong>${moves}</strong> moves!</p>
        <p>Best Time: <strong>${bestTime}</strong></p>
        <button onclick='restartGame()'>Play Again</button>
    </div>`;
    gameBoard.classList.add('centered');
    checkBestTime();
}

function checkBestTime() {
    if (bestTime === "-" || timer < bestTime) {
        localStorage.setItem('bestTime', timer);
        bestTime = timer;
    }
    updateBestTimeDisplay();
}

function updateBestTimeDisplay() {
    document.getElementById('bestTimeDisplay').innerText = `Best Time: ${bestTime}s`;
}

function restartGame() {
    playRestartSound();
    score = 0;
    document.getElementById('score').innerText = score;
    createBoard();
}
