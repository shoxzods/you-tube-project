import sha256 from "sha256";
import JWT from "jsonwebtoken";
import pool from "../db/config.js";
import { NotFound , ConfilctError} from "../utils/errors.js";

async function login(body) {
    const { full_name , password } = body;
    const hash_pass = sha256(password);
    const users = await pool.query(`select * from users where user_name = $1 and password = $2 ` , [ full_name , hash_pass ]);

    if (!users.rowCount)
        throw new NotFound(404 , 'user not found');

    const oneUser = users.rows[0];

    return {
        success:true,
        accessToken: JWT.sign({ id:oneUser.id } , process.env.SECRET_KEY , {expiresIn:"15m"})
    };
}
 
async function register(body , file) {
    const { full_name , password } = body;
    const img = !file ? null : Date.now() + '.' + file.mimetype.split('/')[1];

    const hash_pass = sha256(password);
    const data = await pool.query('select * from users where user_name = $1 and password = $2' , [ full_name , hash_pass ]);

    if ( data.rowCount )
        throw new ConfilctError(409 , 'user already exist')

    const user = await pool.query('insert into users ( user_name , password , image ) values( $1 , $2 , $3 ) returning *' , [ full_name , hash_pass  , img ]);

    return {
        success:true,
        accessToken: JWT.sign({ id: user.id } , process.env.SECRET_KEY , { expiresIn:"15m"})
    }
}

export default { login , register };