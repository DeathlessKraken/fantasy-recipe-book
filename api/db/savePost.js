import { pool } from "./db.js";
import getIdFromUser from "./getIdFromUser.js";

export default async function savePost({
    user,
    isUpdate,
    updatedat,
    slug,
    title,
    createdat,
    post_views,
    isdeleted,
    category,
    post_origin,
    description,
    body,
    media_url,
    prep_time,
    cook_time,
    servings,
    ingredients,
    instructions
}) {
    const client = await pool.connect();

    const id = await getIdFromUser(user);
    
    if(!id) {
        throw new Error("Unable to find user from auth token. Sign in again, or try again later.", {cause:404});
    }
    
    const query = "INSERT INTO recipe (slug, title, author, createdat, category, post_origin, description, "
    + "body, media_url, prep_time, cook_time, servings, ingredients, instructions, post_views, isdeleted) "
    + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);";

    const updateQuery = "UPDATE recipe SET title = $1, updatedat = $2, category = $3, post_origin = $4, description = $5, "
    + "body = $6, media_url = $7, prep_time = $8, cook_time = $9, servings = $10, ingredients = $11, instructions = $12 "
    + "WHERE slug = $13";
    
    const values = [slug, title, id, createdat, category, post_origin, description, body, media_url, 
        prep_time, cook_time, servings, ingredients, instructions, post_views, isdeleted];

    const updateValues = [title, updatedat, category, post_origin, description, body, media_url, 
        prep_time, cook_time, servings, ingredients, instructions, slug];
        
    try {
        await client.query('BEGIN');

        if(isUpdate) {
            await client.query(updateQuery, updateValues);
        } else {
            await client.query(query, values);
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error);
        throw new Error("Unable to save recipe to database.", {cause: 500});
    } finally {
        client.release();    
    }
    
}