const mongoose=require("mongoose");
const dataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    type:String,
    set:(v)=>v===''? "https://browntownresort.com/wp-content/uploads/2020/10/091.jpg":v,
  },
  price: Number,
  location: String,
  country: String
});

const listing=mongoose.model("listing",dataSchema);
module.exports=listing;