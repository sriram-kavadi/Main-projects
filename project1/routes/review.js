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
// isLoggedIn middleware
const {isLoggedIn}=require("../middleware")
//joi validation checker middleware
const {reviewValidate}=require("../middleware")
// isAuthor middleware set-up
const {isAuthor}=require("../middleware")
//post request to create a new review
router.post("/",isLoggedIn,reviewValidate,asyncwrap(async(req,res)=>{
    let {id}=req.params;
    const newReview = new review(req.body);
    newReview.author=req.user._id;
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
    if(updatedListing){
        req.flash("success","Review is added");
    }
    console.log("completed :)")
    res.redirect(`/listing/${id}`);
}))

//review delete route 
router.delete("/:reviewId",isLoggedIn,isAuthor,asyncwrap(async(req,res)=>{
    let {id,reviewId}=req.params;
    let listingUpdate=await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    let reviewDelete=await review.findByIdAndDelete(reviewId);
    if(!listingUpdate){
        throw new ExpressError(404,"Listing not found");
    }
    if(!reviewDelete){
        throw new ExpressError(404,"Review not found");
    }
    if(reviewDelete){
        req.flash("success","Review is deleted")
    }
    res.redirect(`/listing/${id}`)
    console.log("success!!")
}))

module.exports=router;