
let firstSelected = document.getElementById("imageContainer6");
let isLocked = false;
let score = 0;
let gameOver = false;
const images = [ "Enton.png", "gengar.png", "pikatchu.png", "pumeluff.png", "relaxo.png", "shiggy.png"];


// Funktion für Overlay für Regeln schließen
function closeOverlay() {
    document.getElementById("rules").style.display = "none";
}

// Beim Start drücken = Spiel beginn
document.getElementById("rules").addEventListener("click", function() {
    closeOverlay();
    resetTimer();
    startTimer();
});

// Zufällige Bilder setzen
function setRandomImages() {

    let shuffledImages = [...images].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`imageContainer${i}`).innerHTML = `<img src="${shuffledImages[i - 1]}" alt="Random Image">`;
    }
}
setRandomImages();


// Vergleichen

        
function selectImage(element) {
    if (gameOver) return;
    if (isLocked) return;
    if (!firstSelected) {
        firstSelected = element;
        return;
    }
    
const img1 = firstSelected.querySelector("img").src.split('/').pop();
const img2 = element.querySelector("img").src.split('/').pop();

    if (img1 === img2) {
        document.getElementById("result").textContent = "Die Bilder sind identisch!";
        score++;
        document.getElementById("score").textContent = score;
        stopTimer();
        startCountdown();

        if (score === 5) {
            document.getElementById("winMessage").style.display = "block";
            gameOver = true;
            return;
        }

    } else {
        document.getElementById("result").textContent = "Die Bilder sind unterschiedlich! Bitte erneut auswählen.";
        isLocked = true;
        setTimeout(() => {
            isLocked = false;
            firstSelected = null;
        }, 1000);
    }

    firstSelected = null;
}

function startCountdown(callback) {

    let count = 3;
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    overlay.textContent = count;
    
    const countdown = setInterval(() => {
        count--;
        overlay.textContent = count;
        if (count < 0) {
            clearInterval(countdown);
            startTimer();
            setRandomImages();
            overlay.style.display = "none";
            if (callback) callback();
        }
    }, 1000);
}

// GameOver

// Time 

let startTime;
let running = false;
let interval;

function startTimer() {
    if (gameOver) return;
    if (!running) {
        startTime = performance.now() - (startTime || 0);
        interval = setInterval(updateTimer, 10);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(interval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    document.getElementById("timer").innerText = "0.000 s";
    startTime = 0;
    running = false;
}

function updateTimer() {
    let elapsedTime = (performance.now() - startTime) / 1000;
    document.getElementById("timer").innerText = elapsedTime.toFixed(3) + " s";
}
