import express from "express";
import {
  getShowrooms,
  getShowroomById,
  createShowroom,
  updateShowroom,
  deleteShowroom,
} from "../controllers/showroomController.js";
import upload from "../middleware/upload.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getShowrooms);
router.get("/:id", getShowroomById);

router.post("/", protectAdmin, upload.single("image"), createShowroom);
router.put("/:id", protectAdmin, upload.single("image"), updateShowroom);
router.delete("/:id", protectAdmin, deleteShowroom);

export default router;