// --- Kids Learning Game ---
// Match the correct image or word!

const gameItems = [
  { question: "Which one is an 🍎?", options: ["🍎", "🍌", "🍇", "🍊"], correct: "🍎" },
  { question: "Find number 3️⃣", options: ["1️⃣", "2️⃣", "3️⃣", "4️⃣"], correct: "3️⃣" },
  { question: "Which one is 🐶?", options: ["🐱", "🐰", "🐶", "🐯"], correct: "🐶" },
  { question: "Pick the color 🔵", options: ["🔴", "🟡", "🔵", "🟢"], correct: "🔵" },
  { question: "Which one is a vehicle 🚗?", options: ["🚗", "🍎", "🐶", "🌳"], correct: "🚗" },
  { question: "Find letter A", options: ["B", "C", "A", "D"], correct: "A" }
];

let score = 0;
let currentQuestion = null;

function startGame() {
  const questionBox = document.getElementById("question");
  const optionsBox = document.getElementById("options");
  document.getElementById("score").textContent = score;

  const q = gameItems[Math.floor(Math.random() * gameItems.length)];
  currentQuestion = q;

  questionBox.textContent = q.question;

  // Voice read question
  const speak = new SpeechSynthesisUtterance(q.question.replace(/[^\w\s]/gi, ""));
  speak.pitch = 1.2;
  speak.rate = 0.9;
  speechSynthesis.speak(speak);

  optionsBox.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "btn option-btn";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsBox.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === currentQuestion.correct) {
    score += 10;
    playSound("correct");
    showMessage("🌟 Great job!", "green");
  } else {
    score -= 5;
    playSound("wrong");
    showMessage("❌ Try again!", "red");
  }

  localStorage.setItem("gameScore", score);
  document.getElementById("score").textContent = score;

  setTimeout(() => startGame(), 1500);
}

function playSound(type) {
  const sound = new Audio();
  sound.src = type === "correct"
    ? "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
    : "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg";
  sound.play();
}

function showMessage(text, color) {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.className = "message";
  msg.style.color = color;
  msg.style.fontSize = "1.5em";
  msg.style.position = "fixed";
  msg.style.top = "50%";
  msg.style.left = "50%";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.background = "white";
  msg.style.padding = "10px 20px";
  msg.style.borderRadius = "10px";
  msg.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1000);
}

// Reset score when tab closes or reloads
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("gameScore");
});

window.onload = () => {
  localStorage.removeItem("gameScore");
  score = 0;
  document.getElementById("score").textContent = score;
  startGame();
};
