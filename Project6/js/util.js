/* 
This function is basic building block of the game
this holds the responsability of generating
all the random points which are all different 
and are in range also which are not in 3m radius
 */

function generateNUniqueNumbers(length, range) {
  var arr = [];
  while (arr.length < length) {
    var r = Math.floor(Math.random() * range) + 1;
    var condition = true;
    // This condition keeps check nothing is in 3m radius
    for (let i = 0; i < arr.length; i++) {
      diff = Math.abs(r - arr[i]);
      if ((diff % 10 === 0 && diff / 10 <= 3) || diff <= 3) {
        condition = false;
        break;
      }
    }
    if (condition && arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

// Initialize empty board to begin the game

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

/* 
This function is used to reset the boxes after movement,
i.e. remove the eventListener and stuff
 */
function resetBox(boxNum) {
  // Removes onClick thing
  box = document.querySelector(`#box-${boxNum}`);
  box.innerHTML = "";
  box.outerHTML = box.outerHTML;
}

/* 
This function is used to set names to for the
players on the score board
 */
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

// This function is used to update score on scoreboard

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
        : `<img class="weapon-in-card" src=${this.settings.weaponTypes[wpnIdx].image} alt="${this.settings.weaponTypes[wpnIdx].name}" title="${this.settings.weaponTypes[wpnIdx].score}""> (${this.settings.weaponTypes[wpnIdx].score})`;
  }
};
