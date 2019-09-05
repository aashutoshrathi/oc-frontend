const imageDir = `https://aashutoshrathi.tk/oc-frontend/Project6/images/`;
const weaponImages =
  "https://aashutoshrathi.tk/oc-frontend/Project6/images/weapons/";

const hurdleBlock = `<img src="${imageDir}pipe.png?q=1"></img>`;
const BOARD_SIZE = 10;

const gameSettings = {
  boardSize: 10,
  gameId: "game",
  moveLimit: 3,
  weaponTypes: [
    {
      image: `${weaponImages}knife.svg`,
      score: 10,
      name: "Knife"
    },
    {
      image: `${weaponImages}pistol.svg`,
      score: 20,
      name: "Pistol"
    },
    {
      image: `${weaponImages}smg.svg`,
      score: 30,
      name: "SMG"
    },
    {
      image: `${weaponImages}rifle.svg`,
      score: 40,
      name: "Rifle"
    },
    {
      image: `${weaponImages}awp.svg`,
      score: 50,
      name: "AWP"
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
