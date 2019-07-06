function handleFormSubmission() {
    cleanUp();
    const numberOfQuotes = document.getElementById('form-stacked-select').value;
    const types = [];
    const humorType = document.getElementById('humor-checkbox').checked;
    if(humorType) {
        types.push('humor');
    }
    const motivationType = document.getElementById('motivation-checkbox').checked;
    if(motivationType) {
        types.push('motivation');
    }

    generateRandomQuotes(numberOfQuotes, types);
}

function cleanUp() {
    const quotesDiv = document.getElementById('quotes');
    quotesDiv.innerHTML = '';
}

function appendLists(listOne, listTwo) {
    listOne[0] = [...listOne[0], ...listTwo[0]];
    listOne[1] = [...listOne[1], ...listTwo[1]];
    listOne[2] = [...listOne[2], ...listTwo[2]];
    listOne[3] = [...listOne[3], ...listTwo[3]];
    return listOne;
}

function generateRandomQuotes(quantity, types) {
    listToUse = [[], [], [], []];
    if(types.includes('humor')) {
        listToUse =  appendLists(listToUse, humorQuotes);
    }

    if(types.includes('motivation')) {
        listToUse =  appendLists(listToUse, motivationalQuotes);        
    }

    listLength = listToUse.length;
    console.log(listToUse);

    if(listLength < quantity) {
        quantity = listLength;
    }

    randomNums = generateNUniqueNumbers(quantity, listLength);

    quotes = randomNums.map(num => {
        return {
            begin: listToUse[0][num-1],
            mid: listToUse[1][num-1],
            last: listToUse[2][num-1],
            author: listToUse[3][num-1]
        }
    });

    renderToDOM(quotes);
}

function renderToDOM(quotes) {
    quotesDiv = document.getElementById('quotes');
    quotes.forEach(quote => {
        const fullQuote = `${quote.begin}${quote.mid}${quote.last} ~${quote.author}`.trim();
        const twitterLink = `http://twitter.com/share?text=${fullQuote}&url=${document.location}`;
        quoteDiv = `<div class="uk-card uk-text-center uk-align-center uk-width-1-2@m uk-width-1-1@s uk-box-shadow-large uk-border-rounded uk-card-default uk-card-body">
                        <blockquote cite="#">
                            <p class="uk-margin-small-bottom uk-overflow-auto">
                                ${quote.begin}<br>
                                ${quote.mid}<br>
                                ${quote.last}<br>
                            </p>
                            <footer>
                                <cite>
                                    ${quote.author}
                                </cite>
                            </footer>
                        </blockquote>
                        <div>
                            <a class="uk-icon-link" target="popup" 
                                onclick="window.open('${twitterLink}','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;" uk-icon="twitter" ></a>
                            <a class="uk-icon-link uk-margin-left" target="_blank" uk-icon="whatsapp" href="whatsapp://send?text=${fullQuote}&url=${document.location}"></a>
                        </div>
                    </div>`;
        quotesDiv.insertAdjacentHTML("afterbegin", quoteDiv);
    })
}

function generateNUniqueNumbers(length, range) {
    var arr = []
    while(arr.length < length){
        var r = Math.floor(Math.random()*range) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}