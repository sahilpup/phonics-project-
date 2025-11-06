// --- Load data or set default ---
let letters = JSON.parse(localStorage.getItem("letters")) || [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Ball", emoji: "⚽" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" }
];

let numbers = JSON.parse(localStorage.getItem("numbers")) || [
  { num: 1, word: "One", emoji: "1️⃣" },
  { num: 2, word: "Two", emoji: "2️⃣" },
  { num: 3, word: "Three", emoji: "3️⃣" },
  { num: 4, word: "Four", emoji: "4️⃣" }
];

// --- Save Data Helper ---
function saveData() {
  localStorage.setItem("letters", JSON.stringify(letters));
  localStorage.setItem("numbers", JSON.stringify(numbers));
}

// --- Display Lists ---
function loadLettersList() {
  const container = document.getElementById("lettersList");
  container.innerHTML = `
    <button class="btn btn-user" onclick="openAddLetter()">➕ Add New Letter</button>
  `;

  letters.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "admin-item";
    div.innerHTML = `
      <span class="admin-item-text">${item.letter} - ${item.word} ${item.emoji}</span>
      <div>
        <button class="btn-edit" onclick="editLetter(${i})">Edit</button>
        <button class="btn-cancel" onclick="deleteLetter(${i})">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function loadNumbersList() {
  const container = document.getElementById("numbersList");
  container.innerHTML = `
    <button class="btn btn-user" onclick="openAddNumber()">➕ Add New Number</button>
  `;

  numbers.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "admin-item";
    div.innerHTML = `
      <span class="admin-item-text">${item.num} - ${item.word} ${item.emoji}</span>
      <div>
        <button class="btn-edit" onclick="editNumber(${i})">Edit</button>
        <button class="btn-cancel" onclick="deleteNumber(${i})">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// --- Add/Edit/Delete for Letters ---
function openAddLetter() {
  const letter = prompt("Enter Letter (A-Z):");
  const word = prompt("Enter Word (like Apple):");
  const emoji = prompt("Enter Emoji (🍎):");
  if (letter && word && emoji) {
    letters.push({ letter, word, emoji });
    saveData();
    loadLettersList();
  }
}

function editLetter(index) {
  const item = letters[index];
  const letter = prompt("Edit Letter:", item.letter);
  const word = prompt("Edit Word:", item.word);
  const emoji = prompt("Edit Emoji:", item.emoji);
  if (letter && word && emoji) {
    letters[index] = { letter, word, emoji };
    saveData();
    loadLettersList();
  }
}

function deleteLetter(index) {
  if (confirm("Delete this letter?")) {
    letters.splice(index, 1);
    saveData();
    loadLettersList();
  }
}

// --- Add/Edit/Delete for Numbers ---
function openAddNumber() {
  const num = prompt("Enter Number (1-10):");
  const word = prompt("Enter Word (like One):");
  const emoji = prompt("Enter Emoji (1️⃣):");
  if (num && word && emoji) {
    numbers.push({ num: parseInt(num), word, emoji });
    saveData();
    loadNumbersList();
  }
}

function editNumber(index) {
  const item = numbers[index];
  const num = prompt("Edit Number:", item.num);
  const word = prompt("Edit Word:", item.word);
  const emoji = prompt("Edit Emoji:", item.emoji);
  if (num && word && emoji) {
    numbers[index] = { num: parseInt(num), word, emoji };
    saveData();
    loadNumbersList();
  }
}

function deleteNumber(index) {
  if (confirm("Delete this number?")) {
    numbers.splice(index, 1);
    saveData();
    loadNumbersList();
  }
}

// --- Initialize ---
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lettersList")) loadLettersList();
  if (document.getElementById("numbersList")) loadNumbersList();
});
