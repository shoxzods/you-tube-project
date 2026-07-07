import { Pool } from "pg";
import { configDotenv } from "dotenv";
import fs from "fs";
import { join } from "path";
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
        fs.appendFileSync(join(process.cwd() , 'src' , 'logger' , 'error.txt') , `\n${new Date().toLocaleDateString()}__err_name:${err.name}___err_message:${err.message}`);
    }
}

connectDatabase();
export default pool;