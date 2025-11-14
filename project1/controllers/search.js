const listing = require("../models/listing");
const mongoose = require("mongoose");

module.exports.searchData=async(req,res)=>{
    let{searchList}=req.query;
    let data = await listing.find({
        title: { $regex: searchList, $options: "i" }
    });
    if(data.length==0){
        req.flash("error","No Listing Exist");
        return res.redirect("/listing")
    }
    res.render("listing/search.ejs",{data:data,searchList:searchList});
}

module.exports.searchFilters=async(req,res)=>{
    let {filter}=req.params;
    let data = await listing.find({category: filter});
    if(data.length==0){
        req.flash("error","No Listing Under This Category")
        return res.redirect("/listing")
    }
    res.render("listing/search.ejs",{data:data,searchList:"none"});
}