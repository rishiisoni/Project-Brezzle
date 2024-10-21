const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");


//Render SignUp Form
router.get("/signup", userController.renderSignupForm);

//Sign up User
router.post("/signup", wrapAsync(userController.signupUser));


//Render Login Form 
router.get("/login", userController.renderLoginForm);


//create login user
router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true,}), userController.loginUser)

//Logout user
router.get("/logout", userController.logoutUser);

module.exports = router;