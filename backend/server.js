import express from "express";
import connectDB from "./çonfig/database.js";
const app = express();
app.use(express.json());

connectDB();

app.listen(8000 , ()=>{
    console.log("server is running on port 8000");
})