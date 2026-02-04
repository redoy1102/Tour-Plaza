// Script to seed your database with course data
// File: server/scripts/seedCourses.js

const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

// Import your courses data from frontend
const coursesData = [
  {
    category: "webDevelopment",
    title: "ওয়েব ডেভেলপমেন্ট",
    description: "শূন্য থেকে ফুল-স্ট্যাক ওয়েব ডেভেলপার হওয়ার সম্পূর্ণ কোর্স।",
    rating: 4.8,
    durationMonths: 6,
    totalLiveClasses: 50,
    totalPreRecordedVideos: 1000,
    price: 5000,
    discount: 500,
    link: "/courses/web-development",
    imglink: "/landingPage/courses/js.webp",
    heroVideoLink: "/landingPage/HeroVideo.mp4",
    isFeatured: true,
    // Add more fields as needed
  },
  // Add more courses...
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Existing courses removed');

    // Insert new courses
    await Course.insertMany(coursesData);
    console.log(`${coursesData.length} courses inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
