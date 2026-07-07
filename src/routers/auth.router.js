import { Router } from "express";
import pool from "../db/config.js";

const authRouter = Router();

authRouter.post('/register' , async ( req , res ) => {
    console.log('salom');
    await pool.query('select * from ');
})

export default authRouter;