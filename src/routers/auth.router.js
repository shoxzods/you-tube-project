import { Router } from "express";
import pool from "../db/config.js";

const authRouter = Router();

authRouter.post('/register' , async ( req , res ) => {
    console.log('salom');
    const data = await pool.query('select * from users');
})

export default authRouter;