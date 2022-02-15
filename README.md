# Quotes API

A simple CRUD API that handles data related to quotes.

## Table of contents
- [General info](#general-info)
- [Objective](#objective)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

An API where users can get quotes, create quotes, update quotes and delete quotes. These quotes are divided in two categories: sport and tech. The user can get quotes inside each category or can get the quotes of the two categories together.

### Endpoints available in the API

- GET


```
/api/quotes
/api/quotes/sport
/api/quotes/tech

/api/quotes/random
/api/quotes/sport/random
/api/quotes/tech/random

/api/quotes?person=value
/api/quotes/sport?person=value
/api/quotes/tech?person=value

/api/quotes/:id
/api/quotes/sport/:id
/api/quotes/tech/:id
```

- POST

```
/api/quotes/sport?person=value&quote=value
/api/quotes/tech?person=value&quote=value
```

- PUT

```
/api/quotes/sport/:id?person=value&quote=value
/api/quotes/sport/:id?person=value
/api/quotes/sport/:id?quote=value

/api/quotes/tech/:id?person=value&quote=value
/api/quotes/tech/:id?person=value
/api/quotes/tech/:id?quote=value
```

- DELETE 

```
/api/quotes/sport/:id
/api/quotes/tech/:id
```


## Objective

Put in practice the concepts I've learnt aboud Node.js and Express.js.

## Technologies

- JavaScript
- Node.js
- Expres.js
- Git
- GitHub

## Setup

To run the project locally, follow the steps:

1- Download the project folder

2- Open the project directory in a terminal

3- Install the project dependencies. 
If you use npm, type the following command in the terminal:

```
npm install
```

4- Run the file ```script.js``` with Node using the following command in the terminal:

```
node script.js
```
