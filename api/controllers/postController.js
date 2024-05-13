import savePost from "../db/savePost.js";
import { postSchema, slugSchema, userSchema, querySchema } from "../utils/validation.js";
import escape from "validator/lib/escape.js";
import slugify from "slugify";
import uniqueSlug from "unique-slug";
import getRecipeFromSlug from "../db/getRecipeFromSlug.js";
import getIdFromUser from "../db/getIdFromUser.js";
import getUserFromSlug from "../db/getUserFromSlug.js";
import deletePostForId from "../db/deletePostForId.js";
import checkPostExistsFromSlug from "../db/checkPostExistsFromSlug.js";
import getRecipes from "../db/getRecipes.js";
import getRecipesFromUser from "../db/getRecipesFromUser.js";

//Getting many posts does not increase view count
export async function getPosts (req, res) {
    const category = req.query.category;
    const sort = req.query.sort;
    const time = req.query.time;

    const search = req.query.query;
    
    try {
        const queries = await querySchema.validateAsync({category, sort, time, search})
            .catch(error => {throw new Error("Unable to parse queries: " + error.details[0].message, { cause: 400 })});

        const result = await getRecipes(queries);

        if(result.length < 1) throw new Error(`No posts available.`, {cause:404});

        //Parse json object from db
        const recipes = result.map(obj => {
            return obj.json_build_object;
        });

        res.status(200).json(recipes);
    } catch (error) {
        if(error.cause){
            res.status(error.cause).json(error.message);
        } else {
            console.log(error);
            res.status(500).json("Something went wrong. Please try again later.");
        }
    }
}

//Getting a single post increase view count
export async function getSinglePost (req, res) {
    const dirtySlug = req.params.slug;
    
    try {
        const slug = await slugSchema.validateAsync(dirtySlug)
            .catch(error => {throw new Error("Unable to validate url: " + error.details[0].message, { cause: 400 })});

        const result = await getRecipeFromSlug(slug);

        if(!result) {
            throw new Error(`Unable to find a match for url slug ${slug}`, {cause:404});
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

export async function getUserPosts (req, res) {
    const dirtyUser = req.params.user;
    const category = req.query.category;
    const sort = req.query.sort;
    const time = req.query.time;
    
    try {
        const user = await userSchema.validateAsync(dirtyUser)
            .catch(error => {throw new Error("Unable to validate user: " + error.details[0].message, { cause: 400 })});

        const queries = await querySchema.validateAsync({category, sort, time})
            .catch(error => {throw new Error("Unable to parse queries: " + error.details[0].message, { cause: 400 })});

        const result = await getRecipesFromUser(user, queries);
        
        if(!result) {
            throw new Error(`No posts available.`, {cause:404});
        }

        //Parse json object from db
        const recipes = result.map(obj => {
            return obj.json_build_object;
        });

        res.status(200).json(recipes);

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
            isUpdate: false,
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


//Get info from user, v/s
//Replace post in db with new values
//DON'T update slug, isdeleted, post_views, createdat, author
//UPDATE updatedat
//Make sure this is their post
export async function editPost (req, res) {
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

    const dirtySlug = req.params.slug;

    try {
        const slug = await slugSchema.validateAsync(dirtySlug)
            .catch(error => {throw new Error("Unable to validate url: " + error.details[0].message, { cause: 400 })});
            
        //Grab username from post being edited
        const user = await getUserFromSlug(slug);
        
        //Confirm user exists, and it's their post.
        if(!user) throw new Error(`Unable to find user ${req.user} for url ${req.originalUrl}`, {cause:404});
        if(user !== req.user) {
            throw new Error(`Signed in user does not match post author.`, {cause:403});
        }
        
        //Confirm post exists
        const exists = await checkPostExistsFromSlug(slug);
        if(!exists) throw new Error(`Unable to locate post for url ${req.originalUrl}`, {cause:404});

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
        
        await savePost({
            isUpdate: true,
            user: req.user,
            slug,
            updatedat: new Date().toISOString(),
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

        res.json("Post updated successfully.");

    } catch (error) {
        if(error.cause){
            res.status(error.cause).json(error.message);
        } else {
            console.log(error);
            res.status(500).json("Something went wrong. Please try again later.");
        }
    }
}