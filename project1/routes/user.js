const express=require("express");
const asyncwrap = require("../utils/wrapAsync");
const User = require("../models/user");
const { route } = require("./listing");
const router=express.Router({mergeParams:true});
router.use(express.json()); // for JSON
router.use(express.urlencoded({extended:true}))
const passport=require("passport")
router.get("/signup",async(req,res)=>{
    res.render("user/signup")
})

router.post("/signup",async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let checkEmail = await User.findOne({ email });
        if (checkEmail) {
            req.flash("error", "Email is already registered");
            return res.redirect("/signup");
        }
        let newuser=new User({
            email:email,
            username:username
        })
        let registration = await User.register(newuser,password)
        if(registration){
            req.flash("success","welcome to wonderLust!")
            res.redirect("/listing")
        }
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }
    
})

router.get("/login",async(req,res)=>{
    res.render("user/login.ejs")
})

router.post("/login",passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
}) ,async(req,res)=>{
    req.flash("success","welcome to wanderLust! you are logged in");
    res.redirect("/listing")

})

module.exports=router