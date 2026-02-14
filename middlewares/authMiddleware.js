const jwt = require("jsonwebtoken");
const {success, error} = require("../utils/responseHandler.js");
const {User} = require("../models/UserModel.js");

exports.protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if(!header) return error(res, "No Token Provided", 401)
            const token = header.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if(!user) return error(res, "User not found", 404);
            req.user = user;
            next();
        } catch (error) {
        return error(res, "Invalid Token", 401);
    
    }
}