const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const pomodorosEl = document.getElementById("pomodoros");

let interval;
let initialTime = 1500;
let timeLeft = initialTime;
let isRunning = false;
let completedPomodoros = 0;

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timerEl.innerHTML = formattedTime;
}

function startTimer() {
    if (!isRunning) {
        interval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(interval);
                alert("Time's up!");
                timeLeft = initialTime;
                updateTimer();
                isRunning = false;
                completedPomodoros++;
                updatePomodoros();
            }
        }, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    clearInterval(interval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(interval);
    timeLeft = initialTime;
    updateTimer();
    isRunning = false;
}

function updatePomodoros() {
    pomodorosEl.innerHTML = `Pomodoros completed: ${completedPomodoros}`;
}

function handleSpaceKey(event) {
    if (event.code === 'Space') {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    } else if (event.code === 'KeyC') {
        // Reset timer and clear pomodoro count with 'C' key
        resetTimer();
        completedPomodoros = 0;
        updatePomodoros();
    }
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
document.addEventListener("keydown", handleSpaceKey);

// Initial update of the pomodoros count
updatePomodoros();
