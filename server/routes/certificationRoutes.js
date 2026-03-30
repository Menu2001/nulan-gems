import express from "express";
import {
  getCertifications,
  createCertification,
  deleteCertification,
} from "../controllers/certificationController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getCertifications);
router.post("/", upload.single("image"), createCertification);
router.delete("/:id", deleteCertification);

export default router;