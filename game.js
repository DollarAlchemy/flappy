/* game.js */
const emojis = ['😀', '😂', '😍', '😎', '🤩', '🥳', '😜', '🤔', '🤖', '👻', '🎃', '🐱', '🐶', '🦊', '🐼', '🐵', '🐸', '🐯'];
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let timer = 0;
let score = 0;
let matches = 0;
let moves = 0;
let bestTime = localStorage.getItem('bestTime') || "-";
let interval;
let gridSize = 6;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("restartButton").addEventListener("click", restartGame);
    updateBestTimeDisplay();
});

function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    const cardTheme = document.getElementById("cardTheme").value;
    const music = document.getElementById("music").value;
    
    document.getElementById("backgroundMusic").src = `sounds/${music}`;
    document.getElementById("backgroundMusic").play();
    
    setGridSize(difficulty);
    generateCards();
    applyCardTheme(cardTheme);
    
    document.getElementById("startMenu").classList.add("hidden");
    document.getElementById("gameUI").classList.remove("hidden");
    createBoard();
}

function setGridSize(difficulty) {
    if (difficulty === "easy") gridSize = 4;
    else if (difficulty === "hard") gridSize = 8;
    else gridSize = 6;
}

function generateCards() {
    const totalPairs = (gridSize * gridSize) / 2;
    const selectedEmojis = emojis.slice(0, totalPairs);
    cards = [...selectedEmojis, ...selectedEmojis];
    shuffle(cards);
}

function applyCardTheme(theme) {
    document.documentElement.style.setProperty('--card-back-color', theme === 'red' ? '#f28b82' : 
        theme === 'blue' ? '#82b1ff' : 
        theme === 'green' ? '#81c784' : '#5c6bc0');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
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
    if (matches === cards.length / 2) {
        stopTimer();
        setTimeout(() => {
            displayEndScreen();
            triggerEmojiDance();
        }, 500);
    }
}

function triggerEmojiDance() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji-dance');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 90 + "%";
        emoji.style.top = Math.random() * 90 + "%";
        gameBoard.appendChild(emoji);
    }
}

function restartGame() {
    playRestartSound();
    score = 0;
    document.getElementById('score').innerText = score;
    createBoard();
}
