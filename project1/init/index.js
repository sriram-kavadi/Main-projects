const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js"); // Capitalize model names (convention)

// Connect to MongoDB
main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/project1");
}

// Initialize database
const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
  console.log("Data was initialized");
};

initDB()
