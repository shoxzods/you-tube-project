import express from "express";
import mainRouter from "./routers/main.router.js";

const app = express();

app.use(mainRouter);

app.listen(3000 , () => {
    console.log('server is running')
});