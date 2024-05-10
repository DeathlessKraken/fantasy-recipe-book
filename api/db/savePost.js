import { pool } from "./db.js";
import getIdFromUser from "./getIdFromUser.js";

export default async function savePost({
    user,
    title,
    createdat,
    post_views,
    isdeleted,
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
}) {
    const client = await pool.connect();

    const id = await getIdFromUser(user);
    console.log(id);
}