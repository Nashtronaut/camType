    const URL = 'https://programming-quotes-api.herokuapp.com/quotes/random';

const compileQuotes = async () => {
    let quote = "";

    for (let i = 0; i < 10; i++) {
        quote += " " + await callQuote();
    }

    console.log(quote);
    return quote;
}

const callQuote = async () => {
    return fetch(URL)
        .then((response) => response.json())
        .then((data) => data.en);
};

export default compileQuotes;