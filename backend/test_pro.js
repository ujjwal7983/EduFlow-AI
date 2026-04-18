import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function check() {
  try {
    // The SDK version 0.14+ should have a way to list models if permitted
    // But let's try gemini-pro which is the most basic one
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("hi");
    console.log("Gemini Pro Success:", result.response.text());
  } catch (e) {
    console.log("Gemini Pro Failed:", e.message);
  }
}

check();
