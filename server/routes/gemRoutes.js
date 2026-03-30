import express from "express";
import {
  getAllGems,
  getGemById,
  createGem,
  updateGem,
  deleteGem,
} from "../controllers/gemController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllGems);
router.get("/:id", getGemById);
router.post("/", upload.single("image"), createGem);
router.put("/:id", upload.single("image"), updateGem);
router.delete("/:id", deleteGem);

export default router;