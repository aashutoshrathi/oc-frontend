function Player(player) {
  this.id = player.id;
  this.score = 100;
  this.weapon = -1;
  this.xweapon = -1; // previous weapon
  this.name = player.name || `Player ${this.id}`;
  this.position;
}
