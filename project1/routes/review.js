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
const controllerReview=require("../controllers/review")
//post request to create a new review
router.post("/",isLoggedIn,reviewValidate,asyncwrap(controllerReview.addReview))
//review delete route 
router.delete("/:reviewId",isLoggedIn,isAuthor,asyncwrap(controllerReview.deleteReview))

module.exports=router;