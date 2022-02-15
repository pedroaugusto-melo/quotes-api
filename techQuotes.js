const express = require('express');
const { getRandomElement, filterQuotesByPerson, getIndexById } = require('./util.js');

const techQuotesRouter = express.Router();
module.exports = {
    techQuotesRouter,
    getAllTechQuotes
}

const techQuotes = [
    {
        id: '2.1',
        person: 'Arthur C. Clarke',
        quote: 'Any sufficiently advanced technology is equivalent to magic.'
    },

    {
        id: '2.2',
        person: 'Mark Kennedy',
        quote: 'All of the biggest technological inventions created by man - the airplane, the automobile, the computer - says little about his intelligence, but speaks volumes about his laziness.'
    },

    {
        id: '2.3',
        person: 'Thomas Edison',
        quote: 'Just because something does not do what you planned it to do does not mean it is useless.'
    },

    {
        id: '2.4',
        person: 'Alvin Toffler',
        quote: 'The great growling engine of change – technology.'
    },

    {
        id: '2.5',
        person: 'Steve Jobs',
        quote: 'Let is go invent tomorrow instead of worrying about what happened yesterday.'
    },

    {
        id: '2.6',
        person: 'Sean Gerety',
        quote: 'The technology you use impresses no one. The experience you create with it is everything.'
    },

    {
        id: '2.7',
        person: 'John Chambers',
        quote: 'If you do not innovate fast, disrupt your industry, disrupt yourself, you will be left behind.'
    },

    {
        id: '2.8',
        person: 'Elon Musk',
        quote: 'Engineering is the closest thing to magic that exists in the world.'
    },

    {
        id: '2.9',
        person: 'John Lasseter',
        quote: 'The art challenges the technology, and the technology inspires the art.'
    },

    {
        id: '2.10',
        person: 'Christian Lous Lange',
        quote: 'Technology is a useful servant but a dangerous master.'
    }
];
let idCounter = techQuotes.length;

function getAllTechQuotes() {
    return techQuotes;
}

//Get all tech quotes or quotes of a specific person
techQuotesRouter.get('/', (req, res, next) => {
    const person = req.query.person;

    if(person) {
        res.send({
            quotes: filterQuotesByPerson(person, techQuotes)
        });
    } else {
        res.send({
            quotes: techQuotes
        });
    }
});

//Get a quote by ID
techQuotesRouter.get('/:id', (req, res, next) => {
    const quote = getQuoteById(req.params.id, techQuotes);

    if(quote) {
        res.send(quote);
    } else {
        res.status(404).send('Invalid Id!');
    }
});

//Get a random tech quote 
techQuotesRouter.get('/random', (req, res, next) => {
    res.send({
        quote: getRandomElement(techQuotes)
    });
});

//Create a new valid tech quote
techQuotesRouter.post('/', (req, res, next) => {
    const person = req.query.person;
    const quote = req.query.quote;

    if(person && quote) {
        const newQuote = {
            id: `2.${++idCounter}`,
            person,
            quote
        }

        techQuotes.push(newQuote);

        res.status(201).send(newQuote);
    } else {
        res.status(400).send('Invalid quote!');
    }
});

//Update a quote
techQuotesRouter.put('/:id', (req, res, next) => {
    const idx = getIndexById(req.params.id, techQuotes);

    if(idx !== -1){
        const newPerson = req.query.person;
        const newQuote = req.query.quote;

        if(newPerson && !newQuote) {
            techQuotes[idx].person = newPerson;
            res.send(techQuotes[idx]);
        } else if(!newPerson && newQuote) {
            techQuotes[idx].quote = newQuote;
            res.send(techQuotes[idx]);
        } else if(newPerson && newQuote) {
            techQuotes[idx].person = newPerson;
            techQuotes[idx].quote = newQuote;
            res.send(techQuotes[idx]);
        } else {
            res.status(400).send('Invalid quote!');
        }
    } else {
        res.status(404).send('Invalid Id!');
    }
});

//Delete a quote
techQuotesRouter.delete('/:id', (req, res, next) => {
    const idx = getIndexById(req.params.id, techQuotes);

    if(idx !== -1) {
        techQuotes.splice(idx, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Quote not found!');
    }
});