import authService from "../service/auth.service.js";

const register = async( req , res , next ) => {
    try {
        const data = await authService.register(req.body);
        return res.status(200).json(data);
    } catch ( err ) {
        return next( err )
    }
}

const login = async( req , res , next ) =>  {
    try {
        const data = await authService.login(req.body , req.file);
        return res.status(200).json(data);
    } catch (err) {
        return next(err)
    }
}

export { register , login };