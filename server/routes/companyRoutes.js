import express from "express";
import { getCompany, updateCompany } from "../controllers/companyController.js";
import upload from "../middleware/upload.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCompany);
router.put("/", protectAdmin, upload.single("logo"), updateCompany);

export default router;