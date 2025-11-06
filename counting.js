// counting.js
// Expose functions to global scope for inline onclick handlers
window.loadNumbersContent = function() {
  const grid = document.getElementById('numbersGrid');
  if (!grid) return;

  // If you already have `numbers` defined in script.js, use it.
  // Otherwise define here as fallback:
  const numbersList = (typeof numbers !== 'undefined') ? numbers : [
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

  grid.innerHTML = '';

  numbersList.forEach((item) => {
    const card = document.createElement('button');
    card.className = 'number-card';
    card.type = 'button';
    card.onclick = () => {
      // Use global playSound() and addStars() from script.js
      if (typeof playSound === 'function') {
        playSound(`Number ${item.num}, ${item.word}`);
      }
      if (typeof addStars === 'function') addStars(1);
    };

    card.innerHTML = `
      <div class="number-emoji">${item.emoji}</div>
      <div class="number-text">${item.num}</div>
      <div class="number-word">${item.word}</div>
      <div class="sound-icon">🔊</div>
    `;
    grid.appendChild(card);
  });
};

// Auto-run when page loads (safe even if included in other pages)
document.addEventListener('DOMContentLoaded', () => {
  // Only run on pages that have #numbersGrid
  if (document.getElementById('numbersGrid')) {
    window.loadNumbersContent();
  }
});
