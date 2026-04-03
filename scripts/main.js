const board = document.querySelector(".board");

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





