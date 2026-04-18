import express from "express";
import { getCareerAdvice, chatbot } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { getTimeline } from "../controllers/ai.controller.js";

const router = express.Router();

router.get("/career", protect, getCareerAdvice);
router.post("/chat", protect, chatbot);
router.post("/timeline", protect, getTimeline);

export default router;