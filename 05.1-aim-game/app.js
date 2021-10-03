const screens = [...document.querySelectorAll('.screen')];
const startGameBtn = document.querySelector('#start-game-btn');
const timeBtns = document.querySelectorAll('.time-btn');
const timeElement = document.querySelector('#current-time');
const boardScoreElement = document.querySelector('#board-score-count');
const resultScoreElement = document.querySelector('#result-score-count');
const replayBtns = document.querySelector('.replay-btns');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

const rand = {
  int(value1, value2) {
    const max = isNaN(value2) ? value1 : value2;
    const min = isNaN(value2) ? 0 : value1;
    return Math.random() * (max - min) + min;
  },
  choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
};

/* Function */

function startGame() {
	changeScreen('game');
  timeCount();
  createRandomCircle();
}

function restartGame() {
	setScore(0);
  setTime(0);
  changeScreen('time');
}

function finishGame() {
	board.innerHTML = '';
	changeScreen('replay');
}

function timeCount() {
	const intervalId = setInterval(() => {
  	if (time -1 <= 0) {
    	clearInterval(intervalId);
      finishGame();
    }
    setTime(time - 1);
  }, 1000);
}

function createRandomCircle() {
	const circle = document.createElement('button');
  circle.className = 'game-circle';
  const size = rand.int(20, 50);
  const top = rand.int(board.clientHeight - size);
  const left = rand.int(board.clientWidth - size);
  const hue = rand.choice([rand.int(200), rand.int(280, 360)]);

  circle.style.cssText = `
  height: ${size}px;
  width: ${size}px;
  top: ${top}px;
  left: ${left}px;
  background-color: hsl(${hue}, 50%, 50%);
  box-shadow: 1px 1px 10px hsl(${hue}, 50%, 50%), -1px 1px 10px hsl(${hue}, 50%, 50%);
  `;

  circle.style.boxShadow = 

  circle.addEventListener('click', hitCircle);

  board.appendChild(circle);
}

function hitCircle({target}) {
  setScore(score + 1);
  createRandomCircle();
  target.disabled = true;
  target.animate(
    {
      transform: 'scale(0.3) rotate3d(1, 2, -5, 192deg)',
      backgroundColor: 'yellow',
      opacity: [1, 0.2, 0.1, 0.05],
      easing: 'ease',
    },
    1000
  ).onfinish = () => {
    target.remove();
  };
}

function changeScreen(screenName) {
	const screen = screens.find((screen) => screen.dataset.screen === screenName);
	if (!screen) return;
  screens.forEach((screen) => screen.classList.remove('screen__state-active'));
  screen.classList.add('screen__state-active');
}

function setScore(value) {
	score = value;
  boardScoreElement.innerText = score;
  resultScoreElement.innerText = score;
}

function setTime(value) {
	time = value;
  timeElement.innerText = formatTime(time);
}

function formatTime(value) {
	if (value < 10) {
  	return `0${value}`;
  }
  return value;
}


/* Event */

startGameBtn.addEventListener('click', () => {
	setScore(0);
  setTime(0);
	changeScreen('time');
});

timeBtns.forEach((btn) => {
	btn.addEventListener('click', ({target}) => {
	    setTime(target.dataset.time);
      startGame();
	  });
});

replayBtns.addEventListener('click', (event) => {
  if (event.target.dataset.replay === 'replay') {
    restartGame();
  } else {
    setTime(0);
    setScore(0);
    changeScreen('start');
  }
})
