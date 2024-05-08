import { pool } from "./db.js";

export default async function checkUniqueEmail(email) {
    try {
        const result = await pool.query(
            "SELECT COUNT(DISTINCT email) FROM user_profile WHERE email = $1"
            , [email]);
            
        if(result.rows[0].count > 0){
            throw Error;
        }
    } catch (error) {
        throw new Error('Email is already in use.', {cause: 400});
    }
}