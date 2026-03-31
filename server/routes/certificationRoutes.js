import express from "express";
import {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController.js";
import upload from "../middleware/upload.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCertifications);
router.get("/:id", getCertificationById);

router.post("/", protectAdmin, upload.single("image"), createCertification);
router.put("/:id", protectAdmin, upload.single("image"), updateCertification);
router.delete("/:id", protectAdmin, deleteCertification);

export default router;