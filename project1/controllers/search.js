const listing = require("../models/listing");
const mongoose = require("mongoose");

module.exports.searchData=async(req,res)=>{
    let{searchList}=req.query;
    console.log(searchList);
    let data = await listing.find({
        title: { $regex: searchList, $options: "i" }
    });
    console.log(data);
    if(data.length==0){
        req.flash("error","No Listing Exist");
        return res.redirect("/listing")
    }
    console.log(data);
    res.render("listing/search.ejs",{data:data,searchList:searchList});
}