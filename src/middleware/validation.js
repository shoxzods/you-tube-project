import { BadRequest } from "../utils/errors.js";
import schema from "../utils/validation.js";
import multer from "multer";

function validation( err , req , res , next ) {
    if ( err instanceof multer.MulterError) {
        if ( err.code.toLowerCase() == 'limit_unexpected_file') {
            return next(new BadRequest(400 , `Only one ${err.field} can be uploaded`))         
        }

        return next( new BadRequest(400 , err.code.toLowerCase()) )
    }
    
    const body = schema.validate(req.body);

    if ( body.error ) {
       return next( new BadRequest(400 , body.error.message))
    } else if (!body.value) {
       return next(new BadRequest(400 , 'body is required'))
    }

   return next();
}

export default validation;