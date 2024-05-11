import savePost from "../db/savePost.js";
import { postSchema } from "../utils/validation.js";
import escape from "validator/lib/escape.js";
import slugify from "slugify";
import uniqueSlug from "unique-slug";
import isJWT from "validator/lib/isJWT.js";
import getUserFromToken from "../utils/getUserFromToken.js";

export function getPosts (req, res) {
    res.json("Get posts route");
}

export function getSinglePost (req, res) {
    res.json("Get single post route");
}

//Get data from body
//Validate/sanitize
//Save to db
export async function submitPost (req, res) {
    const {
        title,
        category,
        post_origin,
        description,
        is_personal,
        body,
        media_url,
        prep_time,
        cook_time,
        servings,
        ingredients,
        instructions
    } = req.body;

    try {
        const inputs = await postSchema.validateAsync({
            title,
            category,
            post_origin,
            is_personal,
            description,
            body,
            media_url,
            prep_time,
            cook_time,
            servings,
            ingredients,
            instructions
        }).catch(error => {throw new Error("Error validating input: " + error.details[0].message, { cause: 400 })});

        if(!inputs.is_personal && !inputs.post_origin) {
            throw new Error("You must provide post_origin link if this is not your recipe.", {cause:400});
        }

        //Escape title, description, body, and ingredients/instructions inputs before saving to db.
        const cleanTitle = escape(inputs.title);
        let cleanDescription = inputs.description;
        let cleanBody = inputs.body;
        if(cleanDescription) { cleanDescription = escape(inputs.description); }
        if(cleanBody) { cleanBody = escape(inputs.body); }

        const cleanIngredients = {};
        const cleanInstructions = {};
        Object.keys(inputs.ingredients).map(key => {
            cleanIngredients[key] = escape(inputs.ingredients[key]);
        });
        Object.keys(inputs.instructions).map(key => {
            cleanInstructions[key] = escape(inputs.instructions[key]);
        });

        //Generate non-user inputs
        const slug = slugify(inputs.title, {remove: /[*+~.()'"!:@]/g, lower: true, strict: true}) + "-" + uniqueSlug();

        //Stick this bit into getUserFromToken
        const token = req.header('authorization').split(' ')[1];
        if(!isJWT(token)) {
            throw new Error("Unable to verify token in Auth header.", {cause:401});
        }

        const user = await getUserFromToken(token);
        
        await savePost({
            user,
            slug,
            createdat: new Date().toISOString(),
            post_views: 0,
            isdeleted: false,
            title: cleanTitle,
            category: inputs.category,
            post_origin: inputs.post_origin,
            description: cleanDescription,
            body: cleanBody,
            media_url: inputs.media_url,
            prep_time: inputs.prep_time,
            cook_time: inputs.cook_time,
            servings: inputs.servings,
            ingredients: cleanIngredients,
            instructions: cleanInstructions
        });

        res.json("Post submitted successfully.");
    } catch (error) {
        if(error.cause){
            res.status(error.cause).json(error.message);
        } else {
            console.log(error);
            res.status(500).json("Something went wrong. Please try again later.");
        }
    }
}

export function deletePost (req, res) {
    res.json("Delete post route")
}

export function editPost (req, res) {
    res.json("edit post route");
}