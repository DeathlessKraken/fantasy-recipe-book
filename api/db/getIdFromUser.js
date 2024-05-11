import { pool } from "./db.js";

export default async function getIdFromUser (user) {
    try {
        const result = await pool.query(
            "SELECT id FROM user_profile WHERE username = $1",
            [user]
        );

        if(!result.rows[0]) {
            return undefined;
        }

        return result.rows[0].id;
    } catch (error) {
        throw new Error("Unable to retrieve user from database.", {cause:500});
    }
}