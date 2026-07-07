import { BadRequest } from "../utils/errors.js";
import schema from "../utils/validation.js";

function validation( req , res , next ) {
   const body = schema.validate(req.body);
   if ( body.error ) {
      return next( new BadRequest(400 , body.error.message))
   } else if (!body.value) {
      return next(new BadRequest(400 , 'body is required'))
   }

   return next();
}

export default validation;