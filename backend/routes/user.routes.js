import express from "express";
import { getProfile } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { saveProfile } from "../controllers/user.controller.js";
// console.log("User routes loaded");
const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/profile", protect, saveProfile);

export default router;