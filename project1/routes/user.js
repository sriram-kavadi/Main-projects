const express=require("express");
const asyncwrap = require("../utils/wrapAsync");
const User = require("../models/user");
const { route } = require("./listing");
const router=express.Router({mergeParams:true});
router.use(express.json()); // for JSON
router.use(express.urlencoded({extended:true}))
const passport=require("passport")
const {saveRedirectUrl}=require("../middleware")
const controllerUser=require("../controllers/user")

router
    .route("/signup")
    .get(controllerUser.getUser)
    .post(controllerUser.getSignUp)

router
    .route("/login")
    .get(controllerUser.getLogin)
    .post(saveRedirectUrl,passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }),controllerUser.postLogin)

router.get("/logout",controllerUser.getLogout)

module.exports=router