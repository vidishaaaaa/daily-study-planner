/* =========================
   DATE
========================= */
function updateDate() {
  document.getElementById("date").innerText =
    "Today: " + new Date().toDateString();
}
updateDate();
setInterval(updateDate, 60000);


/* =========================
   TIME SLOTS
========================= */
const timeSlots = [
  { name: "Morning Study", start: 6, end: 9, minutes: 180 },
  { name: "Office Study", start: 12, end: 18, minutes: 120 },
  { name: "Night Revision", start: 22, end: 23, minutes: 60 }
];

let slotStarted = {
  "Morning Study": false,
  "Office Study": false,
  "Night Revision": false
};


/* =========================
   SUBJECT ROTATION
========================= */
const subjectRotation = ["maths", "reasoning", "science"];

let rotationIndex = Number(localStorage.getItem("rotationIndex") || 0);

function getNextSubject() {
  const subject = subjectRotation[rotationIndex];
  rotationIndex = (rotationIndex + 1) % subjectRotation.length;
  localStorage.setItem("rotationIndex", rotationIndex);
  return subject;
}


/* =========================
   DAY CHECK
========================= */
function isNewDay() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("planDay");

  if (last !== today) {
    localStorage.setItem("planDay", today);
    return true;
  }
  return false;
}

const NEW_DAY = isNewDay();


/* =========================
   LOAD SAVED SYLLABUS
========================= */
const savedSyllabus = localStorage.getItem("syllabus");
if (savedSyllabus) {
  const parsed = JSON.parse(savedSyllabus);
  for (let s in parsed) {
    parsed[s].forEach((t, i) => {
      if (syllabus[s] && syllabus[s][i]) {
        syllabus[s][i].remaining = t.remaining;
      }
    });
  }
}


/* =========================
   HELPERS
========================= */
const scheduleDiv = document.getElementById("schedule");
const alarm = document.getElementById("alarmSound");
const timers = {};

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}


/* =========================
   TOPIC PICKER
========================= */
function getTopicsForSlot(subject, totalMinutes) {
  const topics = [];
  let remainingMinutes = totalMinutes;

  for (let t of syllabus[subject]) {
    if (t.remaining <= 0) continue;

    const used = Math.min(t.remaining * 60, remainingMinutes);
    topics.push({ topic: t.topic, minutes: used });
    remainingMinutes -= used;

    if (remainingMinutes <= 0) break;
  }
  return topics;
}


/* =========================
   RENDER DAILY PLAN (ALWAYS)
========================= */
scheduleDiv.innerHTML = "";

// persist subjects per day
let todaysSubjects = JSON.parse(localStorage.getItem("todaysSubjects") || "null");

if (NEW_DAY || !todaysSubjects) {
  todaysSubjects = {};
  timeSlots.forEach(slot => {
    todaysSubjects[slot.name] = getNextSubject();
  });
  localStorage.setItem("todaysSubjects", JSON.stringify(todaysSubjects));
}

timeSlots.forEach(slot => {
  const subject = todaysSubjects[slot.name];
  const topics = getTopicsForSlot(subject, slot.minutes);

  let list = "";
  topics.forEach(t => {
    list += `<li>${t.topic} – ${t.minutes} min</li>`;
  });

  const div = document.createElement("div");
  div.className = "task";
  div.innerHTML = `
    <h3>${slot.name}</h3>
    <p>Subject: ${subject.toUpperCase()}</p>
    <ul>${list || "<li>Completed 🎉</li>"}</ul>

    <div class="timer" id="${slot.name}-timer">
      ${formatTime(slot.minutes * 60)}
    </div>

    <div class="slot-progress">
      <div class="slot-progress-bar"
           id="${slot.name}-progress"></div>
    </div>

    <button onclick="startTimer('${subject}', ${slot.minutes}, '${slot.name}')">
      ▶ Start
    </button>

    <button onclick="pauseTimer('${slot.name}')">
      ⏸ Pause
    </button>

    <span id="${subject}-status"></span>
  `;
  scheduleDiv.appendChild(div);
});


/* =========================
   STREAK
========================= */
let dailyCompletion = {
  "Morning Study": false,
  "Office Study": false,
  "Night Revision": false
};

let streak = Number(localStorage.getItem("streak") || 0);
document.getElementById("streak").innerText =
  `🔥 Current Streak: ${streak} days`;


function startTimer(subject, minutes, slotName) {
  slotStarted[slotName] = true;

  if (!timers[slotName]) {
    timers[slotName] = {
      total: minutes * 60,      // seconds
      remaining: minutes * 60,  // seconds
      running: false,
      startedAt: null,
      interval: null
    };
  }

  if (timers[slotName].running) return;

  timers[slotName].running = true;
  timers[slotName].startedAt = Date.now();

  timers[slotName].interval = setInterval(() => {
    if (!timers[slotName].running) return;

    // ✅ real elapsed time (tab-safe)
    const elapsedSeconds = Math.floor(
      (Date.now() - timers[slotName].startedAt) / 1000
    );

    const timeLeft =
      timers[slotName].remaining - elapsedSeconds;

    if (timeLeft <= 0) {
      clearInterval(timers[slotName].interval);
      timers[slotName].running = false;
      timers[slotName].remaining = 0;

      // full progress bar
      const bar = document.getElementById(slotName + "-progress");
      if (bar) bar.style.width = "100%";

      // studied time
      const studiedSeconds = timers[slotName].total;
      const studiedHours = studiedSeconds / 3600;

      for (let t of syllabus[subject]) {
        if (t.remaining > 0) {
          t.remaining -= studiedHours;
          if (t.remaining < 0) t.remaining = 0;
          break;
        }
      }

      dailyCompletion[slotName] = true;

      document.getElementById(subject + "-status").innerHTML =
        `✅ Completed (${studiedHours.toFixed(1)}h)`;

      logStudy(subject, studiedHours);
      localStorage.setItem("syllabus", JSON.stringify(syllabus));
      updateProgress();
      checkDailyCompletion();
      return;
    }

    // update UI
    document.getElementById(slotName + "-timer").innerText =
      formatTime(timeLeft);

    const progress =
      ((timers[slotName].total - timeLeft) /
        timers[slotName].total) * 100;

    const bar = document.getElementById(slotName + "-progress");
    if (bar) bar.style.width = progress + "%";

  }, 1000);
}


function pauseTimer(slotName) {
  if (!timers[slotName] || !timers[slotName].running) return;

  // calculate elapsed before pausing
  const elapsedSeconds = Math.floor(
    (Date.now() - timers[slotName].startedAt) / 1000
  );

  timers[slotName].remaining -= elapsedSeconds;
  if (timers[slotName].remaining < 0)
    timers[slotName].remaining = 0;

  timers[slotName].running = false;
  clearInterval(timers[slotName].interval);
}


/* =========================
   PROGRESS BAR
========================= */
function updateProgress() {
  let done = 0, max = 0;
  for (let s in syllabus) {
    syllabus[s].forEach(t => {
      if (!t.initial) t.initial = t.remaining;
      max += t.initial;
      done += (t.initial - t.remaining);
    });
  }
  const percent = Math.floor((done / max) * 100);
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-text").innerText =
    `Syllabus Completed: ${percent}%`;
}


/* =========================
   DAILY COMPLETION
========================= */
function checkDailyCompletion() {
  if (Object.values(dailyCompletion).every(v => v)) {
    streak++;
    localStorage.setItem("streak", streak);
    document.getElementById("streak").innerText =
      `🔥 Current Streak: ${streak} days`;
    alert("🔥 Excellent! All study slots completed.");
  }
}


/* =========================
   ALARM
========================= */
setInterval(() => {
  const now = new Date();
  timeSlots.forEach(slot => {
    if (
      now.getHours() === slot.start &&
      now.getMinutes() <= 1 &&
      !slotStarted[slot.name]
    ) {
      alarm.play();
      alert(`⏰ You have NOT started ${slot.name}!`);
    }
  });
}, 60000);


/* =========================
   DASHBOARD LOG
========================= */
function logStudy(subject, hours) {
  const stats =
    JSON.parse(localStorage.getItem("studyStats") || "{}");

  if (!stats[subject]) stats[subject] = 0;
  stats[subject] += hours;

  localStorage.setItem("studyStats", JSON.stringify(stats));
}

function renderContentBoard() {
  const board = document.getElementById("content-board");
  if (!board) return;

  const ideas =
    JSON.parse(localStorage.getItem("contentIdeas") || "[]");

  if (ideas.length === 0) {
    board.innerHTML = "<p>No content ideas yet 🎥</p>";
    return;
  }

  let html = "<h3>🎬 Content Ideas from Your Study</h3><ul>";

  ideas.slice(-5).reverse().forEach((c, i) => {
    html += `
      <li style="margin-bottom:10px">
        <strong>${c.topic}</strong> (${c.subject.toUpperCase()})<br/>
        👉 ${c.idea}<br/>
        <small>${c.createdAt}</small>
      </li>
    `;
  });

  html += "</ul>";
  board.innerHTML = html;
}

// render on load
renderContentBoard();

