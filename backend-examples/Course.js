// Backend Example - Mongoose Course Model
// File: server/models/Course.js

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      index: true, // Index for faster search
    },
    title: {
      type: String,
      required: true,
      index: true, // Index for faster search
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    durationMonths: {
      type: Number,
      required: true,
    },
    totalLiveClasses: {
      type: Number,
      required: true,
    },
    totalPreRecordedVideos: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
      required: true,
    },
    imglink: {
      type: String,
      required: true,
    },
    heroVideoLink: {
      type: String,
    },
    supports: [
      {
        icon: String,
        title: String,
      },
    ],
    batchStartDate: {
      type: String,
    },
    liveClassTime: {
      type: String,
    },
    supportClassTime: {
      type: String,
    },
    totalSeats: {
      type: Number,
    },
    seatsLeft: {
      type: Number,
    },
    batch: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    instructors: [
      {
        name: String,
        role: String,
        photo: String,
        runningCompanyName: String,
      },
    ],
    supportTeamMembers: [
      {
        name: String,
        role: String,
        photo: String,
      },
    ],
    courseOutline: {
      type: mongoose.Schema.Types.Mixed,
    },
    toolsList: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    prerequisites: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    promoCodes: [
      {
        label: String,
        value: Number,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Create text index for full-text search (alternative to regex)
// This provides better performance for large datasets
courseSchema.index({
  title: "text",
  category: "text",
  description: "text",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
