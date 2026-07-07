import sha256 from "sha256";
import JWT from "jsonwebtoken";
import pool from "../db/config.js";
import { ConfilctError, NotFound } from "../utils/errors.js";

const register = async( req , res , next ) => {
    const { full_name , password } = req.body;
    const img = !req.file ? null : Date.now() + '.' + req.file.mimetype.split('/')[1];
    const hash_pass = sha256(password);
    const data = await pool.query('select * from users where user_name = $1 and password = $2' , [ full_name , hash_pass ]);

    if ( data.rowCount )
        return next(new ConfilctError(409 , 'user already exist'))

    const user = await pool.query('insert into users ( user_name , password , image ) values( $1 , $2 , $3 ) returning *' , [ full_name , hash_pass  , img ]);

    return res.status(200).json({
        success:true,
        accessToken: JWT.sign({ id: user.id } , process.env.SECRET_KEY , { expiresIn:"15m"})
    })
}

const login = async( req , res , next ) =>  {
    const { full_name , password } = req.body;
    const hash_pass = sha256(password);
    const users = await pool.query(`select * from users where user_name = $1 and password = $2 ` , [ full_name , hash_pass ]);

    if (!users.rowCount)
        return next(new NotFound(404 , 'user not found'))

    const oneUser = users.rows[0];

    return res.status(200).json({
        success:true,
        accessToken: JWT.sign({ id:oneUser.id } , process.env.SECRET_KEY , {expiresIn:"15m"})
    })
}

export { register , login };