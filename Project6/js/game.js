function Game(gameSettings) {
  this.settings = gameSettings;

  this.activePlayer = 0;
  
  this.moveLimit = gameSettings.moveLimit;
  
  this.players = gameSettings.players.map((player, idx) => {
    player["id"] = idx;
    return new Player(player, this);
  }, this);
  
  this.grid = new Array(100).fill(0);

  this.renderBoard();
}
