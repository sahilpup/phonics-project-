// =======================
// script.js - Main Logic
// =======================

// --- Global Variables ---
let currentUser = null;
let stars = 0;

// --- Data for Learning ---
const letters = [
  { letter: 'A', word: 'Apple', sound: '🍎' },
  { letter: 'B', word: 'Ball', sound: '⚽' },
  { letter: 'C', word: 'Cat', sound: '🐱' },
  { letter: 'D', word: 'Dog', sound: '🐕' },
  { letter: 'E', word: 'Elephant', sound: '🐘' },
  { letter: 'F', word: 'Fish', sound: '🐠' },
  { letter: 'G', word: 'Grapes', sound: '🍇' },
  { letter: 'H', word: 'House', sound: '🏠' },
  { letter: 'I', word: 'Ice cream', sound: '🍦' },
  { letter: 'J', word: 'Juice', sound: '🧃' },
  { letter: 'K', word: 'Kite', sound: '🪁' },
  { letter: 'L', word: 'Lion', sound: '🦁' },
  { letter: 'M', word: 'Monkey', sound: '🐵' },
  { letter: 'N', word: 'Nest', sound: '🪺' },
  { letter: 'O', word: 'Orange', sound: '🍊' },
  { letter: 'P', word: 'Panda', sound: '🐼' },
  { letter: 'Q', word: 'Queen', sound: '👸' },
  { letter: 'R', word: 'Rabbit', sound: '🐰' },
  { letter: 'S', word: 'Sun', sound: '☀️' },
  { letter: 'T', word: 'Tiger', sound: '🐯' },
  { letter: 'U', word: 'Umbrella', sound: '☂️' },
  { letter: 'V', word: 'Van', sound: '🚐' },
  { letter: 'W', word: 'Whale', sound: '🐋' },
  { letter: 'X', word: 'Xylophone', sound: '🎵' },
  { letter: 'Y', word: 'Yoyo', sound: '🪀' },
  { letter: 'Z', word: 'Zebra', sound: '🦓' }
];

const numbers = [
  { num: 1, word: 'One', emoji: '1️⃣' },
  { num: 2, word: 'Two', emoji: '2️⃣' },
  { num: 3, word: 'Three', emoji: '3️⃣' },
  { num: 4, word: 'Four', emoji: '4️⃣' },
  { num: 5, word: 'Five', emoji: '5️⃣' },
  { num: 6, word: 'Six', emoji: '6️⃣' },
  { num: 7, word: 'Seven', emoji: '7️⃣' },
  { num: 8, word: 'Eight', emoji: '8️⃣' },
  { num: 9, word: 'Nine', emoji: '9️⃣' },
  { num: 10, word: 'Ten', emoji: '🔟' }
];

// --- Smart Text-to-Speech ---
function playSound(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.3;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.toLowerCase().includes('female') ||
      v.name.toLowerCase().includes('child') ||
      v.lang.includes('en-US')
    );
    if (preferred) utterance.voice = preferred;

    window.speechSynthesis.speak(utterance);
  } else {
    alert("Speech not supported in this browser.");
  }
}

// --- Star System ---
function updateStarCount() {
  const starEl = document.getElementById('starCount');
  if (starEl) starEl.textContent = stars;
}

function addStars(amount) {
  stars += amount;
  updateStarCount();
}

// --- Login System ---
function loginUser() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (user && pass) {
    localStorage.setItem('loggedInUser', user);
    window.location.href = "home.html"; // redirect to home
  } else {
    alert("Please enter a valid username and password!");
  }
}

// --- Logout ---
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = "index.html";
}

// --- Check login on load (optional) ---
document.addEventListener('DOMContentLoaded', () => {
  const onHome = window.location.pathname.includes("home.html");
  const user = localStorage.getItem('loggedInUser');

  if (onHome && !user) {
    window.location.href = "index.html"; // force login
  }
  updateStarCount();
});
