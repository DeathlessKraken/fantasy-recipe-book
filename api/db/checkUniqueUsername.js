import { pool } from "./db.js";

export default async function checkUniqueUsername(username) {
    try {
        const result = await pool.query(
            "SELECT COUNT(DISTINCT username) FROM user_profile WHERE username = $1"
            , [username]);
        
        if(result.rows[0].count > 0){
            throw Error;
        }
    } catch (error) {
        throw new Error('Username is already taken.', {cause: 400});
    }
}