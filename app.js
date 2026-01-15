document.getElementById("date").innerText =
  "Today: " + new Date().toDateString();

/* =========================
   FIXED TIME SLOTS
========================= */
const slotStarted = {
  "Morning Study": false,
  "Office Study": false,
  "Night Revision": false
};
const timeSlots = [
  { name: "Morning Study", start: 6, end: 9, minutes: 180 },
  { name: "Office Study", start: 12, end: 18, minutes: 120 },
  { name: "Night Revision", start: 22, end: 23, minutes: 60 }
];


setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  timeSlots.forEach(slot => {
    // alarm exactly at slot start (±1 min window)
    if (
      hour === slot.start &&
      minute <= 1 &&
      !slotStarted[slot.name]
    ) {
      alarm.play();
      alert(`⏰ ALERT: You have NOT started ${slot.name}!`);
    }

    if (
  hour > slot.end &&
  !slotStarted[slot.name] &&
  !dailyCompletion[slot.name]
) {
  streak = 0;
  localStorage.setItem("streak", 0);

  document.getElementById("streak").innerText =
    "🔥 Current Streak: 0 days";
}

  });
}, 60000); // check every 1 minute



/* =========================
   SUBJECT ROTATION (ALL)
========================= */

const subjectRotation = [
  "maths",
  "reasoning",
  "science",
  "staticGK",
  "polity",
  "history",
  "economics",
  "geography",
  "biharGK",
  "currentAffairs"
];

let rotationIndex = 0;

function getNextSubject() {
  const subject = subjectRotation[rotationIndex];
  rotationIndex = (rotationIndex + 1) % subjectRotation.length;
  return subject;
}

/* =========================
   FULL SYLLABUS (SHORTENED SAMPLE)
   👉 You already pasted full data earlier
========================= */

const syllabus = {
  maths: [
    { topic: "Interest", remaining: 8 },
    { topic: "Time & Work", remaining: 6 },
    { topic: "Speed, Time & Distance", remaining: 7 },
    { topic: "Number System", remaining: 10 },
    { topic: "Square - Square Roots", remaining: 3 },
    { topic: "Indices & Surds", remaining: 3 },
    { topic: "Decimal & Fraction", remaining: 3 },
    { topic: "Simplification", remaining: 4 },
    { topic: "Percentage", remaining: 7 },
    { topic: "Profit & Loss", remaining: 8 },
    { topic: "L.C.M. & H.C.F.", remaining: 5 },
    { topic: "Algebra", remaining: 5 },
    { topic: "Mensuration", remaining: 3 }
  ],

  reasoning: [
    { topic: "Syllogism", remaining: 2 },
    { topic: "Statement & Conclusion", remaining: 1 },
    { topic: "Statement & Assumption", remaining: 1 },
    { topic: "Assertion & Reason", remaining: 1 },
    { topic: "Mirror Images & Water Image", remaining: 2 },
    { topic: "Paper Cutting", remaining: 1 },
    { topic: "Counting Figure", remaining: 2 },
    { topic: "Non Verbal Series", remaining: 1 },
    { topic: "Dice", remaining: 2 },
    { topic: "Venn Diagram", remaining: 2 },
    { topic: "Arithmetical Reasoning", remaining: 3 },
    { topic: "Problem Solving", remaining: 2 },
    { topic: "Coding Decoding", remaining: 4 },
    { topic: "Series", remaining: 4 },
    { topic: "Analogy", remaining: 3 },
    { topic: "Classification", remaining: 2 },
    { topic: "Calendar", remaining: 4 }
  ],

  staticGK: [
    { topic: "Organizations", remaining: 6 },
    { topic: "Art & Culture", remaining: 7 },
    { topic: "Books & Authors", remaining: 1 },
    { topic: "Country, Currency & Parliament", remaining: 2 },
    { topic: "Important Days & Theme", remaining: 4 },
    { topic: "State Special", remaining: 4 },
    { topic: "First in India & World", remaining: 2 },
    { topic: "National Schemes", remaining: 2 },
    { topic: "Award", remaining: 6 },
    { topic: "Sports", remaining: 2 },
    { topic: "Environment & Ecology", remaining: 8 },
    { topic: "Dance", remaining: 6 },
    { topic: "Festival", remaining: 1 }
  ],

  science: [
    { topic: "Environment", remaining: 2 },
    { topic: "Nutrition", remaining: 1 },
    { topic: "Vitamin & Mineral", remaining: 2 },
    { topic: "Human Digestive System", remaining: 3 },
    { topic: "Human Circulatory System", remaining: 3 },
    { topic: "Nervous System", remaining: 2 },
    { topic: "Endocrine System", remaining: 2 },
    { topic: "Skeleton System", remaining: 2 },
    { topic: "Reproductive System", remaining: 3 },
    { topic: "Excretory System", remaining: 2 },
    { topic: "Respiratory System", remaining: 2 },
    { topic: "Cell", remaining: 2 },
    { topic: "Human Disease", remaining: 3 },
    { topic: "Plant Hormone", remaining: 1 },
    { topic: "Genetics", remaining: 2 },
    { topic: "Diversity in Living Organisms", remaining: 4 },
    { topic: "Matter in our Surrounding", remaining: 2 },
    { topic: "Structure of an Atom", remaining: 1 },
    { topic: "Periodic Table", remaining: 2 },
    { topic: "Chemical Reaction & Equation", remaining: 2 },
    { topic: "Carbon & Its Compound", remaining: 2 },
    { topic: "Acid, Base & Salts", remaining: 2 },
    { topic: "Metals & Non - Metals", remaining: 2 },
    { topic: "Chemistry in Everyday Life", remaining: 2 },
    { topic: "Basic Concept of Chemistry", remaining: 1 },
    { topic: "Units & Dimension", remaining: 2 },
    { topic: "Measuring Instruments", remaining: 1 },
    { topic: "Optics", remaining: 4 },
    { topic: "Human Eye", remaining: 1 },
    { topic: "Motion", remaining: 1 },
    { topic: "Laws of Motion", remaining: 2 },
    { topic: "Work, Energy & Power", remaining: 2 },
    { topic: "Heat & Thermodynamics", remaining: 2 },
    { topic: "Gravitation", remaining: 1 },
    { topic: "Fluid & Friction", remaining: 3 },
    { topic: "Electricity", remaining: 3 },
    { topic: "Magnetism", remaining: 2 },
    { topic: "Cell Division", remaining: 1 },
    { topic: "Plant Tissue", remaining: 1 },
    { topic: "Animal Tissue", remaining: 2 },
    { topic: "Human Heart", remaining: 1 }
  ],

  history: [
    { topic: "Marathas", remaining: 2 },
    { topic: "Vijay Nagar Empire", remaining: 2 },
    { topic: "Bhakti Movement", remaining: 1 },
    { topic: "Indus Valley Civilization", remaining: 3 },
    { topic: "Vedic Age", remaining: 3 },
    { topic: "Mahajanapadas", remaining: 1 },
    { topic: "Buddhism", remaining: 1 },
    { topic: "Jainism", remaining: 1 },
    { topic: "Buddhism & Jainism Similarities / Differences", remaining: 1 },
    { topic: "Haryanka & Shishunaga Dynasty", remaining: 1 },
    { topic: "Nanda Dynasty & Pre Mauryan Period", remaining: 1 },
    { topic: "Mauryan Period", remaining: 1 },
    { topic: "Post Mauryan Period", remaining: 1 },
    { topic: "Post Mauryan Period & Pre Gupta Period", remaining: 1 },
    { topic: "Gupta Period", remaining: 3 },
    { topic: "Sangam Period", remaining: 1 },
    { topic: "Cholas, Cheras & Pandyas", remaining: 1 },
    { topic: "Pre History, Proto History & History", remaining: 1 },
    { topic: "Arrival of Europeans", remaining: 3 },
    { topic: "Battle of Plassey & Buxar", remaining: 2 },
    { topic: "Mysore, Subsidiary Alliance", remaining: 2 },
    { topic: "Maratha Wars", remaining: 2 },
    { topic: "Sikh", remaining: 1 },
    { topic: "Doctrine of Lapse", remaining: 1 },
    { topic: "Land Revenue System", remaining: 1 },
    { topic: "Socio-Religious Reforms", remaining: 3 },
    { topic: "1857 Revolt", remaining: 2 },
    { topic: "National Movement", remaining: 13 },
    { topic: "Arabic & Turkish Invasion of India", remaining: 1 },
    { topic: "Delhi Sultanate", remaining: 5 },
    { topic: "Mughal Dynasty", remaining: 7 },
    { topic: "Sur Dynasty", remaining: 1 }
  ],

  currentAffairs: [
    { topic: "Current Affairs", remaining: 14 }
  ],

  biharGK: [
    { topic: "Bihar : An Introduction", remaining: 1 },
    { topic: "History of Bihar", remaining: 6 },
    { topic: "Geography of Bihar", remaining: 5 },
    { topic: "Polity of Bihar", remaining: 3 },
    { topic: "Economy of Bihar", remaining: 1 },
    { topic: "Agriculture in Bihar", remaining: 1 },
    { topic: "Census of Bihar", remaining: 1 },
    { topic: "Art & Culture in Bihar (Folk Drama, Folk Dance, Folk Songs)", remaining: 1 },
    { topic: "Major Fairs & Festivals of Bihar", remaining: 1 },
    { topic: "National Parks & Wildlife Sanctuaries in Bihar", remaining: 1 },
    { topic: "Minerals in Bihar", remaining: 1 }
  ],

  geography: [
    { topic: "Geographical Introduction of India", remaining: 5 },
    { topic: "Hill Region of the North", remaining: 4 },
    { topic: "Peninsular India", remaining: 2 },
    { topic: "Plateaus of India", remaining: 1 },
    { topic: "Major Rivers of India", remaining: 6 },
    { topic: "Lakes of India", remaining: 1 },
    { topic: "Waterfalls of India", remaining: 1 },
    { topic: "India's Multipurpose Project", remaining: 1 },
    { topic: "Mineral Resources", remaining: 2 },
    { topic: "Energy Resources", remaining: 2 },
    { topic: "Major Industries", remaining: 1 },
    { topic: "Forest Resources Report", remaining: 1 },
    { topic: "Agriculture of India", remaining: 1 },
    { topic: "Tribes of India", remaining: 1 },
    { topic: "Major Rivers of the World", remaining: 1 },
    { topic: "Major Mountains of the World", remaining: 1 },
    { topic: "Major International Borders of the World", remaining: 1 },
    { topic: "Solar System", remaining: 1 }
  ],

  polity: [
    { topic: "Constitutional History", remaining: 2 },
    { topic: "Cabinet Mission", remaining: 1 },
    { topic: "Constitution Assembly", remaining: 1 },
    { topic: "Parts of Constitution", remaining: 1 },
    { topic: "Schedules", remaining: 1 },
    { topic: "Union of India", remaining: 1 },
    { topic: "Citizenship", remaining: 2 },
    { topic: "Fundamental Rights", remaining: 4 },
    { topic: "DPSP", remaining: 2 },
    { topic: "Fundamental Duties", remaining: 1 },
    { topic: "President", remaining: 2 },
    { topic: "Vice President", remaining: 1 },
    { topic: "Prime Minister", remaining: 2 },
    { topic: "Attorney General", remaining: 1 },
    { topic: "Parliament", remaining: 5 },
    { topic: "Governor", remaining: 1 },
    { topic: "Chief Minister", remaining: 1 },
    { topic: "State Legislature", remaining: 3 },
    { topic: "Supreme Court", remaining: 2 },
    { topic: "High Court", remaining: 2 },
    { topic: "Centre State Relation", remaining: 3 },
    { topic: "All India Service", remaining: 1 },
    { topic: "UPSC", remaining: 1 },
    { topic: "Election Commission", remaining: 1 },
    { topic: "Official Language", remaining: 1 },
    { topic: "Emergency Provision", remaining: 1 },
    { topic: "Commissions", remaining: 1 },
    { topic: "Panchayati Raj", remaining: 3 }
  ],

  economics: [
    { topic: "Type of Market", remaining: 1 },
    { topic: "Inflation & Its Related Terms", remaining: 2 },
    { topic: "Poverty", remaining: 1 },
    { topic: "Unemployment", remaining: 1 },
    { topic: "Indian Banking System", remaining: 2 },
    { topic: "Reserve Bank of India", remaining: 2 },
    { topic: "Monetary Policy", remaining: 2 },
    { topic: "Basics of Economics", remaining: 2 },
    { topic: "Economic Planning in India", remaining: 2 },
    { topic: "Niti Aayog", remaining: 1 },
    { topic: "Public Finance of India (Budget)", remaining: 2 },
    { topic: "National Income", remaining: 2 },
    { topic: "Money Market", remaining: 1 },
    { topic: "Capital Market", remaining: 2 },
    { topic: "Currency", remaining: 1 },
    { topic: "Census", remaining: 2 },
    { topic: "Agriculture", remaining: 1 },
    { topic: "Banking Terminology", remaining: 1 },
    { topic: "Agriculture", remaining: 1 }
  ]
};



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
   MULTI-TOPIC SLOT LOGIC
========================= */

function getTopicsForSlot(subject, totalMinutes) {
  const topics = [];
  let remainingMinutes = totalMinutes;

  for (let t of syllabus[subject] || []) {
    if (t.remaining <= 0) continue;

    const used = Math.min(t.remaining * 60, remainingMinutes);
    topics.push({ topic: t.topic, minutes: used });
    remainingMinutes -= used;

    if (remainingMinutes <= 0) break;
  }

  return topics;
}

/* =========================
   RENDER DAILY PLAN
========================= */

timeSlots.forEach(slot => {
  const subject = getNextSubject();
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
<div class="timer" id="${slot.name}-timer">${formatTime(slot.minutes*60)}</div>

    <button class="start" onclick="startTimer('${subject}', ${slot.minutes}, '${slot.name}')">
  ▶ Start
</button>


    <button class="pause" onclick="pauseTimer('${subject}')">⏸ Pause</button>
    <span id="${subject}-status"></span>
  `;

  scheduleDiv.appendChild(div);
});

let dailyCompletion = {
  "Morning Study": false,
  "Office Study": false,
  "Night Revision": false
};

let streak = localStorage.getItem("streak")
  ? Number(localStorage.getItem("streak"))
  : 0;

document.getElementById("streak").innerText =
  `🔥 Current Streak: ${streak} days`;


/* =========================
   TIMER LOGIC
========================= */
function updateProgress() {
  let total = 0;
  let completed = 0;

  for (let subject in syllabus) {
    syllabus[subject].forEach(t => {
      total += t.remaining + (t.initial || 0);
    });
  }

  // calculate using initial snapshot
  let done = 0;
  let max = 0;

  for (let subject in syllabus) {
    syllabus[subject].forEach(t => {
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

function startTimer(subject, minutes, slotName) {
  slotStarted[slotName] = true;

  if (!timers[slotName]) {
    timers[slotName] = {
      remaining: minutes * 60,
      running: false,
      startTime: null,
      interval: null
    };
  }

  if (timers[slotName].running) return;

  timers[slotName].running = true;
  timers[slotName].startTime = Date.now();

  timers[slotName].interval = setInterval(() => {
    const elapsed = Math.floor(
      (Date.now() - timers[slotName].startTime) / 1000
    );

    const timeLeft = timers[slotName].remaining - elapsed;

    if (timeLeft <= 0) {
      clearInterval(timers[slotName].interval);
      timers[slotName].running = false;
      timers[slotName].remaining = 0;

      document.getElementById(slotName + "-timer").innerText = "00:00";

      document.getElementById(subject + "-status").innerHTML =
        `<span class="done">✅ Completed</span>`;

      updateProgress();
      dailyCompletion[slotName] = true;
      checkDailyCompletion();
      return;
    }

    document.getElementById(slotName + "-timer").innerText =
      formatTime(timeLeft);

  }, 1000);
}


function pauseTimer(slotName) {
  if (!timers[slotName] || !timers[slotName].running) return;

  clearInterval(timers[slotName].interval);

  const elapsed = Math.floor(
    (Date.now() - timers[slotName].startTime) / 1000
  );

  timers[slotName].remaining -= elapsed;
  if (timers[slotName].remaining < 0)
    timers[slotName].remaining = 0;

  timers[slotName].running = false;
}



/* =========================
   ALARM IF NOT STARTED
========================= */



function checkDailyCompletion() {
  const allDone = Object.values(dailyCompletion).every(v => v === true);

  if (allDone) {
    streak++;
    localStorage.setItem("streak", streak);

    document.getElementById("streak").innerText =
      `🔥 Current Streak: ${streak} days`;

    alert("🔥 Excellent! All study slots completed today.");
  }
}

function resetDailyState() {
  const today = new Date().toDateString();
  const lastDay = localStorage.getItem("lastDay");

  if (lastDay !== today) {
    localStorage.setItem("lastDay", today);

    dailyCompletion = {
      "Morning Study": false,
      "Office Study": false,
      "Night Revision": false
    };

    slotStarted["Morning Study"] = false;
    slotStarted["Office Study"] = false;
    slotStarted["Night Revision"] = false;
  }
}

resetDailyState();
 