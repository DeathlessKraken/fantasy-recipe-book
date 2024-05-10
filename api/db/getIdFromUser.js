import { pool } from "./db.js";

export default async function getIdFromUser (user) {
    try {
        const result = await pool.query(
            "SELECT id FROM user_profile WHERE username = $1",
            [user]
        );

        return result.rows[0];
    } catch (error) {
        throw new Error("Unable to retrieve user from database.", {cause:500});
    }
}