board = document.querySelector('#board');
boardSize  = 10;

function generateNUniqueNumbers(length, range) {
    var arr = []
    while(arr.length < length){
        var r = Math.floor(Math.random()*range) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

for(let i=0; i<10; i++) {
    board.innerHTML += `<div class="row" id="row-${i+1}"></div>`
    row = document.querySelector(`#row-${i+1}`);
    for(let j=0; j<10; j++) {
        row.innerHTML += `<div class="box" id="box-${(i)*10 + j+1}"></div>`
    }
}
