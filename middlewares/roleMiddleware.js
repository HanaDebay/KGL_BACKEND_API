const {success, error} = require("../utils/responseHandler.js"); 

exports.authorizeRoles = (...roles) => {    
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return error(res, "Access Denied: You are not authorized to perform this action", 403);
        }
        next();
    };
};