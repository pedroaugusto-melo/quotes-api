module.exports = {
    getRandomElement(quotesArray) {
        const randomIdx = Math.floor(quotesArray.length * Math.random());

        return inputArray[randomIdx];
    },

    filterQuotesByPerson(person, quotesArray) {
        return quotesArray.filter(quote => quote.person.includes(person));
    },

    getQuoteById(id, quotesArray) {
        return quotesArray.find(quote => quote.id === id);
    },

    getIndexById(id, inputArray) {
        return inputArray.findIndex(element => element.id === id);
    }
};