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
    
    // Fetch profile context
    const profile = await Profile.findOne({ user: req.user._id });
    let context = "";
    if (profile) {
      const countries = Array.isArray(profile.targetCountry) ? profile.targetCountry.join(', ') : profile.targetCountry;
      context = `[SYSTEM CONTEXT: The user has a ${profile.degree || 'degree'} with a CGPA of ${profile.cgpa || 'unknown'} (Scale ${profile.cgpaScale || 4.0}). They are targeting ${profile.targetCourse || 'unknown course'} in ${countries || 'various locations'}]. `;
    }

    const fullPrompt = `${context}\nUser Message: ${message}`;
    const reply = await generateAIResponse(fullPrompt);

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