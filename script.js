let seconds = 0;
let total = 0;
let interval = null;

const timer = document.getElementById("timer");
const totalEl = document.getElementById("total");

document.getElementById("start").onclick = () => {
  if (!interval) {
    interval = setInterval(() => {
      seconds++;
      total++;

      let h = Math.floor(seconds / 3600);
      let m = Math.floor((seconds % 3600) / 60);
      let s = seconds % 60;

      timer.textContent =
        `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

      totalEl.textContent = total;
    }, 1000);
  }
};

document.getElementById("stop").onclick = () => {
  clearInterval(interval);
  interval = null;
};
// ===== ВЫБОР ТИПА СЕССИИ =====
let currentSessionType = "Учёба";

const sessionTypeSelect = document.getElementById("sessionType");
sessionTypeSelect.onchange = () => {
  currentSessionType = sessionTypeSelect.value;
};

document.getElementById("reset").onclick = () => {
  seconds = 0;
  timer.textContent = "00:00:00";
};
