// let apiQuotes = [];

// Show New Quote
function newQuote(){
    // Pick a Random Quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
}

// Get Quotes from API
// async function getQuotes() {
//     const apiUrl = 'https://type.fit/api/quotes';
//     try {
//         const responce = await fetch(apiUrl);
//         apiQuotes = await responce.json();
//         newQuote();
//     } catch (error) {
//         // Catch Error Here
//     }
// }

// On Load
// getQuotes();
newQuote();