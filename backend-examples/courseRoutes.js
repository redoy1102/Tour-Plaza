// Backend Example - Express + Mongoose
// File: server/routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

/**
 * @route   GET /api/courses/search
 * @desc    Search courses by title or category
 * @access  Public
 * @param   q - search query string
 */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    // Validate search query
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
    }

    const searchTerm = q.trim();

    // Perform case-insensitive search on title and category
    // Using MongoDB text search or regex for flexible matching
    const courses = await Course.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .select("-__v") // Exclude version key
      .limit(20) // Limit results
      .lean(); // Convert to plain JavaScript objects

    res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while searching courses",
    });
  }
});

module.exports = router;
