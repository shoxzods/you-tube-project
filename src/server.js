import express from "express";
import { configDotenv } from "dotenv";
import { join } from "path";
import multer from "multer";
import fs from "fs";
import cors from "cors";

configDotenv();
import mainRouter from "./routers/main.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/uploads" , express.static( join(process.cwd() , "src" , "uploads") ))

app.use(mainRouter);
app.use(/.*/ , ( req , res ) => {
    return res.status(404).json({
        success:false,
        message:"route not found"
    })
})

app.use(( err , req , res , next ) => {
    if ( err instanceof multer.MulterError) {
        if ( err.code.toLowerCase() == 'limit_unexpected_file') {
            return res.status(400).json({
                access:false,
                message:`Only one ${err.field} can be uploaded`
            })
        }

        return next( new BadRequest(400 , err.code.toLowerCase()) )
    }

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