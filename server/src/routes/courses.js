import express from "express";
import Course from "../models/Course.js";
import { teacherOnly } from '../middleware/auth.js';


const router = express.Router();
// ✅ Add Course
// 🟢 Add Course (Teacher only)
router.post('/add', teacherOnly, async (req, res) => {
  try {
    const newCourse = new Course({
      ...req.body,
      teacher: req.user.profile._id // auto-link teacher
    });

    await newCourse.save();
    await newCourse.populate('teacher');

    res.status(201).json({
      success: true,
      message: 'Course added successfully!',
      data: newCourse,
    });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding course',
    });
  }
});

// ✅ Get All Courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher");
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch courses" });
  }
});


// PUT /api/courses/:id
router.put('/:id', teacherOnly, async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course first
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // ✅ Ownership check: only the teacher who created it can update
    if (course.teacher.toString() !== req.user.profile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this course.',
      });
    }

    // Update allowed fields
    Object.assign(course, req.body);
    course.updatedAt = Date.now();

    const updatedCourse = await course.save();
    await updatedCourse.populate('teacher');

    res.status(200).json({
      success: true,
      message: 'Course updated successfully!',
      data: updatedCourse,
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating course',
    });
  }
});

// DELETE /api/courses/:id
router.delete('/:id', teacherOnly, async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // ✅ Check ownership
    if (course.teacher.toString() !== req.user.profile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this course.',
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting course',
    });
  }
});

export default router;