import savePost from "../db/savePost.js";
import { postSchema, slugSchema } from "../utils/validation.js";
import escape from "validator/lib/escape.js";
import slugify from "slugify";
import uniqueSlug from "unique-slug";
import getRecipeFromSlug from "../db/getRecipeFromSlug.js";
import getIdFromUser from "../db/getIdFromUser.js";
import getUserFromSlug from "../db/getUserFromSlug.js";
import deletePostForId from "../db/deletePostForId.js";
import checkPostExistsFromSlug from "../db/checkPostExistsFromSlug.js";

export function getPosts (req, res) {
    res.json("Get posts route");
}

export async function getSinglePost (req, res) {
    const dirtySlug = req.params.slug;
    
    try {
        const slug = await slugSchema.validateAsync(dirtySlug)
            .catch(error => {throw new Error("Unable to validate url: " + error.details[0].message, { cause: 400 })});

        const result = await getRecipeFromSlug(slug);

        if(!result) {
            throw new Error(`Unable to find a match for url slug ${slug}`, {cause:400});
        }
        
        res.status(200).json(result);

    } catch (error) {
        if(error.cause){
            res.status(error.cause).json(error.message);
        } else {
            console.log(error);
            res.status(500).json("Something went wrong. Please try again later.");
        }
    }
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
        
        await savePost({
            user: req.user,
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

//Get id from username
//If post author matches that id, mark deleted
export async function deletePost (req, res) {
    const dirtySlug = req.params.slug;
    
    try {
        const slug = await slugSchema.validateAsync(dirtySlug)
            .catch(error => {throw new Error("Unable to validate url: " + error.details[0].message, { cause: 400 })});
            
        //Grab username from post being deleted
        const user = await getUserFromSlug(slug);
        
        //Confirm user exists, and it's their post.
        if(!user) throw new Error(`Unable to find user ${req.user} for url ${req.originalUrl}`, {cause:404});
        if(user !== req.user) {
            throw new Error(`Signed in user does not match post author.`, {cause:403});
        }
        
        //Confirm post exists
        const exists = await checkPostExistsFromSlug(slug);
        if(!exists) throw new Error(`Unable to locate post for url ${req.originalUrl}`, {cause:404});
            
        //Mark post as deleted
        const userId = await getIdFromUser(req.user);
        if(!userId) {
            throw new Error(`Unable to find user ${req.user}`, {cause:404});
        }
        
        await deletePostForId(userId, slug);

        res.status(200).json("Post successfully deleted.");

    } catch (error) {
        if(error.cause){
            res.status(error.cause).json(error.message);
        } else {
            console.log(error);
            res.status(500).json("Something went wrong. Please try again later.");
        }
    }
}

export function editPost (req, res) {
    res.json("edit post route");
}