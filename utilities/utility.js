const Joi = require("joi");
const BlogPost = require("../models/post");


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

const getAllPostsRecursively = async (page = 1, allPosts = []) => {
    const limit = 3;
    const posts = await BlogPost.find().skip((page - 1) * limit).limit(limit).populate("author", "name");
    
    console.log(`allPosts before check: ${allPosts}`);
    if (posts.length === 0) return allPosts;
    
    allPosts.push(...posts);

    return getAllPostsRecursively(page + 1, allPosts);
};


module.exports.validateUser = validateUser;
module.exports.validateBlogPost = validateBlogPost;
module.exports.validateUpdateBlogPost = validateUpdateBlogPost;
module.exports.validateDeleteBlogPost = validateDeleteBlogPost;
module.exports.getAllPostsRecursively = getAllPostsRecursively;
