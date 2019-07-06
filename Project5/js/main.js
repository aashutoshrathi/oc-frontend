function handleFormSubmission() {
    cleanUp();
    const numberOfQuotes = document.getElementById('form-stacked-select').value;
    generateRandomQuotes(numberOfQuotes);
}

function cleanUp() {
    const quotesDiv = document.getElementById('quotes');
    quotesDiv.innerHTML = '';
}

function generateRandomQuotes(quantity) {
    motivationQuotesLength = motivationalQuotes.length;
    randomNums = generateNUniqueNumbers(quantity, motivationQuotesLength);

    quotes = randomNums.map(num => {
        return {
            begin: motivationalQuotes[0][num],
            mid: motivationalQuotes[1][num],
            last: motivationalQuotes[2][num],
            author: motivationalQuotes[3][num]
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