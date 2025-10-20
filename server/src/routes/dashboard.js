import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 👨‍🏫 Teacher-only route
router.get("/teacher", authMiddleware, authorizeRoles("teacher"), (req, res) => {
  res.json({
    success: true,
    message: `Welcome, Teacher ${req.user.username}`,
  });
});

// 👩‍🎓 Student-only route
router.get("/student", authMiddleware, authorizeRoles("student"), (req, res) => {
  res.json({
    success: true,
    message: `Welcome, Student ${req.user.username}`,
  });
});

export default router;
