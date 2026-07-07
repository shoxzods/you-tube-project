import { Router } from "express";

const authRouter = Router();


authRouter.post('/register' , () => {
    console.log('salom')
})

export default authRouter;