import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import morgan from "morgan";
import rateLimit from 'express-rate-limit';
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(morgan("dev"));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, // 15 minutes 
  max : 100, // limit each IP to 100 requests per window 
  message: { message: "Too many requests, please try again later." } 
}); 
app.use(limiter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Unexpected server error" });
});

export default app;
