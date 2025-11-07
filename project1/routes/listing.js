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

//view listing
router.get("/",asyncwrap(async (req,res)=>{
    const allListing=await listing.find();
    if(allListing.length===0){
        throw new ExpressError(404,"No listing found")
    }
    res.render("listing/index.ejs",{allListing})

}))

//create listing
router.get("/new",(req,res)=>{
    res.render("listing/newindex.ejs");
})


// post validate check for create listing
const validate=(req,res,next)=>{
    const {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }

}

//post request for creating list
router.post("/",validate,asyncwrap( async (req, res) => {
    // directly use req.body, not req.body.listing
    const newList = new listing(req.body);
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
    const idListing = await listing.findById(id).populate("reviews");
    if(!idListing){
        throw new ExpressError(404,"Invalid id");
    }
    res.render("listing/idIndex.ejs", { i:idListing });

}))

//edit a list using a id
router.get("/:id/edit",asyncwrap( async (req,res,next)=>{
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
router.put("/:id", asyncwrap( async (req, res,next) => {
    let { id } = req.params; // get id from URL
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    let updatedData = req.body; // get updated fields from form
    let putListing= await listing.findByIdAndUpdate(id, updatedData);
    if(!putListing){
        throw new ExpressError(404, "Listing not found");
    }
    if(putListing){
        req.flash("success","Listing is updated");
    }
    res.redirect(`/listing/${id}`);
}));

//deleting a list by using id
router.delete("/:id",asyncwrap( async (req,res,next)=>{
    let {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
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