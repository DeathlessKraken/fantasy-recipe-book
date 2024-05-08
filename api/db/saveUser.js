import { pool } from "./db.js";

export default async function saveUser({
    email, username, password, createdAt, role
}) {
    const client = await pool.connect();
    
    try {

        await client.query('BEGIN');
        const query = "INSERT INTO user_profile (email, username, user_password, createdat, user_role, isDeleted) VALUES ($1, $2, $3, $4, $5, $6)";
        const values = [email, username, password, createdAt, role, false];

        await client.query(query, values);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error("Unable to save user to database.", {cause: 500});
    } finally {
        client.release();    
    }
}