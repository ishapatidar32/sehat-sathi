import config from "./config.js";
import mongoose  from "mongoose";


async function connectDB(){
   await mongoose.connect(config.MONGO_URL);
   console.log("database for sehat sathi is connected");
}

export default connectDB;