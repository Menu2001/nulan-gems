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

app.use("/api/homepage", homepageRoutes);
app.use("/api/gems", gemRoutes);
app.use("/api/showrooms", showroomRoutes);
app.use("/api/gallery", galleryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});