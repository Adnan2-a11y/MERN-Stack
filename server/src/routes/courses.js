import express from 'express';
import { verifyTeacher } from '../middleware/CourseRole.js';
import { authMiddleware } from '../middleware/auth.js'; // ensure this export exists
import {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getAllCourses
} from '../controllers/courseController.js';

const router = express.Router();

// Require authentication first, then role check
router.post('/add', authMiddleware, verifyTeacher, addCourse);
router.put('/:id', authMiddleware, verifyTeacher, updateCourse);
router.delete('/:id', authMiddleware, verifyTeacher, deleteCourse);
router.get('/', authMiddleware, verifyTeacher, getAllCourses);
router.get('/:id', authMiddleware, verifyTeacher, getCourseById);

export default router;