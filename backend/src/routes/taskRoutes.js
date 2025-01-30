import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET;

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token provided");  // Debugging step
    return res.status(403).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("Token decoded:", decoded); // Debugging step
    req.userId = decoded.userId;

    if (!req.userId) {
      console.log("userId missing in token payload");  // Debugging step
      return res.status(403).json({ error: "Unauthorized: Invalid token payload" });
    }

    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);  // Debugging step
    res.status(401).json({ error: "Invalid token" });
  }
};


// Fetch all tasks
router.get("/", authenticate, async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
  res.json(tasks);
});

// Create a task
router.post("/", authenticate, async (req, res) => {
  const { title, description, status } = req.body;
  const task = await prisma.task.create({
    data: { title, description, status, userId: req.userId },
  });
  res.status(201).json(task);
});

// Update a task
router.put("/:id", authenticate, async (req, res) => {
  const { title, description, status } = req.body;
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: { title, description, status },
  });
  res.json(task);
});

// Delete a task
router.delete("/:id", authenticate, async (req, res) => {
  await prisma.task.delete({ where: { id: req.params.id } });
  res.json({ message: "Task deleted" });
});

export default router;
