import { Router } from "express";
import multer from "multer";
import { join } from "path";
import validation from "../middleware/validation.js";
import { register , login } from "../controllers/auth.controller.js";

const authRouter = Router();
const storage = multer.diskStorage({
    destination( req , file , cb ) {
        cb(null , join(process.cwd() , "src" , "uploads") )
    },

    filename( _ , file , cb ) {
        cb(null ,  Date.now() + '.' + file.mimetype.split('/')[1] )
    }
})

const upload = multer({storage});

authRouter.post('/register' , upload.single('image') , validation , register)
          .post('/login' , validation , login )

export default authRouter;