// src/routes/auth.js
import express from 'express';
import { body, validationResult } from 'express-validator';


// ...existing code...
import User from '../models/Users.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
// ...existing code...
import { registerLimiter, loginLimiter } from '../middleware/rateLimit.js';
import { generateToken } from '../utils/jwt.js';

const router = express.Router();

router.post(
    '/register', registerLimiter,[
        body('username').isLength({ min: 3 }).trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
        .withMessage('Password must contain uppercase, lowercase, number, and special character'),
        body('role').isIn(['student', 'teacher']).optional(),
    ],
    
    async(req, res) => {
        console.log("📩 Incoming data:", req.body);
        let studentProfile =null;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
            }

            const { username, email, password, ...studentData } = req.body;

            const existingUser = await User.findOne({$or: [{username},{email}] });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });
            }
            
            //Create student profile 
            studentProfile = await Student.create({...studentData, email});
            //if (role === 'student') {
            //    profile =await Student.create({...profileData, email});
            //    
            //} else if (role === 'teacher') {
            //    profile =await Teacher.create({...profileData, email});
            //    
            //}
            const newUser = new User({ 
                username,
                email, 
                password, 
                role: "student",
                profile: studentProfile._id,
                profileModel: 'Student'
            });
            await newUser.save();
            await newUser.populate('profile');

            const token = generateToken(newUser);
            res.cookie('token',token,{
                httponly:true,
                secure:false,
                sameSite:'lax',
                maxAge:30*24*60*60*1000 //90 days
            });

            res.status(201).json({
                success: true,
                message: 'Student registered successfully',
                data: {
                    user: {
                        id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        role: newUser.role
                    },
                    profile: studentProfile,
                    
                }
            });
        } catch (error) {
            console.error("Registration Error:", error);
            // Rollback if student profile created but user failed
            if (studentProfile) {
              await Student.findByIdAndDelete(studentProfile._id);
            }
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
        const token = generateToken(user);
        
            res.cookie('token',token,{
                httponly:true,
                secure:false,
                sameSite:'lax',
                maxAge:7*24*60*60*1000 //90 days
            });
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
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

export default router;