import express from "express";
import { getHomepage, updateHomepage } from "../controllers/homepageController.js";

const router = express.Router();

router.get("/", getHomepage);
router.put("/", updateHomepage);

export default router;