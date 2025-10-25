import { verifyToken } from "../utils/jwt.js";
import User from "../models/Users.js";

const authMiddleware = async(req, res, next) => {
    try {
        //const authHeader = req.header("Authorization");
        //const token = authHeader ? authHeader.replace("Bearer ", "") : null;
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decode = verifyToken(token);
        const user = await User.findById(decode.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid.'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token is not valid.'
        });
    }
};

export { authMiddleware };