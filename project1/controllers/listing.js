const listing = require("../models/listing");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
module.exports.index=async (req,res)=>{
    console.log(req.user)
    const allListing=await listing.find();
    if(allListing.length===0){
        throw new ExpressError(404,"No listing found")
    }
    res.render("listing/index.ejs",{allListing})
}

module.exports.creatingListing=(req,res)=>{
    res.render("listing/newindex.ejs");
}

module.exports.postCreate=async (req, res) => {
    // directly use req.body, not req.body.listing
    let url=req.file.path;
    let filename=req.file.filename;
    const newList = new listing(req.body);
    newList.owner=req.user._id;
    newList.image={url,filename};
    await newList.save();
    if(newList){
        req.flash("success","Listing is created");
    }
    res.redirect("/listing");
}

module.exports.getIdList=async (req,res,next)=>{
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    if (id.startsWith(":")) {
        id = id.slice(1);
    }
    const idListing = await listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
        path: "author"
        }
    })
    .populate("owner");
    if(!idListing){
        throw new ExpressError(404,"Invalid id");
    }
    res.render("listing/idIndex.ejs", { i:idListing ,owner:idListing.owner.username,rightUser:req.user});

}

module.exports.getIdEditList=async (req,res,next)=>{
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
}

module.exports.putEditList = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    const existingListing = await listing.findById(id);
    if (!existingListing) {
      throw new ExpressError(404, "Listing not found");
    }
    const originalFilename = existingListing.image.filename;
    const putListing = await listing.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      if (originalFilename && originalFilename !== "listingimage") {
        await cloudinary.uploader.destroy(originalFilename);
      }
      putListing.image = { url, filename };
      await putListing.save();
    }
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
};


module.exports.deleteList=async (req,res,next)=>{
    let {id}=req.params;
    let deleteListing= await listing.findByIdAndDelete(id);
    if(!deleteListing){
        throw new ExpressError(404, "Listing not found");
    }
    if(deleteListing){
        req.flash("success","Listing is deleted")
    }
    res.redirect("/listing")
}