// letters.js - populates ABC grid
const lettersData = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Ball', emoji: '⚽' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐕' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fish', emoji: '🐠' },
    { letter: 'G', word: 'Grapes', emoji: '🍇' },
    { letter: 'H', word: 'House', emoji: '🏠' },
    { letter: 'I', word: 'Ice cream', emoji: '🍦' },
    { letter: 'J', word: 'Juice', emoji: '🧃' },
    { letter: 'K', word: 'Kite', emoji: '🪁' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Monkey', emoji: '🐵' },
    { letter: 'N', word: 'Nest', emoji: '🪺' },
    { letter: 'O', word: 'Orange', emoji: '🍊' },
    { letter: 'P', word: 'Panda', emoji: '🐼' },
    { letter: 'Q', word: 'Queen', emoji: '👸' },
    { letter: 'R', word: 'Rabbit', emoji: '🐰' },
    { letter: 'S', word: 'Sun', emoji: '☀️' },
    { letter: 'T', word: 'Tiger', emoji: '🐯' },
    { letter: 'U', word: 'Umbrella', emoji: '☂️' },
    { letter: 'V', word: 'Van', emoji: '🚐' },
    { letter: 'W', word: 'Whale', emoji: '🐋' },
    { letter: 'X', word: 'Xylophone', emoji: '🎵' },
    { letter: 'Y', word: 'Yoyo', emoji: '🪀' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }
];

function loadABCContent() {
    const grid = document.getElementById('abcGrid');
    if (!grid) return;
    grid.innerHTML = '';
    lettersData.forEach(item => {
        const card = document.createElement('button');
        card.className = 'letter-card';
        card.onclick = () => {
            playSound(`${item.letter} for ${item.word}`);
            addStars(1);
        };
        card.innerHTML = `
            <div class="letter-emoji">${item.emoji}</div>
            <div class="letter-text">${item.letter}</div>
            <div class="letter-word">${item.word}</div>
            <div class="sound-icon">🔊</div>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadABCContent);
