import express from "express";
import bodyParser from 'body-parser';
import pg from 'pg';
import morgan from "morgan";
import authSchema from "./helpers/validationSchema.js";
import { v4 as uuidv4 } from 'uuid';
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

function generateUID() {
    return uuidv4().slice(0, 8);
}

//This function cleans up the user input, adds other required fields (user ip/publish status)
async function sanitizePostData(data) {
    let result = '';
    try {
        result = await authSchema.validateAsync(data);
    } catch (e) {
        result = e.message;
        console.log(e);
    }
    
    return result;
}

async function getClientData(req, data) {
    //If we receive string, don't operate just pass on the error.
    if (typeof(data) === 'string') { return data; }
    const newData = data;
    //Need to log client IP for spam. Will prob use middleware for this.
    newData.author_ip = req.headers['cf-connecting-ip'] ||  
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';

    //if they provide a custom recipe, DELETE link to original post.
    //Only doing this for consistency. IF in future I want to users to 
    //link to their OWN recipe posted elsewhere, this will need to change.
    if (newData.is_personal) {
        newData.original_post = "";
    }

    //If data was posted with someones apikey...
    //It always publishes, no drafting with apis...
    if(newData.hasOwnProperty('ApiKey')) {
        console.log("User posted with api key");
        newData.is_published = true;
    }
    
    //Otherwise, request made from browser.
    //Client will need to provide token from signed in user to post.
    //for DEV DB TESTING :
    newData.author_id = generateUID();

    //If its not a draft...
    if(newData.is_published) {
        newData.date_published = new Date().toISOString();
    }

    //Last edited right now
    newData.date_edited = new Date().toISOString();

    return newData;
}


//When api route requested, get data from db and respond with json data


//Future valid routes: /post?id=? ... /user?id=?
//Routes
app.get('*', (req, res) => {
    if(req.headers.host === 'api.localhost:3000') { //SUBDOMAIN CATCHING. CHANGE FOR PROD
        req.url = "/api" + req.url;
    }
    req.next();
});

app.post('*', (req, res) => {
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
    
    //If there is no author_id from client browser, and no api-key in request body,
    //post will not be made.
    
    if(!req.body['ApiKey'] && !req.body.author_id) {
        res.status(406).json({error: { 
            status: 406,
            message: 'No field "ApiKey" in body, or user not signed in.'
        }})
    } else {
    
        //At this point, I'm expecting clean, full data to store.
        const data = await getClientData(req, await sanitizePostData(req.body));
        if (typeof(data) !== 'string') {
            const result = await db.query(
                "INSERT INTO posts (author_ip, title, fandom, is_personal, original_post, like_count, comment_count, "
                + "date_published, date_edited, allergens, description, instructions, ingredients, images, is_published, "
                + "is_deleted, self_id, author_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, "
                + "$11, $12, $13, $14, $15, $16, $17, $18) RETURNING self_id;",
            [data.author_ip, data.title, data.fandom, data.is_personal, data.original_post,
                0, 0, data.date_published, data.date_edited, data.allergens, data.description, 
                data.instructions, data.ingredients, data.images, data.is_published, false, 
                generateUID(), data.author_id]
            );
            //Once query is successful, return new recipeid instead of all data.
            
            res.status(201).json(result.rows[0]);
        } else {   
            res.status(422).json({error: { status: 422, message: `Cannot understand request body. ${data}`}});
        }
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