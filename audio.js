/* audio.js */

const flipSound = document.getElementById('flipSound');
const matchSound = document.getElementById('matchSound');
const restartSound = document.getElementById('restartSound');
const backgroundMusic = document.getElementById('backgroundMusic');

// Set background music volume lower to not overpower other effects
backgroundMusic.volume = 0.2;
backgroundMusic.play();

function playFlipSound() {
    flipSound.currentTime = 0; // Reset sound to start
    flipSound.play();
}

function playMatchSound() {
    matchSound.currentTime = 0;
    matchSound.play();
}

function playRestartSound() {
    restartSound.currentTime = 0;
    restartSound.play();
}
