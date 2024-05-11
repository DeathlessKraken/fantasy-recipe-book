import { pool } from "./db.js";

export default async function checkPostExistsFromSlug (slug) {
    try {
        const result = await pool.query(
            "SELECT isdeleted FROM recipe WHERE slug = $1",
            [slug]
        );

        if(!result.rows[0]) throw Error;

        return !result.rows[0].isdeleted;
    } catch (error) {
        throw new Error("Unable to retrieve information from database.", {cause:500});
    }
}