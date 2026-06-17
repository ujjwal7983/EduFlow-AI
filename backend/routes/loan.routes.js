import express from "express";
import { getLoanEligibility, getROI, getLoanRecommendations } from "../controllers/loan.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/eligibility", protect, getLoanEligibility);
router.post("/roi", protect, getROI);
router.post("/recommendations", protect, getLoanRecommendations);

export default router;