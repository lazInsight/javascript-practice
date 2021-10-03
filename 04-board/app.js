function drawBoard() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const boardColumns = Math.floor(windowWidth / 20);
  const boardRows = Math.floor(windowHeight / 20);

  const SQUARES_NUMBER = boardColumns*boardRows;

  const board = document.querySelector('#board');
  const COLORS = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']
  console.log(SQUARES_NUMBER);

  for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () => setColor(square));
    square.addEventListener('mouseleave', () => removeColor(square));
    
    board.append(square);
  }

  function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 5px ${color}, 0 0 10px ${color}`;
  }

  function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = `0 0 10px #000`;
  }

  function getRandomColor() {
    const randomColorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomColorIndex];
  }
}

drawBoard();