const verifyAdminRole = (req, res, next) => {
    // grab the isAdmin value from the user details gotten from the token
    if(req.user.role !== "ADMIN") return res.status(403).send("Access denied: You are not an admin");
    next();
}

module.exports = verifyAdminRole;