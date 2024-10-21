const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");


// Review Route
//post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


// //Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;