import express from "express";
import { getContact, updateContact } from "../controllers/contactController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getContact);
router.put("/", protectAdmin, updateContact);

export default router;