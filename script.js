document.addEventListener("DOMContentLoaded", function () {
    const startEl = document.getElementById("start");
    const stopEl = document.getElementById("stop");
    const resetEl = document.getElementById("reset");
    const timerEl = document.getElementById("timer");
    const pomodorosEl = document.getElementById("pomodoros");
    const pomodoroTimeSelect = document.getElementById("pomodoroTime");
    const updateTimeButton = document.getElementById("updateTime");
    const confirmTimeButton = document.getElementById("confirmTime");
    const progressBar = document.getElementById("progressBar");
    const progressBarGoals = [0, 25, 50, 75, 100];

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

    function updateProgressBar() {
        const totalTime = selectedTime;
        const elapsedTime = totalTime - timeLeft;
        const percentage = (elapsedTime / totalTime) * 100;
        progressBar.style.width = `${percentage}%`;

        for (const goal of progressBarGoals) {
            if (percentage >= goal) {
                progressBar.style.backgroundColor = getGoalColor(goal);
            }
        }
    }

    function getGoalColor(goal) {
        if (goal === 0) return "#FF6347"; // Red
        if (goal === 25) return "#FFD700"; // Gold
        if (goal === 50) return "#32CD32"; // Lime Green
        if (goal === 75) return "#1E90FF"; // Dodger Blue
        if (goal === 100) return "#00FF00"; // Green
        return "#4CAF50"; // Default Green
    }

    function startTimer() {
        if (!isRunning) {
            hideElements();

            timeLeft = selectedTime;
            progressBar.style.width = "0%";
            updateTimer();

            interval = setInterval(() => {
                timeLeft--;
                updateTimer();
                updateProgressBar();

                if (timeLeft === 0) {
                    clearInterval(interval);
                    alert("Time's up!");
                    timeLeft = selectedTime;
                    updateTimer();
                    isRunning = false;
                    completedPomodoros++;
                    updatePomodoros();
                    showElements();
                }
            }, 1000);
            isRunning = true;
        }
    }

    function stopTimer() {
        clearInterval(interval);
        isRunning = false;
        showElements();
    }

    function resetTimer() {
        clearInterval(interval);
        timeLeft = selectedTime;
        updateTimer();
        progressBar.style.width = "0%";
        isRunning = false;
        showElements();
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
            resetTimer();
            completedPomodoros = 0;
            updatePomodoros();
        }
    }

    function hideElements() {
        document.getElementById("pomodoroTime").style.display = "none";
        document.getElementById("updateTime").style.display = "none";
        document.getElementById("confirmTime").style.display = "none";
        document.getElementById("pomodoros").style.display = "none";
    }

    function showElements() {
        document.getElementById("pomodoroTime").style.display = "inline-block";
        document.getElementById("updateTime").style.display = "inline-block";
        document.getElementById("confirmTime").style.display = "inline-block";
        document.getElementById("pomodoros").style.display = "block";
    }

    startEl.addEventListener("click", startTimer);
    stopEl.addEventListener("click", stopTimer);
    resetEl.addEventListener("click", resetTimer);
    document.addEventListener("keydown", handleSpaceKey);

    updateTimeButton.addEventListener("click", () => {
        selectedTime = parseInt(pomodoroTimeSelect.value, 10);
        confirmTimeButton.style.display = "inline-block";
        updateTimeButton.style.display = "none";
    });

    confirmTimeButton.addEventListener("click", () => {
        updateTimeButton.style.display = "inline-block";
        confirmTimeButton.style.display = "none";
        resetTimer();
    });

    updatePomodoros();
});
