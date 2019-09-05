Game.prototype.setPlayerPositions = function(one, two) {
  // console.log(`Setting players at ${one} and ${two}`);
  actPlayer = (this.activePlayer + 1) % 2;
  const player = this.players[actPlayer];

  console.log(this.players);

  const newPos = [one, two];
  newPos.forEach((pos, i) => {
    targetBox = document.querySelector(`#box-${pos}`);
    const newInnerHTML = "";
    if (targetBox.children[0] && targetBox.children[0].className === "weapon") {
      this.settings.weaponTypes.forEach((weapon, idx) => {
        if (weapon.name === targetBox.children[0].alt) {
          if (player.weapon !== -1) {
            player.xweapon = player.weapon;
          }
          player.weapon = idx;
        }
      });
      targetBox.innerHTML = newInnerHTML;
    }

    if (targetBox.children.length < 1)
      targetBox.innerHTML += `<img width="45px" src="${imageDir}p${i +
        1}.png" alt="P${i + 1}" title="${this.players[actPlayer].name}"/>`;
  });
};

Game.prototype.addHurdles = function(hurdles) {
  var that = this;
  console.log(this);
  hurdles.forEach(hurdle => {
    targetBox = document.querySelector(`#box-${hurdle}`);
    targetBox.innerHTML += hurdleBlock;
    that.grid[hurdle] = "H";
  });
};

Game.prototype.setPrevWeapon = function(boxNum) {
  // Removes onClick thing
  actPlayer = this.players[this.activePlayer];
  box = document.querySelector(`#box-${boxNum}`);
  const { image, name, score } = this.settings.weaponTypes[actPlayer.xweapon];
  box.innerHTML = `<img class="weapon" src="${image}" alt="${name}" title="${score}"/>`;
  box.outerHTML = box.outerHTML;
};

Game.prototype.onClickThing = function() {
  const that = this;
  const dirtyFellows = document.getElementsByClassName("possible");
  // This is to remove onClick from box
  Object.values(dirtyFellows).forEach(fellow => {
    fellow.className = "box";
    fellow.outerHTML = fellow.outerHTML;
  });

  that.changeTurn();
  that.updateBoard();
  that.updateScoreBoards();
};

Game.prototype.addWeapons = function(weapons) {
  var that = this;
  weapons.forEach((weapon, idx) => {
    targetBox = document.querySelector(`#box-${weapon}`);
    that.grid[weapon] = "W";
    const { image, name, score } = that.settings.weaponTypes[idx];
    targetBox.innerHTML += `<img class="weapon" src="${image}" alt="${name}" title="${score}"/>`;
  });
};

Game.prototype.renderBoard = function() {
  initEmptyBoard();
  randomNumbers = generateNUniqueNumbers(17, 99);
  hurdles = randomNumbers.slice(0, 10);
  weapons = randomNumbers.slice(10, 15);

  playerOnePosition = randomNumbers[15];
  playerTwoPosition = randomNumbers[16];
  this.players[0].position = playerOnePosition;
  this.players[1].position = playerTwoPosition;

  this.updateScoreBoards();

  this.setPlayerPositions(playerOnePosition, playerTwoPosition);

  this.addHurdles(hurdles, this);
  this.addWeapons(weapons, this);
  this.getValidMoves();
};

Game.prototype.changeTurn = function() {
  that = this;
  document.querySelector("#attack").style.display = "";
  that.activePlayer = (that.activePlayer + 1) % 2; // And after click the turn changes.
  const turnIndicator = document.querySelector("#turn");
  turnIndicator.src = `${imageDir}p${that.activePlayer + 1}.png`;
  actPlayer = this.activePlayer;
  weapon = this.players[actPlayer].weapon;
  if (weapon === -1) {
    document.querySelector("#attack").style.display = "none";
  }
  if (
    this.players[actPlayer].score === 0 ||
    this.players[(actPlayer + 1) % 2] === 0
  ) {
    this.gameOver();
  }
};

Game.prototype.updateBoard = function() {
  this.setPlayerPositions(this.players[0].position, this.players[1].position);
  const one = this.players[(this.activePlayer + 1) % 2].position;
  const someOne = this.players[this.activePlayer].position;
  const diff = Math.abs(one - someOne);
  if (diff === 10 || diff === 1) {
    boardBox = document.querySelector("#board-box");
    boardBox.style.display = "none";

    battle = document.querySelector("#battle");
    battle.style.display = "block";
  } else {
    this.getValidMoves();
  }
};

Game.prototype.getValidMoves = function() {
  var that = this;
  point = that.players[that.activePlayer].position;
  parentRow = parseInt(point / 10);
  parentCol = point % 10;
  directions = [1, -1, 10, -10]; // First one is for left, then right then top bottom.
  // Every cell (i,j) in grid has number 10*i+j+1

  directions.forEach(dir => {
    for (let i = 1; i <= that.moveLimit; i++) {
      const target = point + dir * i;
      if (that.grid[target] === "H") {
        // H is for Hurdles
        break;
      }

      tCol = target % 10;
      tRow = parseInt(target / 10);
      // console.table({ point, target, tCol, parentCol, tRow, parentRow });

      const verticalCon = tCol === parentCol && Math.abs(dir) == 10;
      const horizontalCon = tRow === parentRow && Math.abs(dir) == 1;
      const rangeCondition = target >= 0 && target < 100;
      if (rangeCondition && (verticalCon || horizontalCon)) {
        document.querySelector(`#box-${target}`).className += " possible"; // possible class gives yellow bg to cell
        actPlayer = that.players[that.activePlayer];
        targetBox = document.querySelector(`#box-${target}`);
        document
          .querySelector(`#box-${target}`)
          .addEventListener("click", function() {
            if(actPlayer.xweapon !== -1) {
              that.setPrevWeapon(point);
              actPlayer.xweapon = -1;
            }
            else if (actPlayer.weapon !== -1 && (targetBox.children[0] &&
              targetBox.children[0].className === "weapon")) {
              actPlayer.xweapon = actPlayer.weapon;
              resetBox(point);
            } else {
              resetBox(point);
            }
            that.players[that.activePlayer].position = target;
            that.onClickThing();
          }); // this is onclick event which will move player soon.
      }
    }
  });
};

game = new Game(gameSettings);
