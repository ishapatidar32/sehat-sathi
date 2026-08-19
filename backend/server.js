import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import authRouter from "./router/auth.router.js";
import adminRouter from "./router/admin.router.js";
import availabilityRouter from "./router/availability.router.js"
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true })); // ye naya add karo
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/availability",availabilityRouter);
connectDB();

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
