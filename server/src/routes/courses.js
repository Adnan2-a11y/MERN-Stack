import express from 'express';
import Course from '../models/courseModel.js';
import {authMiddleware} from '../middleware/auth.js';
import {authorizeRoles} from '../middleware/roleMiddleware.js';

const router = express.Router();
// Create a new course (Admin and Teacher only)