import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testDriveRoutes from "./routes/TestDriveRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

console.log("CLIENT_URL from .env:", process.env.CLIENT_URL);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "AutoDrive Express API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/test-drive", testDriveRoutes);

app.use("/api/ai", aiRoutes);
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
