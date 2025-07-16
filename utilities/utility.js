const Joi = require("joi");

const BlogPost = require("../models/post");

Joi.objectId = require("joi-objectid")(Joi);



const validateUser = ( data ) => {
    // create schema for expected json body
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        age: Joi.number().required(),
        gender: Joi.string().min(4).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(50).required()
    });
    // validate body based on schema
    const result = schema.validate(data);
    // return the result
    return result;
}

const validateUpdateUser = ( data ) => {
    // create schema for expected json body
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        age: Joi.number().required(),
        gender: Joi.string().min(4).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
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
        authorId: Joi.objectId().required()
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
    });
    // validate body based on schema
    const result = schema.validate(data);
    // return the result
    return result;
}
const validateComment = ( data ) => {
    // create schema for expected json body
    const schema = Joi.object({
        text: Joi.string().min(3).max(255).required(),
        authorId: Joi.objectId().required(),
        parentCommentId: Joi.objectId(),
    });
    // validate body based on schema
    const result = schema.validate(data);
    // return the result
    return result;
}

const getAllPostsRecursively = async (page = 1, allPosts = []) => {
    const limit = 3;
    const posts = await BlogPost.find().skip((page - 1) * limit).limit(limit).populate("author", "name");
    
    console.log(`allPosts before check: ${allPosts}`);
    if (posts.length === 0) return allPosts;
    
    allPosts.push(...posts);

    return getAllPostsRecursively(page + 1, allPosts);
};



// Authentication related utilities
const validateLogin = ( data ) => {
    // create schema for expected json body
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });
    // validate body based on schema
    const result = schema.validate(data);
    // return the result
    return result;
}

module.exports.validateUser = validateUser;
module.exports.validateUpdateUser = validateUpdateUser;
module.exports.validateBlogPost = validateBlogPost;
module.exports.validateUpdateBlogPost = validateUpdateBlogPost;
module.exports.validateDeleteBlogPost = validateDeleteBlogPost;
module.exports.getAllPostsRecursively = getAllPostsRecursively;
module.exports.validateComment = validateComment;
module.exports.validateLogin = validateLogin;
