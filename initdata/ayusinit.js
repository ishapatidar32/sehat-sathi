const mongoose = require("mongoose");
const ayushdata = require("./ayaushlib.js");
const Ayaush = require("../models/ayaush.js");
main().then(() => {console.log("connection successful")})
  .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/SehatSathi");
}
const ayushDb = async() =>{
    await Ayaush.deleteMany({});
     await Ayaush.insertMany(ayushdata.data);
    console.log("data was initialize");
};
ayushDb ();
