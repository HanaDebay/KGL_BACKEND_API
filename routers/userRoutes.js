const router = require("express").Router();
const User  = require("../models/UserModel.js");
const bcrypt = require("bcrypt");


const generateToken = require("../utils/generateToken.js");
const {success, error} = require("../utils/responseHandler.js");



//register user
router.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashed, //replace plain text with hash
    });

    success(res,  user, "User Created Successfully");
  } catch (err) {
    error(res, "Error Creating user", 500);
  }
});

//login user
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user)
            return error(res, 404, "User not found");
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match)
            return error(res, 401, "Invalid credentials");
        const token = generateToken(user._id, user.role);
        success(res, {user, token}, "Login Successful")
        
    } catch (err) {

        error(res, "Error logging in", 500);
    }
    
})



module.exports = router;