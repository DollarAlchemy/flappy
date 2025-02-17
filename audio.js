/* audio.js */

document.addEventListener("DOMContentLoaded", () => {
    const flipSound = document.getElementById('flipSound');
    const matchSound = document.getElementById('matchSound');
    const restartSound = document.getElementById('restartSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (backgroundMusic) {
        backgroundMusic.volume = 0.2; // Lower background music volume
        backgroundMusic.play();
    }

    window.playFlipSound = function() {
        if (flipSound) {
            flipSound.currentTime = 0;
            flipSound.play();
        }
    };

    window.playMatchSound = function() {
        if (matchSound) {
            matchSound.currentTime = 0;
            matchSound.play();
        }
    };

    window.playRestartSound = function() {
        if (restartSound) {
            restartSound.currentTime = 0;
            restartSound.play();
        }
    };
});
