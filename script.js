const startEl = document.getElementById("start")
const stopEl = document.getElementById("stop")
const resetEl = document.getElementById("reset")
const timerEl = document.getElementById("timer")
const pomodorosEl = document.getElementById("pomodoros") // Assuming you have an HTML element with id "pomodoros"

let interval
let timeLeft = 1500;
let isRunning = false;
let completedPomodoros = 0;

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60)
    let seconds = timeLeft % 60
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
                timeLeft = 1500;
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
    timeLeft = 1500;
    updateTimer();
    isRunning = false;
}

function updatePomodoros() {
    pomodorosEl.innerHTML = `Pomodoros completed: ${completedPomodoros}`;
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);

// Initial update of the pomodoros count
updatePomodoros();
