const express = require("express");
const listing = require("./models/listing");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const ejsMate=require("ejs-mate");

//set-up for the wrapAsyc function
const asyncwrap=require("./utils/wrapAsync")
//set-up for the ExpressError class
const ExpressError=require("./utils/ExpressError")

app.engine("ejs",ejsMate);
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"));
app.use(express.json()); // for JSON
app.use(express.urlencoded({extended:true}))
const methodOverride = require("method-override");
const { request } = require("http");
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))
// Connect to MongoDB
main().then(() => {
    console.log("connected to mongoDB");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/project1");
}


app.get("/listing",asyncwrap(async (req,res)=>{
    const allListing=await listing.find();
    if(allListing.length===0){
        throw new ExpressError(404,"No listing found")
    }
    res.render("listing/index.ejs",{allListing})

}))

app.get("/listing/new",(req,res)=>{
    res.render("listing/newindex.ejs");
})

app.post("/listing",asyncwrap(async (req,res)=>{
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ExpressError(400, "Send valid data for listing");
    }
    let newList=new listing(req.body);
    await newList.save();
    res.redirect("/listing");
}))

app.get("/listing/:id",asyncwrap( async (req,res,next)=>{
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    if (id.startsWith(":")) {
        id = id.slice(1);
    }
    const idListing = await listing.findById(id);
    if(!idListing){
        throw new ExpressError(404,"Invalid id");
    }
    res.render("listing/idIndex.ejs", { i:idListing });

}))

app.get("/listing/:id/edit",asyncwrap( async (req,res,next)=>{
    let {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    let editListing=await listing.findById(id);
    if(!editListing){
        throw new ExpressError(404, "Listing not found");
    }
    res.render("listing/updateIndex.ejs",{i:editListing});
}))

app.put("/listing/:id", asyncwrap( async (req, res,next) => {
    let { id } = req.params; // get id from URL
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    let updatedData = req.body; // get updated fields from form
    let putListing= await listing.findByIdAndUpdate(id, updatedData);
    if(!putListing){
        throw new ExpressError(404, "Listing not found");
    }
    res.redirect(`/listing/${id}`);
}));

app.delete("/listing/:id",asyncwrap( async (req,res,next)=>{
    let {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID format");
    }
    let deleteListing= await listing.findByIdAndDelete(id);
    if(!deleteListing){
        throw new ExpressError(404, "Listing not found");
    }
    res.redirect("/listing")
}))


app.get("/", (req, res) => {
    res.send("hi, I am root");
});

app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

app.use((err,req,res,next)=>{
    let{status=500,message="something went wrong"}=err;
    res.status(status).render("error.ejs",{err});
})

// Start server
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
