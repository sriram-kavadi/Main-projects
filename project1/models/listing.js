const mongoose=require("mongoose");
const review=require("./review")
const { listingSchema } = require("../schema");
const { string } = require("joi");
const dataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    url:String,
    filename:String
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  category:String,
  coordinates:{
    lat:Number,
    lng:Number
  }
});

dataSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}});
  } 
})

const listing=mongoose.model("listing",dataSchema);
module.exports=listing;