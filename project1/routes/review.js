const express=require("express")
const router=express.Router({mergeParams:true});
//set-up for the wrapAsyc function
const asyncwrap=require("../utils/wrapAsync")
//getting listing Model
const listing = require("../models/listing");
//getting review model
const review=require("../models/review");
//set-up for the ExpressError class
const ExpressError=require("../utils/ExpressError")
//set-up for joi function
const {listingSchema,reviewSchema}=require("../schema")
const mongoose = require("mongoose");

//joi validation checker set-up
const reviewValidate=(req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }
}
//post request to create a new review
router.post("/",reviewValidate,asyncwrap(async(req,res)=>{
    let {id}=req.params;
    const newReview = new review(req.body);
    await newReview.save();
    console.log("done")
    if (id.startsWith(":")) {
        id = id.slice(1);
    }
    const updatedListing = await listing.findByIdAndUpdate(
        id,
        { $push: { reviews: newReview._id } },
        { new: true, runValidators: true }
    )
    if(!updatedListing){
        throw new ExpressError(404,"Listing not found");
    }
    console.log("completed :)")
    res.redirect(`/listing/${id}`);
}))

//review delete route 
router.delete("/:reviewId",asyncwrap(async(req,res)=>{
    let {id,reviewId}=req.params;
    if ((!mongoose.Types.ObjectId.isValid(id))||(!mongoose.Types.ObjectId.isValid(reviewId))) {
        throw new ExpressError(400, "Invalid ID format");
    }
    let listingUpdate=await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    let reviewDelete=await review.findByIdAndDelete(reviewId);
    if(!listingUpdate){
        throw new ExpressError(404,"Listing not found");
    }
    if(!reviewDelete){
        throw new ExpressError(404,"Review not found");
    }
    res.redirect(`/listing/${id}`)
    console.log("success!!")
}))

module.exports=router;