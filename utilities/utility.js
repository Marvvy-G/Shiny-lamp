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

const validateBlogPost = ( data ) => {
    // create schema for expected json body
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        content: Joi.string().required(),
        authorId: Joi.string().required()
    });
    // validate body based on schema
    const result = schema.validate(data);
    // return the result
    return result;
}
const validateUpdateBlogPost = ( data ) => {
    // create schema for expected json body
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        content: Joi.string().required(),
        userId: Joi.string().required()
    });
    // validate body based on schema
    const result = schema.validate(data);
    // return the result
    return result;
}
const validateDeleteBlogPost = ( data ) => {
    // create schema for expected json body
    const schema = Joi.object({
        userId: Joi.string().required()
    });
    // validate body based on schema
    const result = schema.validate(data);
    // return the result
    return result;
}


module.exports.validateUser = validateUser;
module.exports.validateBlogPost = validateBlogPost;
module.exports.validateUpdateBlogPost = validateUpdateBlogPost;
module.exports.validateDeleteBlogPost = validateDeleteBlogPost;