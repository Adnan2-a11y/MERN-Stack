// src/routes/index.js
import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// 🔹 Protected route to get logged-in user info
router.get('/users/me', authMiddleware, (req, res) => {
    res.json({ success: true, user: req.user });
});

export default router;