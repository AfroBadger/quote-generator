const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const apiStatus = document.getElementById('api-status')

let apiQuotes = [];
let errorCount = 0;
let quoteSourceApi = true;

// Show Loading wheel
function showLoadingWheel() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function hideLoadingWheel() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function apiStatusDown() {
    const apiUpIcon = document.createElement("i");
    apiUpIcon.className = 'fas fa-exclamation-triangle';
    apiStatus.appendChild(apiUpIcon);

}

function apiStatusUp() {
    const apiUpIcon = document.createElement("i");
    apiUpIcon.className = 'fas fa-signal';
    apiStatus.appendChild(apiUpIcon);
}

// Show New Quote
function newQuote(){
    // Loading wheel
    showLoadingWheel();
    //Picks from local quotes in quotes.js
    //const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    let quote = ""
    if (quoteSourceApi) {
    // Pick a Random Quote from apiQuotes array
       quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
       console.log('source from API')
       apiStatusUp();
    }
    else {
        quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
        console.log('source from local file')
        apiStatusDown();
    }
    // Check if author field is bland and replace with unknown
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote Length to determin stylig
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote & Hide loader
    quoteText.textContent = quote.text;
    hideLoadingWheel();
}

// Get Quotes from API
async function getQuotes() {
    showLoadingWheel();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const responce = await fetch(apiUrl);
        apiQuotes = await responce.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        console.log('unable to load from api')
        errorCount++;
        if (errorCount < 3) {
            getQuotes();
        }
        else {
            quoteSourceApi = false;
            newQuote();
        }
    }
}


// To Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

//newQuote();