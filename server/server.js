import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import homepageRoutes from "./routes/homepageRoutes.js";
import gemRoutes from "./routes/gemRoutes.js";
import showroomRoutes from "./routes/showroomRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import contactMessageRoutes from "./routes/contactMessageRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Nulan Gems API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/gems", gemRoutes);
app.use("/api/showrooms", showroomRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/contact-messages", contactMessageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});