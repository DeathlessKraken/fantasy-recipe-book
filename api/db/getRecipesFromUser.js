import { pool } from "./db.js";
import getIdFromUser from "./getIdFromUser.js";

export default async function getRecipesFromUser(user) {

    const postQuery = "SELECT json_build_object('slug', slug,'title', title, 'author', u.username, 'createdAt', r.createdat, 'updatedAt', updatedat, "
    + "'category', category, 'post_origin', post_origin, 'description', description, 'body', body, 'media_url', media_url, "
    + "'prep_time', prep_time, 'cook_time', cook_time, 'servings', servings, 'ingredients', ingredients, 'instructions', instructions, "
    + "'post_views', post_views) FROM recipe r JOIN user_profile u ON u.id = r.author WHERE r.author = $1 AND r.isdeleted = false;"

    const id = await getIdFromUser(user);
    if(!id) {
        throw new Error(`Unable to find user ${user} from url.`, {cause:404});
    }
    
    const postValues = [id];

    try {
        const result = await pool.query(postQuery, postValues);

        if(!result.rows[0]) {
            return undefined;
        }

        return result.rows;
    } catch (error) {
        console.log(error);
        throw new Error("Unable to retrieve recipe from database.", {cause:500});
    }
}