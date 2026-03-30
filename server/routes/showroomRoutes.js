import express from "express";
import {
  getShowrooms,
  createShowroom,
  deleteShowroom,
} from "../controllers/showroomController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getShowrooms);
router.post("/", upload.single("image"), createShowroom);
router.delete("/:id", deleteShowroom);

export default router;