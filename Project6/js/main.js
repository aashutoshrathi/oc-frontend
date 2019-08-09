const imageDir = `https://aashutoshrathi.tk/oc-frontend/Project6/images/`;
const weaponImages = `https://www.greeksymbols.net/img/`;

const hurdleBlock = `<img src="${imageDir}tree.png"></img>`;
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

const weaponMap = [
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
];

function Game(gameSettings) {
  this.settings = gameSettings;
  this.activePlayer = 0;
  this.moveLimit = gameSettings.moveLimit;
  this.players = gameSettings.players.map((player, idx) => {
    player["id"] = `player${idx + 1}`;
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
  this.name = player.name | `Player ${this.id}`;
  this.position;
}

function setPlayerPositions(one, two) {
  targetBox = document.querySelector(`#box-${one}`);
  targetBox.innerHTML += `<img width="45px" src="${imageDir}p1.png" alt="P1"/>`;

  targetBox = document.querySelector(`#box-${two}`);
  targetBox.innerHTML += `<img width="45px" src="${imageDir}p2.png" alt="P2"/>`;
}

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
  boardSize = BOARD_SIZE;

  for (let i = 0; i < 10; i++) {
    board.innerHTML += `<div class="row" id="row-${i + 1}"></div>`;
    row = document.querySelector(`#row-${i + 1}`);
    for (let j = 0; j < 10; j++) {
      row.innerHTML += `<div class="box" id="box-${i * 10 + j + 1}"></div>`;
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

Game.prototype.addWeapons = function(weapons) {
  var that = this;
  weapons.forEach((weapon, idx) => {
    targetBox = document.querySelector(`#box-${weapon}`);
    that.grid[weapon] = "W";
    const { image, name, score } = weaponMap[idx];
    targetBox.innerHTML += `<img src="${image}" alt="${name}" title="${score}"/>`;
  });
};

Game.prototype.renderBoard = function() {
  initEmptyBoard();
  randomNumbers = generateNUniqueNumbers(17, 100);
  hurdles = randomNumbers.slice(0, 10);
  weapons = randomNumbers.slice(10, 15);

  playerOnePosition = randomNumbers[15];
  playerTwoPosition = randomNumbers[16];
  this.players[0].position = playerOnePosition;
  this.players[1].position = playerTwoPosition;

  for (let id = 1; id <= 2; id++) {
    document.querySelector(`#p${id}-score`).innerText = this.players[
      id - 1
    ].score;
    document.querySelector(`#p${id}-weapon`).innerText =
      this.players[id - 1].weapon === -1
        ? "None"
        : weaponMap[this.players[id - 1].weapon].name;
  }

  setPlayerPositions(playerOnePosition, playerTwoPosition);

  this.addHurdles(hurdles, this);
  this.addWeapons(weapons, this);
  this.getValidMoves();
};

Game.prototype.getValidMoves = function() {
  point = this.players[this.activePlayer].position;
  parentRow = point/10 +1;
  directions = [1, -1, 10, -10]; // First one is for left, then right then top bottom.
  // Every cell (i,j) in grid has number 10*i+j+1
  directions.forEach(dir => {
    for (let i = 1; i <= this.moveLimit; i++) {
      const target = point + dir * i; // these are the cells I'm checking, but in case of horizontal one, sometimes it goes wrong.
      if (this.grid[target] === "H") { // H is for Hurdles
        break;
      }
      const targetRow = target/10 + 1;
      if (target >= 1 && target <= 100 && parentRow === targetRow) {
        document.querySelector(`#box-${target}`).className += " possible"; // possible class gives yellow bg to cell
        document
          .querySelector(`#box-${target}`)
          .addEventListener("click", function() {
            console.log(`Clicked on ${target}`);
          }); // this is onclick event which will move player soon.
        this.activePlayer = 1; // And after click the turn changes.
      }
    }
  });
};

// class Weapon(i) {
//     type = i
//     power = weaponMap[i].power
//     image = weaponMap[i].image
// }

game = new Game(gameSettings);
