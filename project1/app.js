const express = require("express");
const listing = require("./models/listing");
const review=require("./models/review");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const ejsMate=require("ejs-mate");

//set-up for joi function
const {listingSchema,reviewSchema}=require("./schema")

//set-up for the wrapAsyc function
const asyncwrap=require("./utils/wrapAsync")
//set-up for the ExpressError class
const ExpressError=require("./utils/ExpressError")
//ejsmate for templates
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
//mongodb start-up
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/project1");
}

//set-up for the listing route
const listingRoute=require("./routes/listing");
app.use("/listing",listingRoute)
//set-up for review route
const reviewRoute=require("./routes/review")
app.use("/listing/:id/review",reviewRoute);

//start-up route
app.get("/", (req, res) => {
    res.send("hi, I am root");
});

//works if route does not exits
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

//throws an error
app.use((err,req,res,next)=>{
    let{status=500,message="something went wrong"}=err;
    res.status(status).render("error.ejs",{err});
})

// Start server
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
