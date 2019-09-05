Game.prototype.battle = function() {
  const one = this.players[(this.activePlayer + 1) % 2].score;
  const someOne = this.players[this.activePlayer].score;
  if (one <= 0) {
    console.log("Player1 Won");
  } else if (someOne <= 0) {
    console.log("Player2 Won");
  }
};

const attackButton = document.querySelector("#attack");
const defendButton = document.querySelector("#defend");
attackButton.addEventListener("click", function() {
  game.attack();
});

defendButton.addEventListener("click", function() {
  game.defend();
});

Game.prototype.defend = function() {
  actPlayer = this.activePlayer;
  if (this.players[actPlayer].score > 5) {
    this.players[actPlayer].score -= 5;
  } else {
    this.players[actPlayer].score = 0;
  }
  this.updateScoreBoards();
  this.changeTurn();
};

Game.prototype.attack = function() {
  actPlayer = this.activePlayer;
  weapon = this.players[actPlayer].weapon;
  document.querySelector("#attack").style.display = "";
  let power;
  if (weapon === -1) {
    power = -1;
  } else {
    weapons = this.settings.weaponTypes;
    power = weapons[weapon].score;
    console.table({ power, weapon, actPlayer });
    if (this.players[(actPlayer + 1) % 2].score > power)
      this.players[(actPlayer + 1) % 2].score -= power;
    else {
      this.players[(actPlayer + 1) % 2].score = 0;
    }
  }

  this.updateScoreBoards();
  this.changeTurn();
};

Game.prototype.gameOver = function() {
  document.querySelector("#turn-div").style.display = "none";
  document.querySelector("#attack").style.display = "none";
  document.querySelector("#defend").style.display = "none";

  whoWon = "";

  if (this.players[0].score == 0) {
    whoWon = this.players[1].name;
  }
  if (this.players[1].score == 0) {
    whoWon = this.players[0].name;
  }

  document.querySelector(
    "#battle"
  ).innerHTML = `<h2 class="uk-text-success"> Game Over </h2>
    <br> 
    <h3>${whoWon} won the game! 🎉</h3> 
    <br>
    <a id="reset" class="uk-button uk-button-secondary uk-border-pill">Start New Game</a>`;

  document.querySelector("#reset").addEventListener("click", function() {
    location.reload(true);
  });
};
