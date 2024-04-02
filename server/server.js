import express from "express";
import bodyParser from 'body-parser';
import pg from 'pg';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "thehighground",
    password: "poopybutthole",
    port: 5432,
});

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));


const cards = [
    {
        //Cards have recipe title, fandom, imgsrc, imgalt, [likes, comments]
        //Recipe detail pages have that and more
        id: 0,
        title: 'Recipe Title',
        imgSrc: './images/soup.jpg',
        imgAlt: 'soup',
        description: 'This is recipe description. TEst for overflow/wrapping at some point...',
        fandom: 'Harry Potter',
        instructions: 'test for object format functionality?',
        datePosted: 'January 23 or January 31, 2021 if previous year',
        author: 'godzilla_crush', 
        source: 'Recipe credits @ ORIGINAL_AUTHOR'
    },
    {
        id: 1,
        title: 'Meat',
        imgSrc: './images/meat.jpg',
        imgAlt: 'meat',
        description: 'This is recipe description. TEst for overflow/wrapping at some point...',
        fandom: 'Harry Potter',
        instructions: 'test for object format functionality?',
        datePosted: 'January 23 or January 31, 2021 if previous year',
        author: 'godzilla_crush', 
        source: 'Recipe credits @ ORIGINAL_AUTHOR'
    },
    {
        id: 2,
        title: 'Butter Beer',
        imgSrc: './images/beer.jpg',
        imgAlt: 'butter beer',
        description: 'This is recipe description. TEst for overflow/wrapping at some point...',
        fandom: 'Harry Potter',
        instructions: 'test for object format functionality?',
        datePosted: 'January 23 or January 31, 2021 if previous year',
        author: 'godzilla_crush', 
        source: 'Recipe credits @ ORIGINAL_AUTHOR'
    },
    {
        id: 3,
        title: 'Beer two',
        imgSrc: './images/beer2.jpg',
        imgAlt: 'beer two',
        description: 'This is recipe description. TEst for overflow/wrapping at some point...',
        fandom: 'Harry Potter',
        instructions: 'test for object format functionality?',
        datePosted: 'January 23 or January 31, 2021 if previous year',
        author: 'godzilla_crush', 
        source: 'Recipe credits @ ORIGINAL_AUTHOR'
    },
    {
        id: 4,
        title: 'Bread',
        imgSrc: './images/bread.jpg',
        imgAlt: 'butter bread',
        description: 'This is recipe description. TEst for overflow/wrapping at some point...',
        fandom: 'Harry Potter',
        instructions: 'test for object format functionality?',
        datePosted: 'January 23 or January 31, 2021 if previous year',
        author: 'godzilla_crush', 
        source: 'Recipe credits @ ORIGINAL_AUTHOR'
    },
    {
        id: 5,
        title: 'Butter Beer',
        imgSrc: './images/beer3.jpg',
        imgAlt: 'butter beer3',
        description: 'This is recipe description. TEst for overflow/wrapping at some point...',
        fandom: 'Harry Potter',
        instructions: 'test for object format functionality?',
        datePosted: 'January 23 or January 31, 2021 if previous year',
        author: 'godzilla_crush', 
        source: 'Recipe credits @ ORIGINAL_AUTHOR'
    }         
];

//When api route requested, get data from db and respond with json data
//Routes

app.get("/api/", async (req, res) => {
    res.json(cards);
});

//Needs to be below nearly all other routes.
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});