import { pool } from "./db.js";

export default async function getUserFromSlug (slug) {
    try {
        const result = await pool.query("SELECT u.username FROM recipe r "
            + "JOIN user_profile u ON r.author = u.id "
            + "WHERE slug = $1",
            [slug]
        );

        if(!result.rows[0]) return undefined;

        return result.rows[0].username;
    } catch (error) {
        throw new Error("Unable to retrieve user from database.", {cause:500});
    }
}