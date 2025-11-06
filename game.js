// List of letters and example words for fun sound hints
const letters = [
  { letter: 'A', word: 'Apple' },
  { letter: 'B', word: 'Ball' },
  { letter: 'C', word: 'Cat' },
  { letter: 'D', word: 'Dog' },
  { letter: 'E', word: 'Elephant' },
  { letter: 'F', word: 'Fish' },
  { letter: 'G', word: 'Goat' },
  { letter: 'H', word: 'Hat' },
  { letter: 'I', word: 'Ice cream' },
  { letter: 'J', word: 'Jug' },
  { letter: 'K', word: 'Kite' },
  { letter: 'L', word: 'Lion' },
  { letter: 'M', word: 'Monkey' },
  { letter: 'N', word: 'Nest' },
  { letter: 'O', word: 'Orange' },
  { letter: 'P', word: 'Parrot' },
  { letter: 'Q', word: 'Queen' },
  { letter: 'R', word: 'Rabbit' },
  { letter: 'S', word: 'Sun' },
  { letter: 'T', word: 'Tiger' },
  { letter: 'U', word: 'Umbrella' },
  { letter: 'V', word: 'Violin' },
  { letter: 'W', word: 'Watch' },
  { letter: 'X', word: 'Xylophone' },
  { letter: 'Y', word: 'Yak' },
  { letter: 'Z', word: 'Zebra' }
];

let score = 0;
let correctLetter = "";

function startGame() {
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";
  document.getElementById("score").textContent = score;

  // Pick a random letter
  const randomItem = letters[Math.floor(Math.random() * letters.length)];
  correctLetter = randomItem.letter;

  // Play letter sound using Speech API (no file needed!)
  const utter = new SpeechSynthesisUtterance(`${correctLetter} for ${randomItem.word}`);
  utter.pitch = 1.2;
  utter.rate = 0.8;
  utter.volume = 1;
  speechSynthesis.speak(utter);

  // Create random button options
  const randomOptions = shuffleLetters(letters).slice(0, 5);
  if (!randomOptions.includes(randomItem)) randomOptions[0] = randomItem;
  shuffleArray(randomOptions);

  randomOptions.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "btn letter-btn";
    btn.textContent = item.letter;
    btn.onclick = () => checkAnswer(item.letter);
    gameArea.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === correctLetter) {
    score += 5;
    playSound("correct");
    showMessage("🎉 Great Job!", "green");
  } else {
    score -= 5;
    playSound("wrong");
    showMessage("❌ Try Again!", "red");
  }

  document.getElementById("score").textContent = score;
  localStorage.setItem("gameScore", score);

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

function shuffleLetters(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ✅ Reset score manually
function resetScore() {
  score = 0;
  localStorage.removeItem("gameScore");
  document.getElementById("score").textContent = score;
  showMessage("🔄 Score Reset!", "blue");
  startGame();
}

// ✅ Reset automatically when tab closes
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("gameScore");
});

window.onload = () => {
  score = parseInt(localStorage.getItem("gameScore")) || 0;
  document.getElementById("score").textContent = score;
  startGame();
};
