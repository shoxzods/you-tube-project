import joi from "joi";

const schema = joi.object({
    full_name:joi.string().required(),
    password:joi.string().required(),
})

export default schema;