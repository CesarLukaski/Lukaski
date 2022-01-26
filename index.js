var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;

var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;

const WINNING_SCORE = 3;

var showingWin = false;

var startbutton = false;

var PaddleR = 250;
var PaddleL = 250;

const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
}

function handlemouseClick(evt) {
  if (showingWin) {
    player1Score = 0;
    player2Score = 0;
    showingWin = false;
  }
}

function start() {
  canvas.addEventListener("Click", handlemouseClick);
  canvasContext.fillText(
    "PRESS TO START",
    canvas.width / 2,
    canvas.height / 1.5
  );
  return;
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // next line centralized text inside canvas
  canvasContext.fillText("textAlign=left", 150, 100);
  canvasContext.textAlign = "center";

  var framesPerSecond = 30;
  setInterval(function () {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousedown", handlemouseClick);
  canvas.addEventListener("mousemove", function (evt) {
    var mousePos = calculateMousePos(evt);
    PaddleR = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function ballReset() {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWin = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {
  var PaddleLCenter = PaddleL + PADDLE_HEIGHT / 2;
  if (PaddleL < ballY - 35) {
    PaddleL += 6;
  } else if (PaddleLCenter > ballY + 35) {
    PaddleL -= 6;
  }
}

function moveEverything() {
  if (showingWin) {
    return;
  }

  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > PaddleR && ballY < PaddleR + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (PaddleR + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.25;
    } else {
      player2Score++;
      ballReset();
    }
  }

  if (ballX > canvas.width) {
    if (ballY > PaddleL && ballY < PaddleL + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (PaddleL + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.25;
    } else {
      player1Score++;
      ballReset();
    }
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet() {
  for (var i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "white");
  }
}

function drawEverything() {
  //next line draws the canvas
  colorRect(0, 0, canvas.width, canvas.height, "black");

  if (showingWin) {
    canvasContext.fillStyle = "white";
    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText("You Won!!!", canvas.width / 2, canvas.height / 2);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText(
        "Computer Won!!!",
        canvas.width / 2,
        canvas.height / 2
      );
    }
    canvasContext.fillText(
      "Click to Continue",
      canvas.width / 2,
      canvas.height / 1.5
    );
    return;
  }

  drawNet();

  // next line draws the right paddle
  colorRect(0, PaddleR, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
  // next line draws the Left paddle
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    PaddleL,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    "white"
  );
  // next line draws the ball
  colorCircle(ballX, ballY, 10, "white");
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
