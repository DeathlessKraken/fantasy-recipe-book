import { pool } from "./db.js";

export default async function getRecipeFromSlug(slug) {

    /*const postQuery = "SELECT json_build_object('title', title, 'author', u.username, 'createdAt', r.createdat, 'updatedAt', updatedat, "
        + "'category', category, 'post_origin', post_origin, 'description', description, 'body', body, 'media_url', media_url, "
        + "'prep_time', prep_time, 'cook_time', cook_time, 'servings', servings, 'ingredients', ingredients, 'instructions', instructions, "
        + "'post_views', post_views) FROM recipe r JOIN user_profile u ON u.id = r.author WHERE slug = $1 AND r.isdeleted = false "
        + "";*/

    const query = "UPDATE recipe SET post_views = recipe.post_views + 1 "
        + "FROM (SELECT title, u.username, r.createdat, updatedat, category, post_origin, description, body, media_url, "
        + "prep_time, cook_time, servings, ingredients, instructions, post_views "
        + "FROM recipe r JOIN user_profile u ON u.id = r.author "
        + "WHERE slug = $1 AND r.isdeleted = false) sub "
        + "WHERE slug = $1 AND isdeleted = false "
        + "RETURNING json_build_object('title', sub.title, 'author', sub.username, 'createdAt', sub.createdat, 'updatedAt', sub.updatedat, "
        + "'category', sub.category, 'post_origin', sub.post_origin, 'description', sub.description, 'body', sub.body, 'media_url', sub.media_url, "
        + "'prep_time', sub.prep_time, 'cook_time', sub.cook_time, 'servings', sub.servings, 'ingredients', sub.ingredients, 'instructions', sub.instructions, "
        + "'post_views', (sub.post_views + 1))"

    const values = [slug];

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const post = await client.query(query, values);

        await client.query('COMMIT');

        if(!post.rows[0]) {
            return undefined;
        }

        return post.rows[0].json_build_object;
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error("Unable to retrieve recipe from database.", {cause:500});
    } finally {
        client.release();
    }
}