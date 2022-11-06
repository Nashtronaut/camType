const URL = 'https://programming-quotes-api.herokuapp.com/quotes/random';

const QUOTE_LENGTH = 10; //ADJUSTS LENGTH OF QUOTE. 

const compileQuotes = async () => {
    let quote = "";

    for (let i = 0; i < QUOTE_LENGTH; i++) {
        quote += await callQuote() + " ";
    }
    return quote.trim();
}

const callQuote = async () => {
    return fetch(URL)
        .then((response) => response.json())
        .then((data) => data.en);
};

export default compileQuotes;