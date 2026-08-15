import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import authRouter from "./router/auth.router.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true })); // ye naya add karo
app.use(express.json());
app.use("/api/auth", authRouter);
connectDB();

app.listen(8000, () => {
  console.log("server is running on port 8000");
});