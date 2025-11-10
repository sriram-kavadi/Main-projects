const express=require("express");
const router=express.Router();
//set-up for the wrapAsyc function
const asyncwrap=require("../utils/wrapAsync")
//getting listing Model
const listing = require("../models/listing");
//set-up for the ExpressError class
const ExpressError=require("../utils/ExpressError")
//set-up for joi function
const {listingSchema,reviewSchema}=require("../schema")
const mongoose = require("mongoose");
// isLoggedIn middleware
const {isLoggedIn}=require("../middleware");
// isOwner middleware
const {isOwner}=require("../middleware")
const controllerListing=require("../controllers/listing")
//view listing
router.get("/",asyncwrap(controllerListing.index))

//create listing
router.get("/new",isLoggedIn,controllerListing.creatingListing)

// validate middleware
const {validate}=require("../middleware")

//post request for creating list
router.post("/",isLoggedIn,validate,asyncwrap(controllerListing.postCreate));

//get list by a id
router.get("/:id",asyncwrap( controllerListing.getIdList))

//edit a list using a id
router.get("/:id/edit",isLoggedIn,asyncwrap( controllerListing.getIdEditList))

// updating the list using the id
router.put("/:id",isLoggedIn,isOwner,validate, asyncwrap( controllerListing.putEditList));

//deleting a list by using id
router.delete("/:id",isLoggedIn,isOwner,asyncwrap( controllerListing.deleteList))


module.exports=router;