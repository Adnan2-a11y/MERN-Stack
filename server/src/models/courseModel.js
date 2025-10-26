import mongoose from 'mongoose';

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Remove whitespace from both ends of a string
        unique: true // Ensure course titles are unique
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId, // Reference to an Instructor model
        ref: 'User', // Assuming a 'User' model for instructors
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Programming and Data Structures', 'Computer Systems', 'Software Development', 'Theory'] // Predefined categories
    },
    
    duration: {
        type: Number, // Duration in hours or minutes
        required: true,
        min: 1
    },
    lessons: [{ // Array of embedded lesson documents
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        videoUrl: String // Optional video URL for the lesson
    }],
    ratings: [{ // Array of embedded rating documents
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to update `updatedAt` field
courseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Course', courseSchema);