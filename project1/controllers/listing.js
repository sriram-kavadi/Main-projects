const listing = require("../models/listing");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const fetch = require("node-fetch");
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
// requires: require("node-fetch") and dotenv configured
async function geocode(address) {
  if (!address || !address.trim()) return null;
  const q = encodeURIComponent(address.trim());
  const key = process.env.OPENCAGE_KEY;
  if (!key) {
    console.error("OPENCAGE_KEY not set in .env");
    return null;
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${q}&key=${key}&limit=5&no_annotations=0`;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error("Network error when calling OpenCage:", err);
    return null;
  }

  const text = await res.text();

  if (!res.ok) {
    console.error("OpenCage non-OK HTTP response:", res.status, text);
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(text);
  } catch (err) {
    console.error("OpenCage returned non-JSON:", text);
    return null;
  }

  // OpenCage gives status.code (200) in payload.status
  if (!payload || !payload.status || payload.status.code !== 200) {
    console.error("OpenCage bad status:", payload && payload.status, text);
    return null;
  }

  const results = payload.results || [];
  if (!results.length) {
    // empty results array => no match
    console.warn("OpenCage: no results for address:", address);
    return null;
  }

  // Pick best result:
  // Prefer highest confidence (if provided) else first element.
  let best = results[0];
  for (const r of results) {
    // r.confidence may be undefined; treat higher number as better
    if (typeof r.confidence === "number" && typeof best.confidence === "number") {
      if (r.confidence > best.confidence) best = r;
    } else if (typeof r.confidence === "number" && typeof best.confidence !== "number") {
      best = r;
    }
  }

  // Ensure geometry exists
  if (!best.geometry || typeof best.geometry.lat !== "number" || typeof best.geometry.lng !== "number") {
    console.error("OpenCage: best result missing geometry:", best);
    return null;
  }

  // OPTIONAL: log the formatted address for debugging
  console.log("OpenCage chosen:", best.formatted, "confidence:", best.confidence);

  return {
    lat: best.geometry.lat,
    lng: best.geometry.lng
  };
}



module.exports.postCreate=async (req, res) => {
    console.log("hey!!");
    console.log(req.body);
    // directly use req.body, not req.body.listing
    let url=req.file.path;
    let filename=req.file.filename;
    const newList = new listing(req.body);
    newList.owner=req.user._id;
    newList.image={url,filename};
    let { location } = req.body;
    const coordinates = await geocode(location);
    if(!coordinates){
        req.flash("error","Invalid location");
        return res.redirect("/listing/new")
    }
    console.log(coordinates);
    newList.coordinates = coordinates;
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
    let location = req.body.location;

    if (!location || location.trim() === "") {
        req.flash("error", "Location cannot be empty");
        return res.redirect(`/listing/${id}`);
    }

    let normalizedNew = location.trim().toLowerCase();
    let normalizedOld = existingListing.location.trim().toLowerCase();

    if (normalizedNew !== normalizedOld) {
        const coordinates = await geocode(location);
        if (!coordinates) {
            req.flash("error", "Invalid location");
            return res.redirect(`/listing/${id}`);
        }
        putListing.coordinates = coordinates;
        await putListing.save();
    }
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