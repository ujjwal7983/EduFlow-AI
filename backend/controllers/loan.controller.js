import Profile from "../models/Profile.js";
import { calculateProfileScore } from "../utils/scoreCalculator.js";
import { checkLoanEligibility } from "../utils/eligibility.js";
import { calculateROI } from "../utils/roiCalculator.js";
import { generateAIResponse } from "../services/ai.services.js";

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

export const getLoanRecommendations = async (req, res, next) => {
  try {
    const { amount, cosignerIncome, tenure } = req.body;
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(400).json({ message: "Profile not found" });
    }

    const countries = Array.isArray(profile.targetCountry) ? profile.targetCountry.join(', ') : (profile.targetCountry || 'Global');

    const marketDataPrompt = `
    Knowledge Base (Latest 2024-2026 Student Loan Data):
    - HDFC Credila: Secured (~9.95%), Unsecured (~11.25%). Needs co-signer. TAX Section 80E benefits. URL: https://www.hdfccredila.com/
    - IDFC FIRST: Starts 9.5% p.a. Secured/Unsecured options. No margin money. URL: https://www.idfcfirstbank.com/personal-banking/loans/education-loan
    - Prodigy Finance: ~9.65% Variable. NO co-signer or collateral needed. Global Master's only. Direct to uni. URL: https://prodigyfinance.com/
    - MPOWER: ~9.99% Fixed. NO co-signer/collateral. US/Canada specific. Visas assistance. URL: https://www.mpowerfinancing.com/
    - ICICI Bank: Secured options usually 10.5%+. URL: https://www.icicibank.com/personal-banking/loans/education-loan
    - Axis Bank: Secured options usually 10.5%+. URL: https://www.axisbank.com/retail/loans/education-loan

    User Profile:
    - Target: ${profile.targetCourse || 'Master\'s Degree'} in ${countries}
    - CGPA: ${profile.cgpa}
    - Experience: ${profile.experienceYears} years
    - Collateral: ${profile.hasCollateral ? 'Available' : 'None'}
    
    Loan Requirements:
    - Amount: ${amount} INR
    - Co-signer Monthly Income: ${cosignerIncome || 0} INR
    - Repayment Tenure: ${tenure} Years

    Task:
    Return a JSON object exactly as follows:
    {
      "summary": "2-sentence reasoning",
      "offers": [
        { "provider": "Name", "amountLabel": "Amount", "rate": number, "status": "Pre-approved|Available|Pending Review", "icon": "Landmark|DollarSign|Clock", "processingFee": "text", "time": "text", "reasoning": "short text", "url": "Official Application URL" }
      ]
    }
    
    CRITICAL: Output ONLY the JSON block.
    `;

    const aiResponse = await generateAIResponse(marketDataPrompt);
    console.log("Raw AI Response:", aiResponse);
    
    // Improved JSON extraction: find the first { and last }
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in AI response");
    }
    
    const cleanJson = jsonMatch[0];
    let recommendations = JSON.parse(cleanJson);

    // AI sometimes wraps the result in a top-level "recommendations" or "data" key
    if (recommendations.recommendations) recommendations = recommendations.recommendations;
    if (recommendations.data) recommendations = recommendations.data;

    if (!recommendations.offers || !Array.isArray(recommendations.offers)) {
      throw new Error("AI response missing 'offers' array");
    }

    res.status(200).json({
      success: true,
      summary: recommendations.summary || "Based on your criteria, here are the most logical financing options.",
      offers: recommendations.offers
    });
  } catch (error) {
    console.error("Loan Recommendation Error:", error);
    res.status(500).json({ success: false, message: "AI Comparison service failed" });
  }
};