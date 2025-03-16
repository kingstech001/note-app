import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import noteRoutes from "./routes/noteRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { logger } from "./middlewares/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
