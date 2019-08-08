const imageDir = `https://aashutoshrathi.tk/oc-frontend/Project6/images/`;
const weaponImages = `https://www.greeksymbols.net/img/`;

const hurdleBlock = `<img src="${imageDir}tree.png"></img>`;
const BOARD_SIZE = 10;

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

function setPlayerPositions(one, two) {
  targetBox = document.querySelector(`#box-${one}`);
  targetBox.innerHTML += `<img width="42px" src="${imageDir}p1.png" alt="P1"/>`;

  targetBox = document.querySelector(`#box-${two}`);
  targetBox.innerHTML += `<img width="42px" src="${imageDir}p2.png" alt="P2"/>`;
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

  document.querySelector("#p1-score").innerText = 100;
  document.querySelector("#p2-score").innerText = 100;

  for (let i = 0; i < 10; i++) {
    board.innerHTML += `<div class="row" id="row-${i + 1}"></div>`;
    row = document.querySelector(`#row-${i + 1}`);
    for (let j = 0; j < 10; j++) {
      row.innerHTML += `<div class="box" id="box-${i * 10 + j + 1}"></div>`;
    }
  }
}

function addHurdles(hurdles) {
  hurdles.forEach(hurdle => {
    targetBox = document.querySelector(`#box-${hurdle}`);
    targetBox.innerHTML += hurdleBlock;
  });
}

function addWeapons(weapons) {
  weapons.forEach((weapon, idx) => {
    targetBox = document.querySelector(`#box-${weapon}`);
    const { image, name, score } = weaponMap[idx];
    targetBox.innerHTML += `<img src="${image}" alt="${name}" title="${score}"/>`;
  });
}

function renderBoard() {
  initEmptyBoard();
  randomNumbers = generateNUniqueNumbers(17, 100);
  hurdles = randomNumbers.slice(0, 10);
  weapons = randomNumbers.slice(10, 15);

  playerOnePosition = randomNumbers[15];
  playerTwoPosition = randomNumbers[16];

  setPlayerPositions(playerOnePosition, playerTwoPosition);

  addHurdles(hurdles);
  addWeapons(weapons);
}

// class Weapon(i) {
//     type = i
//     power = weaponMap[i].power
//     image = weaponMap[i].image
// }

renderBoard();
