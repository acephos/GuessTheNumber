'use strict';
let secretNumber;
let score;
let highscore = 0;
let finished;
const element = selector => document.querySelector(selector);
const message = text => { element('.message').textContent = text; };

function reset() {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  finished = false;
  message('Start guessing...');
  element('.score').textContent = score;
  element('.guess').value = '';
  element('.guess').disabled = false;
  element('.check').disabled = false;
  element('body').style.backgroundColor = '#222';
  element('.number').style.width = '15rem';
  element('.number').textContent = '?';
}
function finish() {
  finished = true;
  element('.check').disabled = true;
  element('.guess').disabled = true;
}
element('.check').addEventListener('click', () => {
  if (finished) return;
  const guess = Number(element('.guess').value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
    message('Enter a whole number between 1 and 20.');
    return;
  }
  if (guess === secretNumber) {
    message('🎉 Correct! Press Again! to reset.');
    element('.number').textContent = secretNumber;
    element('body').style.backgroundColor = '#60b347';
    element('.number').style.width = '35rem';
    highscore = Math.max(highscore, score);
    element('.highscore').textContent = highscore;
    finish();
    return;
  }
  score = Math.max(0, score - 1);
  element('.score').textContent = score;
  if (score === 0) {
    message('☠️ Game over! Press Again! to reset.');
    element('body').style.backgroundColor = '#8B0000';
    finish();
  } else message(guess > secretNumber ? '⬆️ Too high! Try lower.' : '⬇️ Too low! Try higher.');
});
element('.guess').addEventListener('keydown', event => {
  if (event.key === 'Enter') element('.check').click();
});
element('.again').addEventListener('click', reset);
reset();
