const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const pomodorosEl = document.getElementById("pomodoros");
const pomodoroTimeSelect = document.getElementById("pomodoroTime");
const updateTimeButton = document.getElementById("updateTime");
const confirmTimeButton = document.getElementById("confirmTime");

let interval;
let timeLeft;
let isRunning = false;
let completedPomodoros = 0;
let selectedTime = parseInt(pomodoroTimeSelect.value, 10);

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
                timeLeft = selectedTime;
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
    timeLeft = selectedTime;
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

// Event listener for the "Start" button
startEl.addEventListener("click", startTimer);

// Event listener for the "Stop" button
stopEl.addEventListener("click", stopTimer);

// Event listener for the "Reset" button
resetEl.addEventListener("click", resetTimer);

// Event listener for the space and 'C' keys
document.addEventListener("keydown", handleSpaceKey);

// Event listener for updating the selected time
updateTimeButton.addEventListener("click", () => {
    selectedTime = parseInt(pomodoroTimeSelect.value, 10);
    confirmTimeButton.style.display = "inline-block";
    updateTimeButton.style.display = "none";
});

// Event listener for confirming the selected time
confirmTimeButton.addEventListener("click", () => {
    updateTimeButton.style.display = "inline-block";
    confirmTimeButton.style.display = "none";
    resetTimer();
});

// Initial update of the pomodoros count
updatePomodoros();
