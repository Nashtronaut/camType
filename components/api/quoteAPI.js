const URL = 'api.quotable.io/random'

const compileQuotes = () => {
    let quote = "";

    for (let i = 0; i < 10; i++) {
        quote += callQuote().content;
    }

    return quote;
}

const callQuote = () => {
    fetch(URL).then((response) => {
        return response.json();
    }).then((data)=> {
        return data
    })
};
export default compileQuotes;