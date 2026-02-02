let seconds = 0;
let limit = 25 * 60; // 25 минут
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
      if (seconds >= limit) {
  clearInterval(interval);
  interval = null;

  alert(`Сессия ${currentSessionType} завершена!`);

  saveSession(25); // сохраняем 25 минут
  showStats();
}
    }, 1000);
  }
};

document.getElementById("stop").onclick = () => {
  clearInterval(interval);
  interval = null;

  seconds = 0;
  timer.textContent = "00:00:00";
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
// ===== СОХРАНЕНИЕ СТАТИСТИКИ =====
function saveSession(minutes) {
  const today = new Date().toISOString().slice(0, 10);
  let stats = JSON.parse(localStorage.getItem("stats") || "{}");

  if (!stats[today]) stats[today] = {};
  if (!stats[today][currentSessionType]) {
    stats[today][currentSessionType] = 0;
  }

  stats[today][currentSessionType] += minutes;
  localStorage.setItem("stats", JSON.stringify(stats));
}
function showStats() {
  const statsEl = document.getElementById("stats");
  const stats = JSON.parse(localStorage.getItem("stats") || "{}");

  statsEl.innerHTML = "";

  for (let day in stats) {
    statsEl.innerHTML += `<b>${day}</b><br>`;
    for (let type in stats[day]) {
      statsEl.innerHTML += `${type}: ${stats[day][type]} мин<br>`;
    }
    statsEl.innerHTML += "<br>";
  }

  if (statsEl.innerHTML === "") {
    statsEl.textContent = "Пока нет данных";
  }
}
