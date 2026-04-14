import Profile from "../models/Profile.js";
import { generateAIResponse } from "../services/ai.services.js";
import { generateTimeline } from "../utils/timelineGenerator.js";

// Career Navigator
export const getCareerAdvice = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(400).json({ message: "Profile not found" });
    }

    const prompt = `
    Student Profile:
    Degree: ${profile.degree}
    Field: ${profile.field}
    CGPA: ${profile.cgpa}
    Target Country: ${profile.targetCountry}

    Suggest:
    - Best countries
    - Suitable courses
    - Career opportunities
    `;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      advice: aiResponse,
    });
  } catch (error) {
    next(error);
  }
};

// Chatbot
export const chatbot = async (req, res, next) => {
  try {
    const { message } = req.body;

    const reply = await generateAIResponse(message);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    next(error);
  }
};

// Timeline Generator
export const getTimeline = async (req, res, next) => {
  try {
    const { monthsToTarget } = req.body;

    const timeline = generateTimeline(monthsToTarget);

    res.status(200).json({
      success: true,
      timeline,
    });
  } catch (error) {
    next(error);
  }
};