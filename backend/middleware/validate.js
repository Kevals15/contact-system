const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Unauthorized");
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("Unauthorized");
        }
    }
});

module.exports = validateTokenHandler;