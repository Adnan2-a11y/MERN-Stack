import Course from '../models/Course.js';


export const addCourse = async (req, res) => {
    try{
        const { title, description, instructor, category, duration, lessons } = req.body;
        //check require fields
        if ( !title|| !description || !instructor ){
            return res.status(400).json({
                sucess : false,
                message: 'Please provide all required fields: title, description, category, duration, lessons',
            });
        }

        const newCourse = new Course({
            title,
            description, 
            instructor,
            category, 
            duration, 
            lessons
        });
        await newCourse.save();
        res.status(201).json({
            success: true,
            message: 'Course added successfully',
            course: newCourse
        });
    } catch (error){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

export const updateCourse =  async (req,res) => {
    try{
        const {id} = req.params;
        const update = req.body;

        const course = await Course.findByIdAndUpdate(id,update, {new:true});
        if (!course){
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }res.json({
            success: true,
            message: 'Course updated successfully',
            course
        });
    }catch (error){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

export const deleteCourse =  async (req,res) => {
    try{
        const {id} = req.params;
        
        const course = await Course.findByIdAndDelete(id);
        if (!course){
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }res.json({
            success: true,
            message: 'Course deleted successfully',
            course
        });
    }catch (error){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'fullName email');
    res.json({ success: true, courses });
  } catch (err) {
    console.error('❌ Error fetching courses:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching courses' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('instructor', 'fullName email');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, course });
  } catch (err) {
    console.error('❌ Error fetching course:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching course' });
  }
};