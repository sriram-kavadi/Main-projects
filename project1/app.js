const express = require("express");
const listing = require("./models/listing");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const ejsMate=require("ejs-mate");

app.engine("ejs",ejsMate);
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"));
app.use(express.json()); // for JSON
app.use(express.urlencoded({extended:true}))
const methodOverride = require("method-override");
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

app.get("/listing",async (req,res)=>{
    const allListing=await listing.find();
    res.render("listing/index.ejs",{allListing})
    
})

app.get("/listing/new",(req,res)=>{
    res.render("listing/newindex.ejs");
})

app.post("/listing",async (req,res)=>{
    let newList=new listing(req.body);
    await newList.save();
    res.redirect("/listing");
})

app.get("/listing/:id",async (req,res)=>{
    let { id } = req.params;
    if (id.startsWith(":")) {
        id = id.slice(1);
    }
    const idListing = await listing.findById(id);
    res.render("listing/idIndex.ejs", { i:idListing });

})

app.get("/listing/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let editListing=await listing.findById(id);
    res.render("listing/updateIndex.ejs",{i:editListing});
})

app.put("/listing/:id", async (req, res) => {
    let { id } = req.params; // get id from URL
    let updatedData = req.body; // get updated fields from form
    await listing.findByIdAndUpdate(id, updatedData);
    res.redirect(`/listing/${id}`);
});

app.delete("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listing")
})

app.get("/", (req, res) => {
    res.send("hi, I am root");
});

// Start server
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
