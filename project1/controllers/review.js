const review=require("../models/review");
const listing = require("../models/listing");

module.exports.addReview=async(req,res)=>{
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
}

module.exports.deleteReview=async(req,res)=>{
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
}