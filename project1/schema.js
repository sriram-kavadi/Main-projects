//set-up for joi
const joi=require("joi")

const listingSchema=joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required(),
    country:joi.string().required(),
    price:joi.number().required().min(0),
    image:joi.string().allow("",null)

})
const reviewSchema=joi.object({
    comment:joi.string().required(),
    rating:joi.number().required()
})

module.exports={listingSchema,reviewSchema}
