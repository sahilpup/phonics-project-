// admin.js - admin panel functions
const adminLetters = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Ball', emoji: '⚽' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐕' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' }
];
const adminNumbers = [
    { num: 1, word: 'One', emoji: '1️⃣' },
    { num: 2, word: 'Two', emoji: '2️⃣' },
    { num: 3, word: 'Three', emoji: '3️⃣' }
];

function loadLettersList(){
    const list = document.getElementById('lettersList');
    if(!list) return;
    list.innerHTML = '';
    adminLetters.forEach((item,idx)=>{
        const div = document.createElement('div');
        div.className='admin-item';
        div.innerHTML = `<span class="admin-item-text">${item.letter} - ${item.word} ${item.emoji}</span><button onclick="editAdmin('letter',${idx})" class="btn-edit">Edit</button>`;
        list.appendChild(div);
    });
}

function loadNumbersList(){
    const list = document.getElementById('numbersList');
    if(!list) return;
    list.innerHTML = '';
    adminNumbers.forEach((item,idx)=>{
        const div = document.createElement('div');
        div.className='admin-item';
        div.innerHTML = `<span class="admin-item-text">${item.num} - ${item.word} ${item.emoji}</span><button onclick="editAdmin('number',${idx})" class="btn-edit">Edit</button>`;
        list.appendChild(div);
    });
}

function editAdmin(type, idx){
    const modal = document.getElementById('editModal');
    const form = document.getElementById('modalForm');
    const title = document.getElementById('modalTitle');
    if(type==='letter'){
        const item = adminLetters[idx];
        title.textContent='Edit Letter';
        form.innerHTML=`<input id="eLetter" class="input-field" value="${item.letter}"><input id="eWord" class="input-field" value="${item.word}"><input id="eEmoji" class="input-field" value="${item.emoji}">`;
    } else {
        const item = adminNumbers[idx];
        title.textContent='Edit Number';
        form.innerHTML=`<input id="eNum" class="input-field" value="${item.num}"><input id="eWord" class="input-field" value="${item.word}"><input id="eEmoji" class="input-field" value="${item.emoji}">`;
    }
    modal.classList.remove('hidden');
    modal.dataset.type=type;
    modal.dataset.idx=idx;
}

function saveEdit(){
    const modal = document.getElementById('editModal');
    const type = modal.dataset.type;
    const idx = parseInt(modal.dataset.idx);
    if(type==='letter'){
        adminLetters[idx].letter = document.getElementById('eLetter').value;
        adminLetters[idx].word = document.getElementById('eWord').value;
        adminLetters[idx].emoji = document.getElementById('eEmoji').value;
        loadLettersList();
    } else {
        adminNumbers[idx].num = parseInt(document.getElementById('eNum').value);
        adminNumbers[idx].word = document.getElementById('eWord').value;
        adminNumbers[idx].emoji = document.getElementById('eEmoji').value;
        loadNumbersList();
    }
    modal.classList.add('hidden');
    alert('Saved');
}

function closeModal(){ document.getElementById('editModal').classList.add('hidden'); }
document.addEventListener('DOMContentLoaded', ()=>{
    loadLettersList();
    loadNumbersList();
});
