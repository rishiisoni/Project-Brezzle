const User = require("../models/user.js");

module.exports.renderSignupForm =  (req, res) =>{
    res.render("user/signup.ejs");
};

module.exports.signupUser = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User( {username, email} );
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", `Welcome ${username} !!`)
            res.redirect("/listings");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.loginUser = async(req, res) => {
    req.flash("success", "Welcome back !!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout( (err) => {
        if(err){
            return next(err);
        }
        else {
            req.flash("success", "logged out");
            res.redirect("/listings");
        }
    })
};