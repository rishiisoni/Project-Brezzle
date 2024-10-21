const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const expressError = require("./utils/expressError.js")
const { listingSchema, reviewSchema} = require("./schema.js");

// module.exports.isLoggedIn = (req, res, next) => {
//     console.log("islogedin");
//     if(!req.isAuthenticated()){
//         req.session.redirectUrl = req.originalUrl.split("?")[0];
//         console.log(req.originalUrl);
//         req.flash("error", "You must login first");
//         return res.redirect("/login");
//     }
//     next();
// }

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //console.log(req.originalUrl);
        // Extract the base URL by capturing only the `/listings/:id` part
        const baseUrl = req.originalUrl.split('/reviews')[0];
        req.session.redirectUrl = baseUrl;
        // Log the stored redirect URL for debugging
        //console.log(req.session.redirectUrl);
        req.flash("error", "You must login first");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req, res, next) => {
    //console.log("save redirected url");
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        //console.log(res.locals.redirectUrl);
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log(res.locals.currUser);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have the authorization");
        return res.redirect(`/listings/${id}`);
    }

    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async(req, res, next) => {
    //console.log("is Review author");
    let { id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    //console.log(res.locals.currUser);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have the authorization");
        return res.redirect(`/listings/${id}`);
    }

    next();
}