async function getQuote() {
    const response = await fetch("quotes.json");
    const quoteData = await response.json();
    console.log(quoteData);
    renderContacts(quoteData);
  }
  
  let quoteData = getQuote();
  
  function renderQuotes(quoteData) {
    let quotePlacement = document.querySelector("");
    quotePlacement.innerHTML = "";
  
    let quoteSelector = quoteData[Math.floor(Math.random()*items.length)];

    quoteData.forEach((quoteItem) => {
      quoteSelector.insertAdjacentHTML(
        "beforeend",
        `
        <div>
          <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">${quoteItem.quote}</h5>
          </div>
      </div>
      `
      )}
    )
}