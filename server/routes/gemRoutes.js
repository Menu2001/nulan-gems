import express from "express";
import {
  getAllGems,
  getGemById,
  createGem,
  updateGem,
  deleteGem,
} from "../controllers/gemController.js";
import upload from "../middleware/upload.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllGems);
router.get("/:id", getGemById);
router.post("/", protectAdmin, upload.single("image"), createGem);
router.put("/:id", protectAdmin, upload.single("image"), updateGem);
router.delete("/:id", protectAdmin, deleteGem);

export default router;