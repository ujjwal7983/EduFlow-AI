import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import loanRoutes from "./routes/loan.routes.js";

// Middlewares
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Core Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://eduflow-ai-1.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/loan", loanRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("API running...");
});

// Error Middleware (ALWAYS LAST)
app.use(errorHandler);

export default app;