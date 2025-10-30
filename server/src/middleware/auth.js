import { verifyToken } from "../utils/jwt.js";
import User from "../models/Users.js";

// ✅ Basic Authentication
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId)
            .populate('profile') // <-- So we get teacher/student data
            .select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(401).json({
            success: false,
            message: 'Token is not valid.'
        });
    }
};

// ✅ Teacher-only middleware
const teacherOnly = async (req, res, next) => {
    await authMiddleware(req, res, async () => {
        if (req.user.role !== 'teacher') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Teachers only.'
            });
        }
        next();
    });
};

// ✅ Student-only middleware (optional)
const studentOnly = async (req, res, next) => {
    await authMiddleware(req, res, async () => {
        if (req.user.role !== 'student') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Students only.'
            });
        }
        next();
    });
};

export { authMiddleware, teacherOnly, studentOnly };
