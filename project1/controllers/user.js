const User = require("../models/user");

module.exports.getUser=async(req,res)=>{
    res.render("user/signup")
}

module.exports.getSignUp=async(req,res)=>{
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
        req.login(registration,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wonderLust!")
            res.redirect("/listing")
        })
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }
}

module.exports.getLogin=async(req,res)=>{
    res.render("user/login.ejs")
}

module.exports.postLogin=async(req,res)=>{
    req.flash("success","welcome to wanderLust! you are logged in");
    let redirectUrl=res.locals.redirectUrl||"/listing"
    res.redirect(redirectUrl)
}

module.exports.getLogout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            throw next(err);
        }
        req.flash("success","You are logged out!!");
        res.redirect("/listing");
    })
}