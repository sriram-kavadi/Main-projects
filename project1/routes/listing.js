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
//view listing
router.get("/",asyncwrap(async (req,res)=>{
    console.log(req.user)
    const allListing=await listing.find();
    if(allListing.length===0){
        throw new ExpressError(404,"No listing found")
    }
    res.render("listing/index.ejs",{allListing})

}))

//create listing
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listing/newindex.ejs");
})

// validate middleware
const {validate}=require("../middleware")

//post request for creating list
router.post("/",isLoggedIn,validate,asyncwrap( async (req, res) => {
    // directly use req.body, not req.body.listing
    const newList = new listing(req.body);
    newList.owner=req.user._id;
    await newList.save();
    if(newList){
        req.flash("success","Listing is created");
    }
    res.redirect("/listing");
}));

//get list by a id
router.get("/:id",asyncwrap( async (req,res,next)=>{
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    if (id.startsWith(":")) {
        id = id.slice(1);
    }
    const idListing = await listing.findById(id).populate("reviews").populate("owner");
    console.log(idListing);
    console.log(req.user);
    if(!idListing){
        throw new ExpressError(404,"Invalid id");
    }
    res.render("listing/idIndex.ejs", { i:idListing ,owner:idListing.owner.username,rightUser:req.user});

}))

//edit a list using a id
router.get("/:id/edit",isLoggedIn,asyncwrap( async (req,res,next)=>{
    let {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    let editListing=await listing.findById(id);
    if(!editListing){
        throw new ExpressError(404, "Listing not found");
    }
    if(editListing){
        req.flash("success","Listing is edited")
    }
    res.render("listing/updateIndex.ejs",{i:editListing});
}))

// updating the list using the id
router.put("/:id",isLoggedIn,isOwner,validate, asyncwrap( async (req, res,next) => {
    let {id}=req.params;
    let updatedData = req.body;
    let putListing= await listing.findByIdAndUpdate(id, updatedData,{ new: true, runValidators: true });
    if(!putListing){
        throw new ExpressError(404, "Listing not found");
    }
    if(putListing){
        req.flash("success","Listing is updated");
    }
    res.redirect(`/listing/${id}`);
}));

//deleting a list by using id
router.delete("/:id",isLoggedIn,isOwner,asyncwrap( async (req,res,next)=>{
    let {id}=req.params;
    let deleteListing= await listing.findByIdAndDelete(id);
    if(!deleteListing){
        throw new ExpressError(404, "Listing not found");
    }
    if(deleteListing){
        req.flash("success","Listing is deleted")
    }
    res.redirect("/listing")
}))


module.exports=router;