import express from "express";
import {
  getMessages,
  createMessage,
  deleteMessage,
} from "../controllers/contactMessageController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createMessage); // public (client use)
router.get("/", protectAdmin, getMessages);
router.delete("/:id", protectAdmin, deleteMessage);

export default router;