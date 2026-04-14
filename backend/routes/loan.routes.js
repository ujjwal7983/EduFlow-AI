import express from "express";
import { getLoanEligibility } from "../controllers/loan.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { getROI } from "../controllers/loan.controller.js";


const router = express.Router();

router.get("/eligibility", protect, getLoanEligibility);
router.post("/roi", protect, getROI);

export default router;