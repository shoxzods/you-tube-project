import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import mainRouter from "./routers/main.router.js";


const app = express();
app.use(express.json());
app.use(mainRouter);

app.use(( err , req , res , next ) => {
    console.log('error')
})
app.listen(process.env.PORT , () => {
    console.log('server is running')
});