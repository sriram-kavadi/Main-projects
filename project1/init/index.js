const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
if(process.env.NODE_ENV!="production"){
    require('dotenv').config({path:"../.env"});
}
const  dbURL=process.env.mongoConnection;
const owner=process.env.owner;
async function main() {
  await mongoose.connect(dbURL);
  console.log("MongoDB connected");
}

const initDB = async () => {
  await Listing.deleteMany({});
  const listings = initdata.map((obj) => ({
    ...obj,
    owner: `${owner}`
  }));
  
  await Listing.insertMany(listings);
  console.log("Data was initialized");

  mongoose.connection.close();
};

main().then(() => initDB());
