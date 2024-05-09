import { postSchema } from "../utils/validation.js";

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
        }).catch(error => {console.log(error);throw new Error("Error validating input: " + error.details[0].message, { cause: 400 })});

        console.log(inputs);

        res.json("Post submitted successfully.");
    } catch (error) {
        res.status(error.cause).json(error.message);
    }
}

export function deletePost (req, res) {
    res.json("Delete post route")
}

export function editPost (req, res) {
    res.json("edit post route");
}