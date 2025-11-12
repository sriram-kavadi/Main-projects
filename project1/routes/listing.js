
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
// validate middleware
const {validate}=require("../middleware")
const multer=require("multer")
const {storage}=require("../cloudConfig")
const upload=multer({storage})

//view listing and post listing
router
    .route("/")
    .get(asyncwrap(controllerListing.index))
    .post(isLoggedIn,upload.single("image"),validate,asyncwrap(controllerListing.postCreate))

//create listing
router.get("/new",isLoggedIn,controllerListing.creatingListing)
//get put delete list by a id
router
    .route("/:id")
    .get(asyncwrap( controllerListing.getIdList))
    .put(isLoggedIn,isOwner,upload.single("image"),validate, asyncwrap( controllerListing.putEditList))
    .delete(isLoggedIn,isOwner,asyncwrap( controllerListing.deleteList))

router.get("/:id/edit",isLoggedIn,asyncwrap( controllerListing.getIdEditList))

module.exports=router;