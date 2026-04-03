const board = document.querySelector(".board");
const buttons = [...document.querySelectorAll(".board > button")];
const resetButton = document.querySelector("#reset");
const currentTurnDOM = document.querySelector("#current-turn");
const playersForm = document.querySelector(".playerForm");

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
  };
  return { getBoard, placeMarker, reset };
})();

const Game = (() => {
  let player1 = undefined;
  let player2 = undefined;
  let currentPlayer = undefined;

  let turnsAmount = 0;
  let canPlay = true;

  const init = (player1Name, player2Name) => {
    player1 = Player(player1Name, "x");
    player2 = Player(player2Name, "o");
    currentPlayer = player1;
  };

  const playTurn = (button, index) => {
    if (!canPlay) return;
    const board = GameBoard.getBoard();

    if (board[index] !== null) return;
    button.textContent = currentPlayer.marker;
    board[index] = currentPlayer.marker;

    if (turnsAmount >= 4) {
      if (checkForWinner()) {
        currentTurnDOM.textContent = `${currentPlayer.name} (${currentPlayer.marker}) WON!`;
        canPlay = false;
        return;
      }
      if (turnsAmount === 8) {
        currentTurnDOM.textContent = `Its a DRAW!`;
        canPlay = false;
        return;
      }
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    displayCurrentTurn();

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
        return true;
      }
    }

    // Check diagnoal
    if (
      (board[0] !== null && board[0] === board[4] && board[4] === board[8]) ||
      (board[2] !== null && board[2] === board[4] && board[4] === board[6])
    ) {
      return true;
    }

    return false;
  };

  const displayCurrentTurn = () => {
    currentTurnDOM.textContent = `Current player: ${currentPlayer.marker}`;
  };

  const reset = () => {
    buttons.forEach((btn) => {
      btn.textContent = "";
    });
    GameBoard.reset();
    canPlay = true;
    turnsAmount = 0;
    displayCurrentTurn();
  };

  return { playTurn, displayCurrentTurn, reset, init };
})();

board.addEventListener("click", (event) => {
  const isButton = event.target.tagName === "BUTTON";

  if (isButton) {
    Game.playTurn(event.target, buttons.indexOf(event.target));
  }
});

resetButton.addEventListener("click", () => {
  Game.reset();
});

playersForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const player1 = document.querySelector("#player1-name").value;
  const player2 = document.querySelector("#player2-name").value;

  Game.init(player1, player2);
  
  document.querySelector(".player-input").classList.add("hide");
  document.querySelector(".game").classList.remove("hide");

  Game.displayCurrentTurn();
});
