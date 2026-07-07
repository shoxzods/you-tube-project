import express from "express";
import { configDotenv } from "dotenv";
import { join } from "path";
import fs from "fs";

configDotenv();
import mainRouter from "./routers/main.router.js";


const app = express();
app.use(express.json());
app.use(mainRouter);

app.use(( err , req , res , next ) => {
    if ( err.status !== 500 ) {
        fs.appendFileSync(join(process.cwd() , 'src' , 'logger' , 'error.txt') , `\n${new Date()}___error-name:${err.name}__error-message:${err.message}`)
        return res.status(err.status).json({
            success:false,
            message:err.message
        })
    } else {
        return res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
});

app.listen(process.env.PORT , () => {
    console.log('server is running')
});