const mongoose = require("mongoose");
const listing = require("./models/listing");
const {listingSchema,reviewSchema}=require("./schema")
const ExpressError=require("./utils/ExpressError")
module.exports.isLoggedIn=(req,res,next)=>{
    console.log("hello")
    console.log(req.originalUrl)
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must to be logged")
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    let list=await listing.findById(id);
    if(!list.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing")
        return res.redirect(`/listing/${id}`);
    }
    next()
}

module.exports.validate=(req,res,next)=>{
    const {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }
}

module.exports.reviewValidate=(req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map(el=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }
}