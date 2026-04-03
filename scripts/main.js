const board = document.querySelector(".board");
const buttons = [...document.querySelectorAll(".board > button")];
const resetButton = document.querySelector("#reset");
const currentTurnDOM = document.querySelector("#current-turn");

function Player(name, marker) {
  return { name, marker };
}

const GameBoard = (() => {
  let board = Array(9).fill(null);
  const getBoard = () => board;
  const placeMarker = (index, marker) => {
    if (board[index] !== null) return false;
    board[index] = marker;
    return true;
  };
  const reset = () => {
    board.fill(null);
    buttons.forEach((btn) => {
      btn.textContent = "";
    });
  };
  return { getBoard, placeMarker, reset };
})();

const Game = (() => {
  const player1 = Player("human1", "x");
  const player2 = Player("human2", "o");

  let currentPlayer = player1;
  let turnsAmount = 0;

  const playTurn = (button, index) => {
    const board = GameBoard.getBoard();

    if (board[index] !== null) return;
    button.textContent = currentPlayer.marker;
    board[index] = currentPlayer.marker;

    if (turnsAmount >= 4) {
      if (checkForWinner()) {
        console.log(`${currentPlayer.name} won!`);
      }
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    turnsAmount++;
  };

  const checkForWinner = () => {
    const board = GameBoard.getBoard();

    // Check horizontal
    for (let i = 0; i < 3; i++) {
      if (
        board[0 + i * 3] !== null &&
        board[0 + i * 3] === board[1 + i * 3] &&
        board[1 + i * 3] === board[2 + i * 3]
      ) {
        console.log("won horizontal");

        return true;
      }
    }

    // Check vertical
    for (let i = 0; i < 3; i++) {
      if (
        board[0 + i] !== null &&
        board[0 + i] === board[3 + i] &&
        board[3 + i] === board[6 + i]
      ) {
        console.log("won vertical");
        return true;
      }
    }

    // Check diagnoal
    if (
      (board[0] !== null && board[0] === board[4] && board[4] === board[8]) ||
      (board[2] !== null && board[2] === board[4] && board[4] === board[6])
    ) {
      console.log("won diagnoal");
      return true;
    }

    return false;
  };

  const displayCurrentTurn = () => {
    currentTurnDOM.textContent = currentPlayer.marker;
  }

  return { playTurn,displayCurrentTurn };
})();

document.addEventListener('DOMContentLoaded', () => {
  Game.displayCurrentTurn();
})

board.addEventListener("click", (event) => {
  const isButton = event.target.tagName === "BUTTON";

  if (isButton) {
    Game.playTurn(event.target, buttons.indexOf(event.target));
  }
});

resetButton.addEventListener('click', () => {
  GameBoard.reset();
})
