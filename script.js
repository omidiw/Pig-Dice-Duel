const MAX_SCORE = 100; // you can change max score if you're willing to play for longer
let activePlayer = 0;
let currentScore = 0;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
player0El.querySelector('.score').textContent = 0;
player1El.querySelector('.score').textContent = 0;

btnRoll.addEventListener('click', updateDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);
function updateDice() {
  const diceNumber = rollDice();
  if (diceNumber === 1) {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    switchPlayer();
  }
  currentScore += diceNumber;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}
function rollDice() {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  return dice;
}
function switchPlayer() {
  // 1. Reset current score on UI
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // 2. Reset JS score variable
  currentScore = 0;

  // 3. Toggle active player (0 -> 1, 1 -> 0)
  activePlayer = activePlayer === 0 ? 1 : 0;

  // 4. Toggle active class
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
function holdScore() {
  const scoreEl = document.getElementById(`score--${activePlayer}`);
  const previousScore = Number(scoreEl.textContent);
  scoreEl.textContent = previousScore + currentScore;
  if (Number(scoreEl.textContent >= 10)) {
    endGame();
    return;
  }
  switchPlayer();
}

function endGame() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  btnRoll.removeEventListener('click', updateDice);
  btnHold.removeEventListener('click', holdScore);
}
function newGame() {
  player0El.querySelector('.score').textContent = 0;
  player1El.querySelector('.score').textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  btnRoll.addEventListener('click', updateDice);
  btnHold.addEventListener('click', holdScore);
}
