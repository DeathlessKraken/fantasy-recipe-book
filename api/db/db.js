import pg from 'pg';

//Uses environment variables by default.
const pool = new pg.Pool({
    connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client.', err);
    process.exitCode(-1);
});

export async function getUsers() {
    try {
        const result = await pool.query("SELECT * FROM user_profile");
        return result.rows;
    } catch (error) {
        console.error('Error retrieving users from db', error);
        throw new Error('Error retrieving users from db');
    }
}