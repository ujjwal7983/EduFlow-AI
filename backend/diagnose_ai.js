import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Testing API Key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");
    
    // There isn't a direct listModels in the standard browser SDK sometimes or it's restricted
    // But we can try to generate a simple response with 1.5-flash to see if the key works
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("test");
    console.log("Gemini 1.5 Flash Test Success:", result.response.text());
    
    // Test the user's preferred model
    try {
        const model2 = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
        const result2 = await model2.generateContent("test");
        console.log("Gemini 2.5 Flash Lite Test Success:", result2.response.text());
    } catch (e) {
        console.log("Gemini 2.5 Flash Lite Test Failed:", e.message);
    }

  } catch (error) {
    console.error("Diagnostic Failed:", error.message);
  }
}

listModels();
