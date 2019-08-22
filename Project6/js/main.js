const imageDir = `https://aashutoshrathi.tk/oc-frontend/Project6/images/`;
const weaponImages = `https://www.greeksymbols.net/img/`;

const hurdleBlock = `<img src="${imageDir}pipe.png?q=1"></img>`;
const BOARD_SIZE = 10;

const gameSettings = {
  boardSize: 10,
  gameId: "game",
  moveLimit: 3,
  weaponTypes: [
    {
      image: `${weaponImages}alpha-symbol.png`,
      score: 10,
      name: "alpha"
    },
    {
      image: `${weaponImages}beta-symbol.png`,
      score: 20,
      name: "beta"
    },
    {
      image: `${weaponImages}gamma-symbol.png`,
      score: 30,
      name: "gamma"
    },
    {
      image: `${weaponImages}delta-symbol.png`,
      score: 40,
      name: "delta"
    },
    {
      image: `${weaponImages}pi-symbol.png`,
      score: 50,
      name: "pi"
    }
  ],
  players: [
    {
      name: "Player One"
    },
    {
      name: "Player Two"
    }
  ]
};

function Game(gameSettings) {
  this.settings = gameSettings;
  this.activePlayer = 0;
  this.moveLimit = gameSettings.moveLimit;
  this.players = gameSettings.players.map((player, idx) => {
    player["id"] = idx;
    return new Player(player, this);
  }, this);
  this.grid = new Array(100).fill(0);

  // Render that bad boy
  this.renderBoard();
}

function Player(player) {
  this.id = player.id;
  this.score = 100;
  this.weapon = -1;
  this.name = player.name || `Player ${this.id}`;
  this.position;
}

Game.prototype.setPlayerPositions = function(one, two) {
  // console.log(`Setting players at ${one} and ${two}`);
  const newPos = [one, two];
  newPos.forEach((pos, i) => {
    targetBox = document.querySelector(`#box-${pos}`);
    const newInnerHTML = "";
    if (targetBox.children[0] && targetBox.children[0].className === "weapon") {
      this.settings.weaponTypes.forEach((weapon, idx) => {
        if (weapon.name === targetBox.children[0].alt) {
          const player = this.players[(this.activePlayer + 1) % 2];
          // if (player.weapon !== -1) {
          //   const { image, name, score } = this.settings.weaponTypes[
          //     player.weapon
          //   ];
          //   newInnerHTML = `<img class="weapon" src="${image}" alt="${name}" title="${score}"/>`;
          // }
          this.players[(this.activePlayer + 1) % 2].weapon = idx;
        }
      });
      targetBox.innerHTML = newInnerHTML;
    }

    if (targetBox.children.length < 1)
      targetBox.innerHTML += `<img width="45px" src="${imageDir}p${i +
        1}.png" alt="P${i + 1}" title="${
        this.players[(this.activePlayer + 1) % 2].name
      }"/>`;
  });
};

function generateNUniqueNumbers(length, range) {
  var arr = [];
  while (arr.length < length) {
    var r = Math.floor(Math.random() * range) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

function initEmptyBoard() {
  board = document.querySelector("#board");

  for (let i = 0; i < BOARD_SIZE; i++) {
    board.innerHTML += `<div class="row" id="row-${i + 1}"></div>`;
    row = document.querySelector(`#row-${i + 1}`);
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.innerHTML += `<div class="box" id="box-${i * BOARD_SIZE + j}"></div>`;
    }
  }
}

Game.prototype.addHurdles = function(hurdles) {
  var that = this;
  console.log(this);
  hurdles.forEach(hurdle => {
    targetBox = document.querySelector(`#box-${hurdle}`);
    targetBox.innerHTML += hurdleBlock;
    that.grid[hurdle] = "H";
  });
};

function resetBox(boxNum) {
  box = document.querySelector(`#box-${boxNum}`);
  box.innerHTML = "";
  box.outerHTML = box.outerHTML;
}

Game.prototype.onClickThing = function() {
  const that = this;
  const dirtyFellows = document.getElementsByClassName("possible");
  Object.values(dirtyFellows).forEach(fellow => {
    fellow.className = "box";
    fellow.outerHTML = fellow.outerHTML;
  });

  that.activePlayer = (that.activePlayer + 1) % 2; // And after click the turn changes.
  const turnIndicator = document.querySelector("#turn");
  turnIndicator.src = `${imageDir}p${that.activePlayer + 1}.png`;

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

Game.prototype.setNames = function() {
  const pOneName = document.getElementById("p1-name-val").value;
  const pTwoName = document.getElementById("p2-name-val").value;
  if (pOneName.trim() !== "" && pTwoName.trim() !== "") {
    const names = [pOneName, pTwoName];
    // console.log(names);
    this.players.forEach((player, idx) => {
      player.name = names[idx];
    });
    document.getElementById("name-form").style.display = "none";
    this.updateScoreBoards();

    toShow = document.getElementsByClassName("hidden");
    Object.values(toShow).forEach(ele => (ele.style.display = "block"));
  }
};

Game.prototype.updateScoreBoards = function() {
  for (let id = 1; id <= 2; id++) {
    document.querySelector(`#p${id}-name`).innerText = this.players[
      id - 1
    ].name;
    document.querySelector(`#p${id}-score`).innerText = this.players[
      id - 1
    ].score;
    const wpnIdx = this.players[id - 1].weapon;
    document.querySelector(`#p${id}-weapon`).innerHTML =
      wpnIdx === -1
        ? "None"
        : `<img class="weapon-in-card" src=${
            this.settings.weaponTypes[wpnIdx].image
          } alt="${this.settings.weaponTypes[wpnIdx].name}" title="${
            this.settings.weaponTypes[wpnIdx].score
          }""> (${this.settings.weaponTypes[wpnIdx].score})`;
  }
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

Game.prototype.battle = function() {
  const one = this.players[(this.activePlayer + 1) % 2].score;
  const someOne = this.players[this.activePlayer].score;
  if(one <= 0) {
    console.log("Player1 Won");
  } else {
    console.log("Player2 Won");
  }
}

Game.prototype.attack = function() {
  const one = this.players[(this.activePlayer + 1) % 2];
}

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
        document
          .querySelector(`#box-${target}`)
          .addEventListener("click", function() {
            resetBox(that.players[that.activePlayer].position);
            that.players[that.activePlayer].position = target;
            that.onClickThing();
          }); // this is onclick event which will move player soon.
      }
    }
  });
};

game = new Game(gameSettings);
