const express = require('express');
const { getRandomElement, filterQuotesByPerson, getQuoteById, getIndexById } = require('./util.js');

const sportQuotesRouter = express.Router();
module.exports = {
    sportQuotesRouter,
    getAllSportQuotes
}

const sportQuotes = [
    {
        id: '1.1',
        person: 'Michael Jordan',
        quote: 'I have failed over and over again in my life. And that is why I succeed.'
    },

    {
        id: '1.2',
        person: 'Derek Jeter',
        quote: 'There may be people that have more talent than you, but there is no excuse for anyone to work harder than you do.'
    },

    {
        id: '1.3',
        person: 'Picabo Street',
        quote: 'To uncover your true potential you must first find your own limits and then you have to have the courage to blow past them.'
    },

    {
        id: '1.4',
        person: 'Vince Lombardi',
        quote: 'It is not whether you get knocked down; it is whether you get up.'
    },

    {
        id: '1.5',
        person: 'Tim Notke',
        quote: 'Hard work beats talent when talent does not work hard.'
    },

    {
        id: '1.6',
        person: 'Michael Jordan',
        quote: 'Never say never because limits, like fears, are often just an illusion.'
    },

    {
        id: '1.7',
        person: 'Vin Scully',
        quote: 'Good is not good when better is expected.'
    },

    {
        id: '1.8',
        person: 'Paul Bryant',
        quote: 'It is not the will to win that matters — everyone has that. It is the will to prepare to win that matters.'
    },

    {
        id: '1.9',
        person: 'Dean Karnazes',
        quote: 'Run when you can, walk if you have to, crawl if you must; just never give up.'
    },

    {
        id: '1.10',
        person: 'Jim Valvano',
        quote: 'Never give up! Failure and rejection are only the first step to succeeding.'
    }
];
let idCounter = sportQuotes.length;

function getAllSportQuotes() {
    return sportQuotes;
}

//Get all sport quotes or quotes for a specific person
sportQuotesRouter.get('/', (req, res, next) => {
    const person = req.query.person;

    if(person) {
        res.send({
            quotes: filterQuotesByPerson(person, sportQuotes)
        });
    } else {
        res.send({
            quotes: sportQuotes
        });
    }
});

//Get a quote by ID
sportQuotesRouter.get('/:id', (req, res, next) => {
    const quote = getQuoteById(req.params.id, sportQuotes);

    if(quote) {
        res.send(quote);
    } else {
        res.status(404).send('Invalid Id!');
    }
});

//Get a random sport quote
sportQuotesRouter.get('/random', (req, res, next) => {
    res.send({
        quote: getRandomElement(sportQuotes)
    });
});

//Create a new valid quote
sportQuotesRouter.post('/', (req, res, next) => {
    const person = req.query.person;
    const quote = req.query.quote;

    if(person && quote) {
        const newQuote = {
            id: `1.${++idCounter}`,
            person,
            quote
        }

        sportQuotes.push(newQuote);

        res.status(201).send(newQuote);
    } else {
        res.status(400).send('Invalid quote!');
    }
});

//Update a quote
sportQuotesRouter.put('/:id', (req, res, next) => {
    const idx = getIndexById(req.params.id, sportQuotes);

    if(idx !== -1){
        const newPerson = req.query.person;
        const newQuote = req.query.quote;

        if(newPerson && !newQuote) {
            sportQuotes[idx].person = newPerson;
            res.send(sportQuotes[idx]);
        } else if(!newPerson && newQuote) {
            sportQuotes[idx].quote = newQuote;
            res.send(sportQuotes[idx]);
        } else if(newPerson && newQuote) {
            sportQuotes[idx].person = newPerson;
            sportQuotes[idx].quote = newQuote;
            res.send(sportQuotes[idx]);
        } else {
            res.status(400).send('Invalid quote!');
        }
    } else {
        res.status(404).send('Invalid Id!');
    }
});

//Delete a quote
sportQuotesRouter.delete('/:id', (req, res, next) => {
    const idx = getIndexById(req.params.id, sportQuotes);

    if(idx !== -1) {
        sportQuotes.splice(idx, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Quote not found!');
    }
});