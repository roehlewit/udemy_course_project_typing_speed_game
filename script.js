const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultyselect = document.getElementById('difficulty');

//list of words for game
const words = [
    'type',
    'finger',
    'dumpling',
    'fire',
    'toast',
    'nuts',
    'couch',
    'timer',
    'fix',
    'difficult',
    'dogma',
    'rare',
    'nightmare',
    'halloween',
    'creepy',
    'pumpkin',
    'patch',
];

// Init word
let randomWord;

//Init score
let score = 0;

//init time
let time = 10;

//set difficulty to value in ls or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// set difficulty select value
difficultyselect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//focus on text on page load
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);


//generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random()* words.length)];
}

//Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//update score
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

//update Time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        //endgame
        gameOver();
    }
}

//Game Over 
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out </h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listener

//typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        //clear 
        e.target.value = '';

       if(difficulty === 'hard') {
        time += 2
       } else if (difficulty === 'medium'){
        time += 3
       } else {
           time += 5;
       }

        updateTime();
    }
});

//settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});