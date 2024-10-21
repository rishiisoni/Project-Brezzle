const express = require("express");
const router = express.Router( { mergeParams: true } );
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// Index Route
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new",isLoggedIn, listingController.newRoute);

// Create Route
//router.post("/", isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createRoute));

router.post("/", isLoggedIn, (req, res, next) => {
    console.log("User is logged in");
    next();
}, upload.single("listing[image]"), (req, res, next) => {
    console.log("File upload completed");
    next();
}, validateListing, (req, res, next) => {
    console.log("Listing validation completed");
    next();
}, wrapAsync(listingController.createRoute));


// Show Route
router.get("/:id", wrapAsync(listingController.showRoute));

// Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.editRoute));

// Update Route
router.put("/:id",isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateRoute));

// Delete Route
router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.destroyRoute));


module.exports = router;