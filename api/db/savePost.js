import { pool } from "./db.js";
import getIdFromUser from "./getIdFromUser.js";

export default async function savePost({
    user,
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
    
    const values = [slug, title, id, createdat, category, post_origin, description, body, media_url, 
        prep_time, cook_time, servings, ingredients, instructions, post_views, isdeleted];
        
    try {
        await client.query('BEGIN');

        await client.query(query, values);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error("Unable to save recipe to database.", {cause: 500});
    } finally {
        client.release();    
    }
    
}