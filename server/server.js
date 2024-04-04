import express from "express";
import bodyParser from 'body-parser';
import pg from 'pg';
import morgan from "morgan";
import authSchema, { likeSchema } from "./helpers/validationSchema.js";
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

async function sanitizeLikeData(data) {
    let result = '';
    try {
        result = await likeSchema.validateAsync(data);
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
    newData.post_ip = req.headers['cf-connecting-ip'] ||  
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';

    //if they provide a custom recipe, DELETE link to original post.
    //Only doing this for consistency. IF in future I want to users to 
    //link to their OWN recipe posted elsewhere, this will need to change.
    //If it's not personal, they need to provide original link
    if (newData.is_personal === true) {
        newData.original_post_ref = "";
    } else if(!newData.original_post_ref && newData.is_personal === false) {
        throw new Error('If this is not a personal recipe, you need to provide a link to the original content. (Key: "original_post_ref")');
    }

    //Client will need to provide token from signed in user to post.
    //Currently filled out by default from client.
    //If apikey is used, retrieve user_id from apikey table.
    // API KEY -> USER_ID RETRIEVAL
    if (newData.hasOwnProperty('ApiKey')) {
        newData.user_id = (await getPrivateUserIdFromApiKey(newData.ApiKey));
        if (!newData.user_id) {
            throw new Error("Cannot authenticate user; bad API Key.");
        } else {
            newData.user_id = newData.user_id['user_id'];
        }
    } else {
        newData.user_id = (await getPrivateUserId(newData.user_id));
        if (!newData.user_id) {
            throw new Error("Cannot authenticate user; bad token from client.");
        } else {
            newData.user_id = newData.user_id['id'];
        }
    }

    

    newData.date_posted = new Date().toISOString();

    newData.self_id = generateUID();

    return newData;
}

async function getPrivateUserId(username) {
    let result = '';
    try {
        result = await db.query("SELECT id FROM user_profile WHERE username = $1", [username]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: { status: 500, message: "Error querying DB for user data.; Bad user token."}});
    }

    return result.rows[0];
}

async function getPrivateUserIdFromApiKey(ApiKey) {
    let result = '';
    try {
        result = await db.query("SELECT user_id FROM api_key WHERE api_key_value = $1", [ApiKey]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: { status: 500, message: "Error querying DB for user data; Bad API key."}});
    }

    return result.rows[0];
}

async function getPrivatePostId(self_id) {
    let result = '';
    try {
        result = await db.query("SELECT id FROM post WHERE self_id = $1", [self_id]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: { status: 500, message: "Error querying DB for user data.; Bad user token."}});
    }

    return result.rows[0];
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
    //Retrieve published, undeleted posts only. 
    try {
        const result = await db.query(
            "SELECT title, fandom, fandom_media_type, date_posted, date_edited, prep_time_mins, " 
            + "cook_time_mins, servings, instructions, ingredients, is_personal, original_post_ref, self_id "
            + "FROM post WHERE is_deleted=false;" 
        );
            
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: { status: 500, message: "Error retrieving posts from DB."}});
    }
});

app.post("/api/", async (req, res) => {

    if(!req.body.action) {
        res.status(400).json({
            error: { 
                status: 400, 
                message: "No action assoctiated with request. Hint: {action: {} content: {}} Valid actions: 'like', 'unlike', 'post' 'delete'"
            }
        });
    }

    //For now, liking posts is public and accessible.
    if(req.body.action === 'like') {
        const data = await sanitizeLikeData(req.body);

        //DEV
        //If like posted by client, use user_id 555.
        //Otherwise, if I post with admin API key, use user_id 1.
        //Also kinda weird when API action is treated like general client. non issue though,
        //I will implement permanent cookies later, so that cookie user will always have liked posts.
        if (!req.body.hasOwnProperty('ApiKey')) {
            data.user_id = 2;
        } else {
            data.user_id = 1;
        }

        let _postId = (await getPrivatePostId(data.post_id));
        if (!_postId.id) {
            throw new Error("Cannot authenticate post ID; bad token from client.");
        } else {
            _postId = _postId.id;
        }

        let result = '';
        try {
            result = await db.query(
                "INSERT INTO post_like (user_id, post_id, date_created) VALUES ($1, $2, $3) RETURNING date_created", 
                    [data.user_id, _postId, new Date().toISOString()]
            );    
        } catch (error) {
            console.log(error.message);
            res.status(409).json({error: { status: 409, message: "Post already liked by user."}});
        }
        if(result){
            res.status(201).json({message: "Successfully liked post."});
        }

    } else if (req.body.action === 'unlike') {
        //Create catch for case where client provides an unlike that doesn't exist in db
        //Actually, it returns successfull with DELETE 0. No error. That's nice.

        //set isdeleted to true in db
        const data = await sanitizeLikeData(req.body);

        //DEV
        //If like posted by client, use user_id 555.
        //Otherwise, if I post with admin API key, use user_id 1.
        if (!req.body.hasOwnProperty('ApiKey')) {
            data.user_id = 2;
        } else {
            data.user_id = 1;
        }

        let _postId = (await getPrivatePostId(data.post_id));
        if (!_postId.id) {
            throw new Error("Cannot authenticate post ID; bad token from client.");
        } else {
            _postId = _postId.id;
        }
        
        let result = '';
        try {
            result = await db.query(
                "DELETE FROM post_like WHERE user_id=$1 AND post_id=$2", 
                [data.user_id, _postId]
            );   
        } catch (error) {
            console.log(error.message);
            res.status(409).json({error: { status: 409, message: "Post already unliked by user."}});
        }
        if(result) {
            res.status(201).json({message: "Successfully unliked post."});
        }

    } else if (req.body.action === 'post') {
        //This code for posting actions...
        //Sanitize data, and query db
        //If there is no author_id from client browser, and no api-key in request body,
        //post will not be made.
        
        if(!req.body.content['ApiKey'] && !req.body.content.user_id) {
            res.status(406).json({error: { 
                status: 406,
                message: 'No field "ApiKey" in body, or user not signed in.'
            }})
        } else {
            let data = '';
            try {
                data = await getClientData(req, await sanitizePostData(req.body.content));
            } catch (error) {
                //If error, this data sent back as response down below.
                data = error.message;
            }
            //At this point, I'm expecting clean, full data to store.
            
            if (typeof(data) !== 'string') {
                //grab user id from user_profile table, insert new post with user_id.
                let result = '';
                try {
                    result = await db.query(
                        "INSERT INTO post (user_id, post_ip, title, fandom, fandom_media_type, date_posted, prep_time_mins,"
                        + "cook_time_mins, servings, instructions, ingredients, is_personal, original_post_ref, self_id, is_deleted)"
                        + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, "
                        + "$11, $12, $13, $14, $15) RETURNING self_id;",
                    [data.user_id, data.post_ip, data.title, data.fandom, data.fandom_media_type, data.date_posted,
                    data.prep_time_mins, data.cook_time_mins, data.servings, data.instructions, data.ingredients,
                    data.is_personal, data.original_post_ref, data.self_id, false]
                    );
                    //Once query is successful, return new recipeid instead of all data.
                    res.status(201).json({recipeId: result.rows[0].self_id});
                } catch (error) {
                    console.log(error.message);
                    res.status(500).json({error: { status: 500, message: "Error submitting posts to DB."}});
                }
            } else {   
                res.status(422).json({error: { status: 422, message: `Cannot understand request body. ${data}`}});
            }
        }
    } else {   
        res.status(400).json({error: { status: 400, message: "Cannot understand intent. Hint: {action: {} content: {} || post_id: ''} Valid actions: 'like', 'unlike', 'post' 'delete'"}});
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