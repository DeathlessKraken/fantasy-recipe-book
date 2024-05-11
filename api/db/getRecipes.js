import { pool } from "./db.js";

export default async function getRecipes() {

    const viewQuery = "UPDATE recipe SET post_views = post_views + 1 WHERE isdeleted = false";
    const postQuery = "SELECT json_build_object('title', title, 'author', u.username, 'createdAt', r.createdat, 'updatedAt', updatedat, "
    + "'category', category, 'post_origin', post_origin, 'description', description, 'body', body, 'media_url', media_url, "
    + "'prep_time', prep_time, 'cook_time', cook_time, 'servings', servings, 'ingredients', ingredients, 'instructions', instructions, "
    + "'post_views', post_views) FROM recipe r JOIN user_profile u ON u.id = r.author WHERE r.isdeleted = false "
    + "ORDER BY post_views DESC";

    //Not sure if I can easily get all posts while updating view count easily(in one query/trip to db).

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(viewQuery);
        const result = await client.query(postQuery);

        await client.query('COMMIT');

        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error);
        throw new Error("Unable to retrieve recipe from database.", {cause:500});
    } finally {
        client.release();
    }
}