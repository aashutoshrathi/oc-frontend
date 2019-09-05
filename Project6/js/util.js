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

function resetBox(boxNum) {
  // Removes onClick thing
  box = document.querySelector(`#box-${boxNum}`);
  box.innerHTML = "";
  box.outerHTML = box.outerHTML;
}

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
        : `<img class="weapon-in-card" src=${this.settings.weaponTypes[wpnIdx].image} alt="${this.settings.weaponTypes[wpnIdx].name}" title="${this.settings.weaponTypes[wpnIdx].score}""> (${this.settings.weaponTypes[wpnIdx].score})`;
  }
};

function generateNUniqueNumbers(length, range) {
  var arr = [];
  while (arr.length < length) {
    var r = Math.floor(Math.random() * range) + 1;
    var condition = true;
    if (condition && arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
