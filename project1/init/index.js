const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/project1");
  console.log("MongoDB connected");
}

const initDB = async () => {
  await Listing.deleteMany({});
  const listings = initdata.map((obj) => ({
    ...obj,
    owner: "690fa16eb69d215b035301c7"
  }));
  
  await Listing.insertMany(listings);
  console.log("Data was initialized");

  mongoose.connection.close();
};

main().then(() => initDB());
