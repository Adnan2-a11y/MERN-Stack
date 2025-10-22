import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/Users.js';
import { generateToken } from '../utils/jwt.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimit.js';
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

const router = express.Router();

// 🔹 Register User
router.post(
    '/register', registerLimiter,[
        body('username').isLength({ min: 3 }).trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }),
        body('role').isIn(['student', 'teacher']).optional(),
    ],
    async(req, res) => {
        console.log("📩 Incoming data:", req.body);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }

            const { username, email, password, role='student',...profileData } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });
            }
            
            let profile =null;
            if (role === 'student') {
                profile =await Student.create(profileData);
                
            } else if (role === 'teacher') {
                profile =await Teacher.create(profileData);
                
            }
            const newUser = new User({ username, email, password, role });
            await newUser.save();

            const token = generateToken(newUser._id);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: {
                        id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        role: newUser.role
                    },
                    token
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error during registration'
            });
        }
    }
);

// 🔹 Login User
router.post('/login',loginLimiter, [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // ✅ Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        // ✅ Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // ✅ Generate token
        const token = generateToken({ userId: user._id, role: user.role });

        // ✅ Respond with user info
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: error.message
        });
    }
});

export default router;