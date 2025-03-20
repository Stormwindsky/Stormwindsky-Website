let selectedWord = '';
let guessedWord = [];
let usedLetters = [];
let attemptsLeft = 6;

const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const wordInput = document.getElementById('word-input');
const startButton = document.getElementById('start-button');
const wordDisplay = document.getElementById('word-display');
const usedLettersDisplay = document.getElementById('used-letters');
const attemptsLeftDisplay = document.getElementById('attempts-left');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');

// Start the game when the word is entered
startButton.addEventListener('click', () => {
    const word = wordInput.value.trim().toLowerCase();
    if (word.length === 0 || !/^[a-z]+$/.test(word)) {
        alert("Please enter a valid word (letters only).");
        return;
    }
    selectedWord = word;
    guessedWord = Array(selectedWord.length).fill('_');
    usedLetters = [];
    attemptsLeft = 6;

    // Hide setup screen and show game screen
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    updateDisplay();
});

// Handle letter guesses
guessButton.addEventListener('click', () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
        message.textContent = "Please enter a valid letter.";
        return;
    }

    if (usedLetters.includes(letter)) {
        message.textContent = "You've already used this letter.";
        return;
    }

    usedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        message.textContent = "Good guess!";
    } else {
        attemptsLeft--;
        message.textContent = "Wrong guess!";
    }

    updateDisplay();
    checkWin();
    checkLose();
});

// Update the game display
function updateDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
    usedLettersDisplay.textContent = usedLetters.join(', ');
    attemptsLeftDisplay.textContent = attemptsLeft;
}

// Check if the player has won
function checkWin() {
    if (!guessedWord.includes('_')) {
        message.textContent = "Congratulations! You won!";
        guessButton.disabled = true;
    }
}

// Check if the player has lost
function checkLose() {
    if (attemptsLeft === 0) {
        message.textContent = `Too bad! The word was "${selectedWord}".`;
        guessButton.disabled = true;
    }
}