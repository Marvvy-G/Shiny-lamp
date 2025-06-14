const Joi = require("joi");


const validateUser = ( data ) => {
    // create schema for expected json body
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        age: Joi.number().required(),
        gender: Joi.string().min(4).max(50).required(),
    });
    // validate body based on schema
    const result = schema.validate(data);
    // return the result
    return result;
}


module.exports.validateUser = validateUser;