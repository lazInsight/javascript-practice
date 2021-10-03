const startBtn = document.querySelector('#startBtn');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
event.preventDefault();

screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
if (event.target.classList.contains('time-btn')) {
  time = parseInt(event.target.getAttribute('data-time'));
  screens[1].classList.add('up');
  startGame();
}
});

board.addEventListener('click', (event) => {
if (event.target.classList.contains('circle')) {
  score++;
  event.target.remove();
  createRandomCircle();
}
});

function startGame() {
setInterval(decreaseTime, 1000);
createRandomCircle();
setTime(time);
}

function decreaseTime() {
if (time === 0) {
  finishGame();
} else {
  let current = --time;
  if (current < 10) {
    current = `0${current}`
  }
  setTime(current);
}
}

function setTime(value) {
timeElement.innerHTML = `00:${value}`;
}

function finishGame() {
board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
timeElement.parentNode.innerHTML = `<div><button class="time-btn" id="play-again">Начать игру заново</button></div>`;
const newGameBtn = document.querySelector('#play-again');
newGameBtn.addEventListener('click', () => {
  location.reload(true);
});
}

function createRandomCircle() {
const circle = document.createElement('div');
const size = getRandomNumber(20, 60);
const { width, height} = board.getBoundingClientRect();
const x = getRandomNumber(0, width - size);
const y = getRandomNumber(0, height - size);

circle.classList.add('circle');
circle.style.width = `${size}px`;
circle.style.height = `${size}px`;
circle.style.top = `${y}px`;
circle.style.left = `${x}px`;

board.append(circle);
}

function getRandomNumber(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}