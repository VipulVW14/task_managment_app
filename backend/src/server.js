import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser"; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser()); // Required to read cookies
app.use(cors({
  origin: "http://localhost:5173", // Set frontend origin explicitly
  credentials: true, // Allow cookies (for refresh tokens)
}));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
