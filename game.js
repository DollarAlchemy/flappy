/* game.js */
const emojis = ['😀', '😂', '😍', '😎', '🤩', '🥳', '😜', '🤔', '🤖', '👻', '🎃', '🐱', '🐶', '🦊', '🐼', '🐵', '🐸', '🐯'];
let cards = [...emojis, ...emojis];
let firstCard, secondCard;
let lockBoard = false;
let timer = 0;
let score = 0;
let interval;

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    document.getElementById("restartButton").addEventListener("click", restartGame);
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
    gameBoard.innerHTML = '';
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
            document.getElementById('score').innerText = score;
            playMatchSound();
            resetBoard();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.innerText = '';
            secondCard.innerText = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
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

function restartGame() {
    playRestartSound();
    score = 0;
    document.getElementById('score').innerText = score;
    createBoard();
}
