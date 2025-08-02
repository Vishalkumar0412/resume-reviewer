import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";

// Load environment variables
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.text());
app.use(cookieParser());

// CORS setup
const CLIENT_URL = process.env.CLIENT_URL;

if (!CLIENT_URL) {
  console.warn("⚠️ CLIENT_URL is not defined in .env");
}

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Trust proxy (important when using services like Render)
app.set("trust proxy", 1);

// Handle preflight requests
app.options("*", cors());

// Routes
app.use("/api/v1", router);

// Health check route
app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("✅ Server is running");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
