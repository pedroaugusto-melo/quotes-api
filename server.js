const express = require('express');
const sportQuotes = require('./sportQuotes.js');
const techQuotes = require('./techQuotes.js');
const { getRandomElement, filterQuotesByPerson, getQuoteById } = require('./util.js');

const app = express();

const PORT = process.env.PORT || 4001;

function getAllQuotes() {
    const allSportQuotes = sportQuotes.getAllSportQuotes();
    const allTechQuotes = techQuotes.getAllTechQuotes();

    const allQuotes = allSportQuotes.concat(allTechQuotes);

    return allQuotes;
}

app.use('/api/quotes/sport', sportQuotes.sportQuotesRouter);
app.use('/api/quotes/tech', techQuotes.techQuotesRouter);

//Get all quotes or quotes of a specific person
app.get('/api/quotes', (req, res, next) => {
    const allQuotes = getAllQuotes();
    const person = req.query.person;

    if(person) {
        res.send({
            quotes: filterQuotesByPerson(person, allQuotes)
        });
    } else {
        res.send({
            quotes: allQuotes
        });
    }
});

//Get a quote by ID
app.get('/api/quotes/:id', (req, res, next) => {
    const quote = getQuoteById(req.params.id, getAllQuotes());

    if(quote) {
        res.send(quote);
    } else {
        res.status(404).send('Invalid Id!');
    }
});

//Get a random quotes among all types of quotes
app.get('/api/quotes/random', (req, res, next) => {
    const allQuotes = getAllQuotes();

    res.send({
        quote: getRandomElement(allQuotes)
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));