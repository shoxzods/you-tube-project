import schema from "../utils/validation.js";

function validation( req , res , next ) {
   const body = schema.validate(req.body);
   console.log(body);
}

export default validation;