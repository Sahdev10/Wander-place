const Joi = require('joi');

module.exports.listingschema = Joi.object({
    listing : Joi.object({
         title:Joi.string().required(),
         description:Joi.string().required(),
         price:Joi.number().required().min(0),
         country:Joi.string().required(),
         location:Joi.string().required(),
         image:Joi.string().allow("",null)
    }).required()
})

module.exports.reviewShema = Joi.object({
    review: Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required(),

    }).required()
})