const mongoose=require("mongoose");
const review=require("./review")
const { listingSchema } = require("../schema");
const dataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    type:String,
    set:(v)=>v===''? "https://browntownresort.com/wp-content/uploads/2020/10/091.jpg":v,
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
  }
  
});

dataSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}});
  } 
})

const listing=mongoose.model("listing",dataSchema);
module.exports=listing;