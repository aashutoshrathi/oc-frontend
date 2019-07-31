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
        targetBox.innerHTML = `<img href="aashutoshrathi.tk/oc-frontend/Project6/images/tree.png"></img>`;
    });
}

function addWeapons(weapons) {
    weapons.forEach(weapon => {
        targetBox = document.querySelector(`#box-${weapon}`);
        targetBox.innerText = 'W';
    });
}

function renderBoard() {
    initEmptyBoard();
    randomNumbers = generateNUniqueNumbers(20, 100);
    hurdles = randomNumbers.slice(0, 10);
    weapons = randomNumbers.slice(10, 20);
    addHurdles(hurdles);
    addWeapons(weapons);
}

renderBoard();