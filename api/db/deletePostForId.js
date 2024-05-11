import { pool } from "./db.js";

export default async function getRecipeFromSlug(userId, slug) {

    const query = "UPDATE recipe SET isdeleted = true "
        + "WHERE author = $1 AND slug = $2 RETURNING isdeleted";

    const values = [userId, slug];

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(query, values);

        await client.query('COMMIT');

        return;
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error("Unable to retrieve recipe from database.", {cause:500});
    } finally {
        client.release();
    }
}