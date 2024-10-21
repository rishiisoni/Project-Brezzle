const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
};

module.exports.newRoute = (req, res) => {
    res.render("listings/new.ejs");  
};

module.exports.createRoute = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url ," ", filename);

    const newListing = new Listing(req.body.listing);

    newListing.image = {filename, url};
    newListing.owner = req.user._id;
    // console.log(newListing);

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: { path: "author"}, }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing Not Found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.editRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id); 
    if (!listing) {
        req.flash("error", "Listing Not Found");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });   
};

module.exports.updateRoute = async (req, res) => {
    let { id } = req.params;
    const updatedData = {
        ...req.body.listing
    };

    if (typeof req.file !=="undefined") {
        updatedData.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    }

    await Listing.findByIdAndUpdate(id, updatedData);
    req.flash("success", "Updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyRoute = async (req, res) => {
    let { id } = req.params;
    let deletedItem = await Listing.findByIdAndDelete(id);
    console.log(deletedItem);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};