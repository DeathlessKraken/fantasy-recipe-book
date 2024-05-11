import { pool } from "./db.js";

export default async function getHashedPasswordFromUser(user) {
    try {
        const result = await pool.query(
            "SELECT user_password FROM user_profile WHERE username = $1"
            , [user]
        );

        if(!result.rows[0]) {
            return undefined;
        }

        return result.rows[0].user_password;
    } catch (error) {
        throw new Error('Error reading database.', {cause: 500});
    }
}