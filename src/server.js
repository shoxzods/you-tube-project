import express from "express";
import { configDotenv } from "dotenv";
configDotenv();

import mainRouter from "./routers/main.router.js";

const app = express();

app.use(mainRouter);

app.listen(process.env.PORT , () => {
    console.log('server is running')
});