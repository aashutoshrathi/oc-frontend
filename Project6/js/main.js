const imageDir = `https://aashutoshrathi.tk/oc-frontend/Project6/images/`;

const hurdleBlock = `<img src="${imageDir}tree.png"></img>`;

const weaponMap = [
    {
        image: `${imageDir}alpha.png`,
        score: 10,
        name: 'alpha'
    },
    {
        image: `${imageDir}beta.png`,
        score: 20,
        name: 'beta'
    },
    {
        image: `${imageDir}gamma.png`,
        score: 30,
        name: 'gamma'
    },
    {
        image: `${imageDir}delta.png`,
        score: 40,
        name: 'delta'
    },
    {
        image: `${imageDir}pi.png`,
        score: 50,
        name: 'pi'
    }
];

function generateNUniqueNumbers(length, range) {
    var arr = []
    while(arr.length < length){
        var r = Math.floor(Math.random()*range) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

function initEmptyBoard() {
    board = document.querySelector('#board');
    boardSize  = 10;
    
    for(let i=0; i<10; i++) {
        board.innerHTML += `<div class="row" id="row-${i+1}"></div>`
        row = document.querySelector(`#row-${i+1}`);
        for(let j=0; j<10; j++) {
            row.innerHTML += `<div class="box" id="box-${(i)*10 + j+1}"></div>`
        }
    }
}

function addHurdles(hurdles) {
    hurdles.forEach(hurdle => {
        targetBox = document.querySelector(`#box-${hurdle}`);
        targetBox.innerHTML = hurdleBlock;
    });
}

function addWeapons(weapons) {
    weapons.forEach(weapon => {
        targetBox = document.querySelector(`#box-${weapon}`);
        const randomWeaponIndex = Math.floor(Math.random()*(weaponMap.length)) + 1;
        const { image, name, score } = weaponMap[randomWeaponIndex];
        targetBox.innerHTML = `<img src="${image}" alt="${name}">${score}</img>`;
    });
}

function renderBoard() {
    initEmptyBoard();
    randomNumbers = generateNUniqueNumbers(22, 100);
    hurdles = randomNumbers.slice(0, 10);
    weapons = randomNumbers.slice(10, 20);

    playerOnePosition = randomNumbers.slice(20, 21);
    playerTwoPosition = randomNumbers.slice(21, 22);

    addHurdles(hurdles);
    addWeapons(weapons);
}

// class Weapon(i) {
//     type = i
//     power = weaponMap[i].power
//     image = weaponMap[i].image
// }

renderBoard();