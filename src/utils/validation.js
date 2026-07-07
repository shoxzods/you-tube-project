import joi from "joi";

const schema = joi.object({
    full_name:joi.string().required().min(5).trim(),
    password:joi.string().required().min(4).trim()
});

export default schema;