import express from "express";
import { getCareerAdvice, chatbot, getTimeline, visaVetting, hiddenCosts, universityPredictor } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/career", protect, getCareerAdvice);
router.post("/chat", protect, chatbot);
router.post("/timeline", protect, getTimeline);
router.post("/visa-vetting", protect, visaVetting);
router.post("/hidden-costs", protect, hiddenCosts);
router.post("/university-predictor", protect, universityPredictor);

export default router;