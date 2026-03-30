import express from "express";
import { getCompany, updateCompany } from "../controllers/companyController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getCompany);
router.put("/", upload.single("logo"), updateCompany);

export default router;