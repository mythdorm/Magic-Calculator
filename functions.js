class Token {
  constructor (power, toughness) {
    this.power = power;
    this.toughness = toughness;

    const tokenArea = document.createElement("div");
    const attributeArea = document.createElement("div");
    const powerNumber = document.createElement("span");
    const toughnessNumber = document.createElement("span");
    const spanBreak = document.createElement("br");

    tokenArea.style = "float: left; width: 100px;";

    // const powerWords = document.createTextNode(power);
    const powerWords = document.createElement("input");
    powerWords.value = power;
    powerWords.style = "width: 25px; text-align: center;"
    powerNumber.appendChild(powerWords);
    // const toughnessWords = document.createTextNode(toughness);
    const toughnessWords = document.createElement("input");
    toughnessWords.value = toughness;
    toughnessWords.style = "width: 25px; text-align: center;"
    toughnessNumber.appendChild(toughnessWords);

    const tappedBox = document.createElement("input");
    tappedBox.type = "checkbox";
    tappedBox.name = "tapped-box";
    const label = document.createElement("label");
    label.htmlFor = "tapped-box";
    label.textContent = "Tapped";

    tokenArea.appendChild(powerNumber);
    tokenArea.appendChild(spanBreak);
    tokenArea.appendChild(toughnessNumber);
    attributeArea.appendChild(tappedBox);
    attributeArea.appendChild(label);
    tokenArea.appendChild(attributeArea);

    tokenArea.className = "tokens"

    this.tokenArea = tokenArea;
    confirmInConsole("token create");
  }

  getToken() {
    return this.tokenArea;
  }

  attachToParent(parent) {
    parent.appendChild(this.tokenArea);
  }
}

class Player {
  constructor (playerId) {
    this.playerId = playerId;
  }
}

playerButton = document.querySelector("#players");
mainDiv = document.getElementById("main")
const players = [];

let totalPlayers = 1;

function confirmInConsole(message) {
  console.log(message);
}



function createBlocker(playerNumber) {

  // Selects the creature area for the token to be attached to later
  const player = document.getElementById("player" + playerNumber + "-creatures");

  const token = new Token(1,1);
  token.attachToParent(player);
  confirmInConsole("creature");
}

function attachBlockerListener(playerId) {
  const player = players[playerId - 1];
  const id = player.id[6];
  blockerButton = document.getElementById("add-blocker" + id);
  blockerButton.addEventListener('click', () => {
    createBlocker(id);
  });
}

function createPlayer() {
  confirmInConsole("player");

  // Creates all the elements for the player area like the container, name, and additional child containers
  const playerDiv = document.createElement("div");
  const playerName = document.createElement("h3");
  const playerHealth = document.createElement("input");
  let text = "";
  if (totalPlayers == 1) {
    text = "Player " + totalPlayers + " (You)";
  } else {
    text = "Player " + totalPlayers;
  }
  const words = document.createTextNode(text);
  const creatureArea = document.createElement("div");
  const buttonArea = document.createElement("div");
  const addBlockerButton = document.createElement("button");

  // Sets the names and IDs for the created elements
  playerDiv.id = "player" + totalPlayers;
  creatureArea.className = "creatures";
  creatureArea.id = "player" + totalPlayers + "-creatures";
  creatureArea.style = "display:flex;justify-content: center;width: auto;";
  addBlockerButton.id = "add-blocker" + totalPlayers;
  playerHealth.value = 40;

  playerHealth.style = "text-align: center; width: 75px;";
  addBlockerButton.innerHTML = "Add Blocker";
  
  // Appends all the childs to their parent divs
  buttonArea.appendChild(addBlockerButton);
  playerName.appendChild(words);
  playerDiv.appendChild(playerName);
  playerDiv.appendChild(playerHealth);
  playerDiv.appendChild(buttonArea);
  playerDiv.appendChild(creatureArea);
  mainDiv.appendChild(playerDiv);

  players.push(playerDiv);

  attachBlockerListener(totalPlayers);

  totalPlayers += 1;
}

playerButton.addEventListener('click', createPlayer);
for (let i = 0; i < players.length; i++) {
  attachBlockerListener(i+1);
}