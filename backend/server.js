import express from "express";
import connectDB from "./çonfig/database.js";
import authRouter  from "./router/auth.router.js";
const app = express();
app.use(express.json());
app.use("/api/auth" , authRouter);
connectDB();

app.listen(8000 , ()=>{
    console.log("server is running on port 8000");
})