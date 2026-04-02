function player(name, playerSign) {
  if (typeof name !== "string" || typeof playerSign !== "string") {
    throw Error("Player name and sign need to be provided as strings.");
  }
  let wins = 0;

  function playTurn(buttonElement) {
    if (buttonElement.textContent !== "") {
      buttonElement.textContent = playerSign;
      return true;
    }
    return false;
  }

  function addWin(){
    wins++;
  }

  function getWins(){
    return wins;
  }

  return {playTurn, addWin}
}



