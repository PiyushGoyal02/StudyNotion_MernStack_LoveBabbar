const express = require("express");
const router = express.Router();

const  {
    sendOTP,
    signUp,
    login,
    changePassword } = require("../Cantrollers/Auth");

const {
    resetPasswordToken,
    resetPassword } = require("../Cantrollers/ResetPassword");

const {auth} = require("../MiddleWare/authMiddleWare");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// *****************************************************https://api.dicebear.com/5.x/initials/svg?seed=PiyushGoyal***************************************************


// Route for user login
router.post("/signin", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router