import { pool } from "./db.js";
import getIdFromUser from "./getIdFromUser.js";

export default async function getRecipesFromUser(user, queries) {

    const { category, sort, time } = queries;

    let postQuery = "SELECT json_build_object('slug', slug,'title', title, 'author', u.username, 'createdAt', r.createdat, 'updatedAt', updatedat, "
    + "'category', category, 'post_origin', post_origin, 'description', description, 'body', body, 'media_url', media_url, "
    + "'prep_time', prep_time, 'cook_time', cook_time, 'servings', servings, 'ingredients', ingredients, 'instructions', instructions, "
    + "'post_views', post_views) FROM recipe r JOIN user_profile u ON u.id = r.author WHERE r.author = $1 AND r.isdeleted = false "

    const id = await getIdFromUser(user);
    if(!id) {
        throw new Error(`Unable to find user ${user} from url.`, {cause:404});
    }
    
    const postValues = [id];

    if(category) {
        //Does using lower function reduce optimization? If I already lower category via validation schema...
        postQuery += "AND LOWER(r.category) = $2 ";
        postValues.push(category);
    } 
    
    if(time === 'year') {
        postQuery += "AND (r.createdat > (now() - interval '1 year')) "
    } else if(time === 'month') {
        postQuery += "AND (r.createdat > (now() - interval '1 month')) "
    } else if (time === 'week') {
        postQuery += "AND (r.createdat > (now() - interval '1 week')) "
    }

    //Maintain default sort if doesn't exist
    if(!sort) {
        postQuery += "ORDER BY title ASC ";
    } else {
        if(sort === 'alphabetical') { postQuery += "ORDER BY title ASC "; }
        else if(sort === 'popularity') { postQuery += "ORDER BY post_views DESC "; }
        //Sort by data, taking into account date edited
        else if(sort === 'date') { postQuery += "ORDER BY greatest(r.createdat, r.updatedat) DESC "; }
    }

    try {
        const result = await pool.query(postQuery, postValues);

        if(!result.rows[0]) {
            return undefined;
        }

        return result.rows;
    } catch (error) {
        throw new Error("Unable to retrieve recipe from database.", {cause:500});
    }
}