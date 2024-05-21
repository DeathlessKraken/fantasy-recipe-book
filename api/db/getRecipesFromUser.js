import { pool } from "./db.js";
import getIdFromUser from "./getIdFromUser.js";

export default async function getRecipesFromUser(user, queries) {

    const { category, sort, time, search } = queries;

    let postQuery = "SELECT json_build_object('slug', slug,'title', title, 'author', u.username, 'createdAt', r.createdat, 'updatedAt', updatedat, "
    + "'category', category, 'post_origin', post_origin, 'description', description, 'body', body, 'media_url', media_url, "
    + "'prep_time', prep_time, 'cook_time', cook_time, 'servings', servings, 'ingredients', ingredients, 'instructions', instructions, "
    + "'post_views', post_views) FROM recipe r JOIN user_profile u ON u.id = r.author WHERE r.author = $1 AND r.isdeleted = false ";

    let searchQuery = 
    "WITH search_ranks AS (SELECT id, (ts_rank(searchable, websearch_to_tsquery('english', $2))) FROM recipe "
    + "ORDER BY ts_rank ASC) "
    + "SELECT json_build_object('slug', slug,'title', title, 'author', u.username, 'createdAt', r.createdat, 'updatedAt', updatedat, "
    + "'category', category, 'post_origin', post_origin, 'description', description, 'body', body, 'media_url', media_url, "
    + "'prep_time', prep_time, 'cook_time', cook_time, 'servings', servings, 'ingredients', ingredients, 'instructions', instructions, "
    + "'post_views', post_views) FROM recipe r "
    + "JOIN user_profile u ON u.id = r.author "
    + "JOIN search_ranks s ON s.id = r.id "
    + "WHERE r.author = $1 AND r.isdeleted = false AND ts_rank > 0.0001 ";

    const id = await getIdFromUser(user);
    if(!id) {
        throw new Error(`Unable to find user ${user} from url.`, {cause:404});
    }
    
    const postValues = [id];
    if(search) postValues.push(search);

    if(category) {
        //Does using lower function reduce optimization? If I already lower category via validation schema...
        if(search) {
            searchQuery += "AND LOWER(r.category) = $3 ";
            postValues.push(category);
        }
        else {
            postQuery += "AND LOWER(r.category) = $2 ";
            postValues.push(category);
        }
    } 

    if(time === 'year') {
        if(search) {searchQuery += "AND (r.createdat > (now() - interval '1 year')) ";}
        else {postQuery += "AND (r.createdat > (now() - interval '1 year')) ";}
    } else if(time === 'month') {
        if(search) {searchQuery += "AND (r.createdat > (now() - interval '1 month')) ";}
        else {postQuery += "AND (r.createdat > (now() - interval '1 month')) ";}
    } else if (time === 'week') {
        if(search) {searchQuery += "AND (r.createdat > (now() - interval '1 week')) ";}
        else {postQuery += "AND (r.createdat > (now() - interval '1 week')) ";}
    }

    //Maintain default sort if doesn't exist
    if(search && !sort) searchQuery += "ORDER BY s.ts_rank DESC";
    if(!sort) {
        postQuery += "ORDER BY title ASC ";
    } else if (search) {
        searchQuery += "ORDER BY s.ts_rank DESC";
        if(sort === 'alphabetical') { searchQuery += ", title ASC "; }
        else if(sort === 'popularity') { searchQuery += ", post_views DESC "; }
        //Sort by data, taking into account date edited
        else if(sort === 'date') { searchQuery += ", greatest(r.createdat, r.updatedat) DESC "; }
    } else {
        if(sort === 'alphabetical') { postQuery += "ORDER BY title ASC "; }
        else if(sort === 'popularity') { postQuery += "ORDER BY post_views DESC "; }
        //Sort by data, taking into account date edited
        else if(sort === 'date') { postQuery += "ORDER BY r.createdat DESC "; }
    }

    try {

        console.log(postValues);

        let result = undefined;
        if(search) {
            result = await pool.query(searchQuery, postValues);
        } else {
            if(postValues) {
                result = await pool.query(postQuery, postValues);
            } else {
                result = await pool.query(postQuery);
            }
        }

        return result.rows;
    } catch (error) {
        throw new Error("Unable to retrieve recipe from database.", {cause:500});
    }
}