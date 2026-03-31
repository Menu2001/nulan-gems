import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();
await connectDB();

const seedAdmin = async () => {
  try {
    const existing = await Admin.findOne({ email: "admin@nulangems.com" });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin12345", 10);

    await Admin.create({
      name: "Nulan Admin",
      email: "admin@nulangems.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    console.log("Email: admin@nulangems.com");
    console.log("Password: Admin12345");
    process.exit();
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();