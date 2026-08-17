import bcrypt from "bcryptjs";
import { Admin } from "../model/user.js";
import connectDB from "../config/database.js";

const run = async () => {
  try {
    await connectDB(); // pehle connect karo, phir aage badho

    const hashedPassword = await bcrypt.hash("YourStrongPassword123", 10);
    const admin = await Admin.create({
      name: "Admin",
      email: "admin@sehatsathi.com",
      password: hashedPassword,
    });
    console.log("✅ Admin created:", admin.email);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  } finally {
    process.exit();
  }
};

run();