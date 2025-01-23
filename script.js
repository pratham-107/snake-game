// Constants
const BLOCK_SIZE = 25;
const ROWS = 20;
const COLS = 20;

// Game state
let board;
let context;
let snakeX = BLOCK_SIZE * 5;
let snakeY = BLOCK_SIZE * 5;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let foodX;
let foodY;
let gameOver = false;

// Initialize game
window.onload = function() {
  board = document.getElementById("board");
  board.height = ROWS * BLOCK_SIZE;
  board.width = COLS * BLOCK_SIZE;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
};

// Update game state
function update() {
  if (gameOver) return;

  // Clear board
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // Draw food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE);

  // Check if snake eats food
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  // Update snake body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // Draw snake
  context.fillStyle = "lime";
  snakeX += velocityX * BLOCK_SIZE;
  snakeY += velocityY * BLOCK_SIZE;
  context.fillRect(snakeX, snakeY, BLOCK_SIZE, BLOCK_SIZE);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], BLOCK_SIZE, BLOCK_SIZE);
  }

  // Check game over conditions
  if (
    snakeX < 0 ||
    snakeX > COLS * BLOCK_SIZE ||
    snakeY < 0 ||
    snakeY > ROWS * BLOCK_SIZE
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

// Handle key presses
function changeDirection(e) {
  if (e.code === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

// Place food on the board
function placeFood() {
  foodX = Math.floor(Math.random() * COLS) * BLOCK_SIZE;
  foodY = Math.floor(Math.random() * ROWS) * BLOCK_SIZE;
}