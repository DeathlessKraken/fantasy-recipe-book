import pg from 'pg';

//Uses environment variables by default.
const pool = new pg.Pool({
    connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client.', err);
    process.exitCode(-1);
});

export { pool };