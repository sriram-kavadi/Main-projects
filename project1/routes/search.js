const express=require("express");
const router=express.Router();
const {searchData}=require("../controllers/search")
const {searchFilters}=require("../controllers/search");

router
    .route("/")
    .get(searchData)

router
    .route("/:filter")
    .get(searchFilters)


module.exports=router;