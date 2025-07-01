const jwt = require("jsonwebtoken");
const config = require("config");

const verifyAuthToken = ( req, res, next ) => {
    const authToken = req.headers.authorization?.split(" ")[1];
    // check if bearer token is even included
    if(!authToken) return res.status(401).send("Access denied! No token provided.");
    
    // verify token
    try {
        const decoded = jwt.verify(authToken, config.get("blog_jwtPrivateKey"));
        //  attach decoded details to the user request
        req.user = decoded;
        // move on
        next();
    } catch (ex) {
        console.error(`Invalid token: ${ex}`);
        return res.status(400).send("Invalid token!");
    }
}

module.exports = verifyAuthToken;