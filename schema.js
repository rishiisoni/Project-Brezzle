const Joi = require("joi");

const listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price : Joi.string().required(),
        image: Joi.object({
            filename: Joi.string().allow("", null),
            url: Joi.string().allow("", null)
        }).allow("", null), // Updated to expect an object with 'url' and 'filename'
    }).required()
});

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
    }).required()
});

module.exports = { listingSchema, reviewSchema };
