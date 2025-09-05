let debug = true;

function setDebug(value) {
  debug = value;
}

class AttributeDrop {
  constructor (area, parent, position) {
    this.area = area;
    this.parent = parent;
    this.times = 0;
    this.before = ""
    this.position = position;
    
    parent.dropdowns.push(this);

    const additionalAttributes = document.createElement("select");
    additionalAttributes.style = "width: 100px;";
    const attributesText = document.createElement("option");
    attributesText.text = "Attributes";
    const deathtouch = document.createElement("option");
    deathtouch.text = "Deathtouch";
    const indestructible = document.createElement("option");
    indestructible.text = "Indestructible";
    const doubleStrike = document.createElement("option");
    doubleStrike.text = "Double Strike";
    const vigilance = document.createElement("option");
    vigilance.text = "Vigilance";
    const flying = document.createElement("option");
    flying.text = "Flying";
    const reach = document.createElement("option");
    reach.text = "Reach";
    const attributes = [attributesText, deathtouch, indestructible, doubleStrike, vigilance, flying, reach];

    for (let attribute of attributes) {
      additionalAttributes.appendChild(attribute);
    }

    additionalAttributes.addEventListener("click", () => {
      this.checkAttribute(additionalAttributes)}
    );

    this.dropdown = additionalAttributes;
    this.parent.dropdownCount += 1;
  }

  checkAttribute(dropdown) {
    confirmInConsole("checking");
    if (dropdown.value != "Attributes") {
      this.setAttributes(dropdown.value, true);
      // this.parent.setAttribute(this.before, dropdown.value);
    }
    if (this.parent.dropdownCount < 6 && this.times == 1) {
      const newDrop = new AttributeDrop(this.area, this.parent, this.position + 1);
      newDrop.attachToParent(this.area);
    }
    if (this.before != "Attributes" && this.before != "") {
      confirmInConsole("set false");
      this.setAttributes(this.before, false);
    }
    this.times += 1;
    this.before = dropdown.value;
  }

  setAttributes(value, change) {
    switch (value) {
        case "Deathtouch":
          confirmInConsole("setting " + value + " set true");
          this.parent.deathtouch = change;
          break;
        case "Indestructible":
          confirmInConsole("setting " + value + " set true");
          this.parent.indestructible = change;
          break;
        case "Double Strike":
          confirmInConsole("setting " + value + " set true");
          this.parent.doubleStrike = change;
          break;
        case "Vigilance":
          confirmInConsole("setting " + value + " set true");
          this.parent.vigilance = change;
          break;
        case "Flying":
          confirmInConsole("setting " + value + " set true");
          this.parent.flying = change;
          break;
        case "Reach":
          confirmInConsole("setting " + value + " set true");
          this.parent.reach = change;
          break;
    }
    confirmInConsole("next");
  }

  getDrop () {
    return this.dropdown;
  }

  attachToParent (parent) {
    parent.appendChild(this.dropdown);
  }
}

class Token {
  constructor (power, toughness) {
    this.power = power;
    this.toughness = toughness;

    this.dropdownCount = 0;
    this.dropdowns = [];

    this.deathtouch = false;
    this.indestructible = false;
    this.doubleStrike = false;
    this.vigilance = false;
    this.flying = false;
    this.reach = false;
    // this.attributes = [];
    // this.attributes = new Set(["Untapped"]);

    this.tapped = false;

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

    // additionalAttributes.type = "dropdown";
    const additionalAttributes = new AttributeDrop(tokenArea, this, 1);
    

    tokenArea.appendChild(powerNumber);
    tokenArea.appendChild(spanBreak);
    tokenArea.appendChild(toughnessNumber);
    attributeArea.appendChild(tappedBox);
    attributeArea.appendChild(label);
    // attributeArea.appendChild(additionalAttributes);
    tokenArea.appendChild(attributeArea);

    tappedBox.addEventListener("click", () => {
      this.checkTapped(tappedBox.checked)
    });

    additionalAttributes.attachToParent(attributeArea);

    tokenArea.className = "tokens"

    this.tokenArea = tokenArea;
    this.powerWords = powerWords;
    this.toughnessWords = toughnessWords;
    confirmInConsole("token create");
  }

  checkTapped (value) {
    this.tapped = value;
  }

  setAttribute (position, value) {
    if (position <= this.attributes.length) {
      this.attributes[position] = value;
    } else {
      this.attributes.push(value);
    }
    // if (this.attributes.has(before)) {
    //   this.attributes.delete(before);
    // }
    // this.attributes.add(value);
  }

  getAttributes () {
    const attributes = [this.powerWords.value, this.toughnessWords.value, this.tapped, this.deathtouch, this.indestructible, this.doubleStrike, this.vigilance, this.flying, this.reach];
    for (let value of this.dropdowns) {
      switch (value) {
        case "Deathtouch":
          confirmInConsole("setting " + value + " set true");
          this.deathtouch = change;
          break;
        case "Indestructible":
          confirmInConsole("setting " + value + " set true");
          this.indestructible = change;
          break;
        case "Double Strike":
          confirmInConsole("setting " + value + " set true");
          this.doubleStrike = change;
          break;
        case "Vigilance":
          confirmInConsole("setting " + value + " set true");
          this.vigilance = change;
          break;
        case "Flying":
          confirmInConsole("setting " + value + " set true");
          this.flying = change;
          break;
        case "Reach":
          confirmInConsole("setting " + value + " set true");
          this.reach = change;
          break;
      }
    } 
    return attributes;
  }

  getToken() {
    return this.tokenArea;
  }

  attachToParent(parent) {
    parent.appendChild(this.tokenArea);
  }
}

class Player {
  constructor (playerId, playerDiv) {
    this.playerId = playerId;
    this.health = 40;
    this.tokens = [];

    this.div = playerDiv;
  }

  setDiv (newDiv) {
    this.div = newDiv;
  }

  getDiv () {
    return this.div;
  }
}

class Battle {
  constructor (firstPlayer, secondPlayer) {
    this.tokensFirstPlayer = firstPlayer.tokens;
    this.tokensSecondPlayer = secondPlayer.tokens;

    let firstPlayerHealth = firstPlayer.health;
    let firstPlayerHasFlying = false;
    let firstPlayerHasReach = false;
    let flyingCount = 0;
    let flyingPositions = [];
    let reachCount = 0;
    let reachPositions = [];

    let secondPlayerHealth = secondPlayer.health;
    let secondPlayerHasFlying = false;
    let secondPlayerHasReach = false;
    let secondPlayerFlyingCount = 0;
    // let secondPlayerFlyingPositons = [];
    let secondPlayerReachCount = 0;
    // let secondPlayerReachPositions = [];
    let secondPlayerFlyingReachPositions = [];


    for (let i = 0; i < tokensFirstPlayer.length; i++) {
      if (tokensFirstPlayer[i].flying) {
        firstPlayerHasFlying = true;
        flyingCount += 1;
        flyingPositions.push[i];
      } else if (tokensFirstPlayer[1].reach) {
        firstPlayerHasReach = true;
        reachCount += 1;
        reachPositions.push[i];
      }
    }

    for (let i = 0; i < tokensSecondPlayer.length; i++) {
      if (tokensSecondPlayer[i].flying) {
        secondPlayerHasFlying = true;
        secondPlayerFlyingCount += 1;
        secondPlayerFlyingReachPositions.push[i];
      } else if (tokensSecondPlayer[1].reach) {
        secondPlayerHasReach = true;
        secondPlayerReachCount += 1;
        secondPlayerFlyingReachPositions.push[i];
      }
    }
    if (flyingCount == (secondPlayerFlyingCount + secondPlayerReachCount)) {
      
    } else if (firstPlayerHasFlying && (secondPlayerHasFlying || secondPlayerHasReach)) {
      for (let positionFlyer of flyingPositions) {
        let flyerPower = this.tokensFirstPlayer[positionFlyer].powerWords.value;
        let flyerToughness = this.tokensFirstPlayer[positionFlyer].toughnessWords.value;
        for (let blockerPosition of secondPlayerFlyingReachPositions) {
          let blockerPower = this.tokensSecondPlayer[blockerPosition].powerWords.value;
          let blockerToughness = this.tokensSecondPlayer[blockerPosition].toughnessWords.value;
          if (flyerPower > blockerToughness && (secondPlayerFlyingCount + secondPlayerReachCount) == 1) {
            this.tokensSecondPlayer.splice(blockerPosition, 1);
          }
        }
      } 
    } else {
      for (let position of flyingPositions) {
        let damage = this.tokensFirstPlayer[position].powerWords.value
        firstPlayerHealth -= damage;
      }
    }
  }

  combat(token1, token2) {
    const token1Power = token1.powerWords.value;
    const token1Toughness = token1.toughnessWords.value;
    const token1Deathtouch = token1.deathtouch;
    const token1Indestructible = token1.indestructible;
    const token1DoubleStrike = token1.doubleStrike;
    
    const token2Power = token2.powerWords.value;
    const token2Toughness = token2.toughnessWords.value;
    const token2Deathtouch = token2.deathtouch;
    const token2Indestructible = token2.indestructible;

    // result 0: tokens tie and kill eachother
    // result 1: token 1 wins
    // result 2: token 2 wins
    // result 3: token 1 wins with overkill
    // result 4: neither token kills the other
    // result 5: both tokens die, but token 1 does overkill
    // result 6: token 1 dies, but still does overkill
    // result 7: Neither die, but there is still overkill
    //
    let result = 0;

    if (token1DoubleStrike) {
      token1Power *= 2;
    }

    if (token1Deathtouch && token2Deathtouch) {
      if (token1Indestructible && token2Indestructible) {
        if (token1Power > token2Toughness) {
          result = 7;
        } else {
          result = 4;
        }
      }else if (token2Indestructible) {
        if (token1Power > token2Toughness) {
          result = 6;
        } else {
          result = 2;
        }
      } else if (token1Indestructible) {
        if (token1Power > token2Toughness) {
          result = 3;
        } else {
          result = 1;
        }
      } else {
        if (token1Power > token2Toughness) {
          result = 5;
        } else {
          result = 4;
        }
      }
    } else if (token1Deathtouch && token2Indestructible) {
      if (token1Indestructible) {
        if (token1Power > token2Toughness) {
          result = 7;
        } else {
          result = 4;
        }
      } else if (token2Power < token1Toughness && token1Power < token2Toughness) {
        result = 4;
      } else {
        if (token1Power > token2Toughness) {
          result = 6; 
        } else {
          result = 2;
        }
      }
    } else if (token1Indestructible && token2Deathtouch) {
      if (token2Indestructible) {
        if (token1Power > token2Toughness) {
          result = 7;
        } else {
          result = 4;
        }
      } else if (token2Toughness > token1Power) {
        result = 4;
      } else {
        if (token1Power > token2Toughness) {
          result = 3;
        } else {
          result = 1;
        }
      }
    } else if (token1Indestructible && token2Indestructible) {
      if (token1Power > token2Toughness) {
        result = 7;
      } else {
        result = 4;
      }
    } else {
      if (token1Deathtouch) {
        if (token1Indestructible) {

        } else {
          
        }
      } else if (token1Indestructible) {

      } else {

      }
    }
  }
}

playerButton = document.querySelector("#players");
mainDiv = document.getElementById("main");
mainDiv.style = "margin: 20px;";
const players = [];

let totalPlayers = 1;

function confirmInConsole(message) {
  if (debug) {
    console.log(message);
  }
  
}

function createBlocker(playerNumber) {

  // Selects the creature area for the token to be attached to later
  const playerCreatures = document.getElementById("player" + playerNumber + "-creatures");

  const token = new Token(1,1);
  token.attachToParent(playerCreatures);
  players[playerNumber - 1].tokens.push(token);
  confirmInConsole("creature");
}

function attachBlockerListener(playerId) {
  const player = players[playerId - 1].getDiv();
  const id = player.id[6];
  blockerButton = document.getElementById("add-blocker" + id);
  blockerButton.addEventListener('click', () => {
    createBlocker(id);
  });
}

function createCalculator() {
  confirmInConsole("calculator");
  const calculateDiv = document.getElementById("calculateDiv");
  const calculateButton = document.createElement("button");
  calculateButton.innerHTML = "CALCULATE";
  calculateButton.addEventListener("click", calculate);
  calculateDiv.appendChild(calculateButton);
}

function computeBattle (tokensFirstPlayer, tokensSecondPlayer) {
  let copyFirstTokens = tokensFirstPlayer;
  let copySecondTokens = tokensSecondPlayer;
  // for (let token of copyFirstTokens) {
  //   const tokenAttributes = token.getAttributes();
  //   const tokenPower = tokenAttributes[0];
  //   const tokenToughness = tokenAttributes[1];
  //   const tokenTapped = tokenAttributes[2];
  //   const tokenDeathtouch = token.deathtouch;
  //   const tokenIndestructible = token.indestructible;
  //   const tokenDoubleStrike = token.doubleStrike;
  //   const tokenVigilance = token.vigilance;
  //   const tokenFlying = token.flying;
  //   const tokenReach = token.reach;
  //   for (let token2 of copySecondTokens) {
  //     const token2Attributes = token.getAttributes();
  //     const token2Power = tokenAttributes[0];
  //     const token2Toughness = tokenAttributes[1];
  //     const token2Tapped = tokenAttributes[2];
  //     const token2Deathtouch = token.deathtouch;
  //     const token2Indestructible = token.indestructible;
  //     const token2DoubleStrike = token.doubleStrike;
  //     const token2Vigilance = token.vigilance;
  //     const token2Flying = token.flying;
  //     const token2Reach = token.reach;
  //     if (tokenFlying && tokenReach) {

  //     } else if (!tokenFlying) {

  //     } else {

  //     }
  //   }
  // }
}

function calculate () {
  if (totalPlayers > 2 || debug) {
    let para = ""
    for (let player of players) {
      let sent = "" + player.playerId + ": "
      for (let token of player.tokens) {
        const tokenAttributes = token.getAttributes();
        for (let attribute of tokenAttributes) {
          sent += "" + attribute + " ";
        }
      }
      para += sent + "\n"
    }
    window.alert(para);
  } else {
    window.alert("There must be more than 1 player to calculate");
  }
  
}

function createPlayer() {
  confirmInConsole("player");

  const player = new Player (totalPlayers);

  // Creates all the elements for the player area like the container, name, and additional child containers
  const playerDiv = document.createElement("div");
  const playerName = document.createElement("h3");
  const playerHealth = document.createElement("input");
  let text = "";
  if (totalPlayers == 1) {
    text = "Player " + totalPlayers + " (You)";
    createCalculator();
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
  playerHealth.value = player.health;

  // playerDiv.style = "margin: 20px;";
  playerHealth.style = "text-align: center; width: 75px;";
  if (totalPlayers == 1) {
    addBlockerButton.innerHTML = "Add Attacker";
  } else {
    addBlockerButton.innerHTML = "Add Blocker";
  }
  
  // Appends all the childs to their parent divs
  buttonArea.appendChild(addBlockerButton);
  playerName.appendChild(words);
  playerDiv.appendChild(playerName);
  playerDiv.appendChild(playerHealth);
  playerDiv.appendChild(buttonArea);
  playerDiv.appendChild(creatureArea);
  mainDiv.appendChild(playerDiv);

  player.setDiv(playerDiv);
  players.push(player);

  attachBlockerListener(totalPlayers);

  totalPlayers += 1;
}

playerButton.addEventListener('click', createPlayer);
for (let i = 0; i < players.length; i++) {
  attachBlockerListener(i+1);
}