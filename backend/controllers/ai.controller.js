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

// Visa Vetting Simulator
export const visaVetting = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    
    // Fetch profile context to make it hyper-personalized
    const profile = await Profile.findOne({ user: req.user._id });
    const context = profile ? `Profile: ${profile.degree} pursuing ${profile.targetCourse} in ${profile.targetCountry}. CGPA: ${profile.cgpa}.` : '';

    const prompt = `
    You are a strict international student Visa Consular Officer. 
    Context: ${context}
    
    The student was asked this Visa Interview question: "${question}"
    The user provided this answer: "${answer}"
    
    You must evaluate this answer based on:
    1. Intent to return home (no strong immigration intent).
    2. Academic clarity and legitimacy.
    3. Financial readiness and clear sponsorship.
    
    Respond STRICTLY with a JSON object in this format:
    {
       "score": number (0 to 100),
       "feedback": "constructive harsh feedback on what they said wrong or right",
       "improvement": "an example of a better way to phrase their answer"
    }
    CRITICAL: Output ONLY the JSON block.
    `;

    const aiResponse = await generateAIResponse(prompt);
    
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI formatting");
    
    const evaluation = JSON.parse(jsonMatch[0]);

    res.status(200).json({
      success: true,
      evaluation
    });
  } catch (error) {
    next(error);
  }
};

// Hidden Costs Analyzer
export const hiddenCosts = async (req, res, next) => {
  try {
    const { targetCountry, targetCourse } = req.body;
    
    const prompt = `
    You are an expert international student financial advisor.
    The student is going to study ${targetCourse || 'Higher Education'} in ${targetCountry || 'Abroad'}.
    
    Identify 5 highly specific "Hidden Costs" or "Upfront pre-arrival costs" (like Immigration Surcharges, Flight baggage, Housing deposits, winter wear) that are NOT tuition and NOT basic monthly rent, specific to ${targetCountry || 'this destination'}.
    
    Provide all cost estimates purely as numerical types (numbers, no currency signs) representing values in USD.

    Respond STRICTLY with a JSON object in this format:
    {
      "totalEstimatedHiddenUSD": number,
      "stressLevel": "Low|Medium|High",
      "items": [
        { "name": "Item Name", "costUSD": number, "reason": "why they need it" }
      ]
    }
    CRITICAL: Output ONLY the JSON block.
    `;

    const aiResponse = await generateAIResponse(prompt);
    
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI formatting");
    
    const analysis = JSON.parse(jsonMatch[0]);

    res.status(200).json({
      success: true,
      analysis
    });
  } catch (error) {
    next(error);
  }
};

// University Admission Predictor
export const universityPredictor = async (req, res, next) => {
  try {
    const { cgpa, cgpaScale, targetCourse, targetCountry, budget } = req.body;
    
    // Normalize CGPA roughly
    const scale = cgpaScale || 4.0;
    const currentGpa = cgpa || (0.75 * scale); // default to 75%
    
    const prompt = `
    Act as a Predictive Admissions Algorithm for International Students.
    
    Student Profile:
    - Target Course/Major: ${targetCourse || 'General Study'}
    - Target Country/Region: ${targetCountry || 'Global'}
    - CGPA: ${currentGpa} out of ${scale}
    - Max Budget (Tuition): $${budget || 50000} USD
    
    Task:
    1. Search your knowledge base for 5 actual universities in ${targetCountry || 'top study destinations'} offering ${targetCourse || 'relevant degrees'}.
    2. Filter out programs where estimated tuition vastly exceeds $${budget || 50000} USD.
    3. Calculate an EXACT fractional "probabilityScore" (0 to 100) based on their CGPA (${currentGpa}/${scale}) compared to the historical average GPA of admitted students at each university. Be highly realistic (e.g. Ivy Leagues should be < 20% for average GPAs).
    4. Categorize strictly as: "Safe" (probability > 75), "Target" (probability 40-75), or "Reach" (probability < 40).
    
    Respond STRICTLY with a JSON object in this format:
    {
      "recommendations": [
        {
          "name": "University Name",
          "location": "City, Country",
          "category": "Reach|Target|Safe",
          "probabilityScore": number,
          "estimatedTuitionUSD": number,
          "whyGoodFit": "A 1-sentence analytical reason",
          "applicationDifficulty": "Low|Medium|High|Very High"
        }
      ]
    }
    CRITICAL: Output ONLY the JSON block. Do not include markdown formatting.
    `;

    const aiResponse = await generateAIResponse(prompt);
    
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI formatting");
    
    const prediction = JSON.parse(jsonMatch[0]);

    res.status(200).json({
      success: true,
      prediction
    });
  } catch (error) {
    next(error);
  }
};