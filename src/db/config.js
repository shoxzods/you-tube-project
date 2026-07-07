import { Pool } from "pg";
import { configDotenv } from "dotenv";
configDotenv();

const pool = new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});


function connectDatabase() {
    try {
        pool.connect();
        console.log('database is connected');
    } catch ( err ) {
        console.log(err.message);
    }
}

connectDatabase();
export default pool;