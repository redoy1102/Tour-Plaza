import type { ClassRecords } from "@/types/classRecords";

// Sample class records keyed by course ID (string or number).  Real data would
// come from a backend, but for now we keep a hard‑coded example used by the
// old MyCourses component.  Add more entries as you seed new courses.

export const classRecordsByCourseId: Record<string, ClassRecords> = {
  "1": {
    week1: [
      {
        classNo: 1,
        title: "HTML পরিচিতি",
        videoUrl: "/public/student/classRecords/week_1Class_1.mp4",
        duration: "49:13 minute",
        completed: true,
      },
      {
        classNo: 2,
        title: "CSS বেসিক",
        ytVideo: "https://youtu.be/Fzs9LTB1XCs?si=1F6cCqgmDWNgKm-A",
        duration: "49:13 minute",
        completed: true,
      },
      {
        quizzes: [
          {
            question: "HTML এর পূর্ণরূপ কি?",
            options: [
              "Hyper Text Markup Language",
              "Home Tool Markup Language",
              "Hyperlinks and Text Markup Language",
            ],
            answer: ["Hyper Text Markup Language"],
          },
          {
            question: "HTML এ কোন ট্যাগ দিয়ে প্যারাগ্রাফ তৈরি করা হয়?",
            options: ["<p>", "<h1>", "<div>"],
            answer: ["<p>"],
          },
          {
            question: "HTML এ কোন ট্যাগ দিয়ে লিস্ট তৈরি করা হয়?",
            options: ["<ul>", "<ol>", "<li>"],
            answer: ["<ul>", "<ol>"],
          },
        ],
      },
      {
        assignment: {
          title: "HTML বেসিক অ্যাসাইনমেন্ট",
          description:
            "একটি ওয়েবপেজ তৈরি করুন যেখানে HTML এর বেসিক ট্যাগগুলো ব্যবহার করা হয়েছে।",
          instructions: [
            "আপনার ওয়েবপেজে একটি হেডার, একটি প্যারাগ্রাফ, এবং একটি লিস্ট অন্তর্ভুক্ত করুন।",
            "আপনার কোড GitHub এ আপলোড করুন এবং লিঙ্কটি এখানে শেয়ার করুন।",
          ],
          dueDate: "2026-02-20",
          maxMarks: 100,
        },
      },
    ],
    week2: [
      {
        classNo: 3,
        title: "JavaScript বেসিক",
        videoUrl: "/public/student/classRecords/week_2Class_1.mp4",
        duration: "29:55 minute",
        completed: false,
      },
      {
        classNo: 4,
        title: "DOM",
        videoUrl: "/public/student/classRecords/week_2Class_2.mp4",
        duration: "28:08 minute",
        completed: false,
      },
    ],
    week3: [
      {
        classNo: 1,
        title: "HTML পরিচিতি",
        videoUrl: "/public/student/classRecords/week_1Class_1.mp4",
        duration: "49:13 minute",
        completed: false,
      },
      {
        classNo: 2,
        title: "CSS বেসিক",
        videoUrl: "/public/student/classRecords/week_1Class_2.mp4",
        duration: "49:13 minute",
        completed: false,
      },
    ],
    week4: [
      {
        classNo: 3,
        title: "JavaScript বেসিক",
        videoUrl: "/public/student/classRecords/week_2Class_1.mp4",
        duration: "29:55 minute",
        completed: false,
      },
      {
        classNo: 4,
        title: "DOM",
        videoUrl: "/public/student/classRecords/week_2Class_2.mp4",
        duration: "28:08 minute",
        completed: false,
      },
    ],
  },
};
