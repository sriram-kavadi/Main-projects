if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}

const express = require("express");
const listing = require("./models/listing");
const review=require("./models/review");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const ejsMate=require("ejs-mate");
//set-up passport passport local packages user
const passport=require("passport");
const LocalStrategy=require("passport-local");
const user=require("./models/user");
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
const  dbURL=process.env.mongoConnection;
const owner=process.env.owner;
const secret=process.env.secret;
main().then(() => {
    console.log("connected to mongoDB");
}).catch(err => {
    console.log(err);
});

//mongodb start-up
async function main() {
    await mongoose.connect(dbURL);
}

//session npm package set-up
const session=require("express-session");

const MongoStore = require('connect-mongo');
const mongoSecret=process.env.mongosecret;
const store=MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:`${mongoSecret}`,
    },
    touchAfter:24*60*60
})
store.on("error", (err) => {
    console.log("Error in Mongo session store", err);
});
const sessionOptions = {
    store: store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,   
        maxAge: 7 * 24 * 60 * 60 * 1000,                
        httpOnly: true
    }
};
app.use(session(sessionOptions))
//flash npm package set-up
const flash=require("connect-flash")
app.use(flash())
//passport 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success")
    res.locals.errorMsg=req.flash("error")
    res.locals.currUser=req.user || null;
    next()
})

//cookie-parser npm package set-up
const cookieParser=require("cookie-parser")

//set-up for the listing route
const listingRoute=require("./routes/listing");
app.use("/listing",listingRoute)
//set-up for review route
const reviewRoute=require("./routes/review")
app.use("/listing/:id/review",reviewRoute);
//set-up for user route
const userRoute=require("./routes/user");
app.use("/",userRoute);
//set-up for search route
const searchRoute=require("./routes/search");
app.use("/search",searchRoute);

app.use("/map",(req,res)=>{
    res.render("listing/map.ejs");
    console.log("map route");
})



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
