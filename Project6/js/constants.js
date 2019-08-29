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
