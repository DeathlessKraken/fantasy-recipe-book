import express from "express";
import bodyParser from 'body-parser';
import pg from 'pg';
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
//Throw error if unable to connect to db?
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "thehighground",
    password: "poopybutthole",
    port: 5432,
});
db.connect();

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


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

//This function cleans up the user input, adds other required fields (user ip/publish status)
function sanitizePostData(data) {
    const result = {};

    //title: trim whitespace, shouldn't be nonsense. 

    return false;
}

//When api route requested, get data from db and respond with json data


//Future valid routes: /post?id=? ... /user?id=?
//Routes
app.get('*', (req, res) => {
    console.log(req.headers);
    if(req.headers.host === 'api.localhost:3000') { //SUBDOMAIN CATCHING. CHANGE FOR PROD
        req.url = "/api" + req.url;
    }
    req.next();
});

app.post('*', (req, res) => {
    console.log(req.headers);
    if(req.headers.host === 'api.localhost:3000') { //SUBDOMAIN CATCHING. CHANGE FOR PROD
        req.url = "/api" + req.url;
    }
    req.next();
});

app.get("/api", async (req, res) => {
    res.json(cards);
});

app.post("/api/", async (req, res) => {
    //Sanitize data, and query db
    const data = sanitizePostData(req.body);
    if (data !== false) {
        //query db if sanitize returns good data, otherwise false means error
        
        //Once query is successful, return new recipeid instead of all data.
        res.status(201).json(data);
    } else {   
        res.status(400).json({error: { status: 400, message: "Cannot understand request body. Check submission data."}});
    }
});

//Needs to be below nearly all other routes.
app.get('*', (req, res) => {
    res.status(404).send('404! This is an invalid URL.');
});

app.post('*', (req, res) => {
    res.status(400).send('400! Invalid post request url.');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});