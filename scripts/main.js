function player(name, playerSign) {
  if (typeof name !== "string" || typeof playerSign !== "string") {
    throw Error("Player name and sign need to be provided as strings.");
  }
  let wins = 0;

  function playTurn(buttonElement) {
    if (buttonElement.textContent !== "") {
      buttonElement.textContent = playerSign;
    }
  }

  function addWin(){
    wins++;
  }

  return {playTurn, addWin}
}

