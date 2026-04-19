import express from "express";
import { getProfile, saveProfile, updateUserContext } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/profile", protect, saveProfile);
router.post("/context", protect, updateUserContext);

export default router;