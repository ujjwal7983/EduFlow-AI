import Profile from "../models/Profile.js";
import { calculateProfileScore } from "../utils/scoreCalculator.js";
import { checkLoanEligibility } from "../utils/eligibility.js";
import { calculateROI } from "../utils/roiCalculator.js";

export const getLoanEligibility = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(400).json({
        message: "Profile not found",
      });
    }

    // Step 1: Calculate score
    const score = calculateProfileScore(profile);

    // Step 2: Check eligibility
    const result = checkLoanEligibility(score);

    res.status(200).json({
      success: true,
      score,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getROI = async (req, res, next) => {
  try {
    const { tuitionFee, livingCost, expectedSalary } = req.body;

    const result = calculateROI({
      tuitionFee,
      livingCost,
      expectedSalary,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};