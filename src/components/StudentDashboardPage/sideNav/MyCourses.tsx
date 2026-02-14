import { BookOpen, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const enrolledCourses = [
    {
      id: 1,
      title: "ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট উইথ পাইথন ও রিয়্যাক্ট",
      batch: "ব্যাচ ১০",
      startDate: "১০ জানুয়ারি, ২০২৪",
      status: "Running",
      image: "/landingPage/courses/js.webp",
      classRecords: {
        week1: [
          // Class - 1
          {
            classNo: 1,
            title: "HTML পরিচিতি",
            videoUrl: "/public/student/classRecords/week_1Class_1.mp4",
            
            duration: "49:13 minute",
            completed: true,
          },
          // Class - 2
          {
            classNo: 2,
            title: "CSS বেসিক",
            // videoUrl: "/public/student/classRecords/week_1Class_2.mp4",
            ytVideo: "https://youtu.be/Fzs9LTB1XCs?si=1F6cCqgmDWNgKm-A",
            duration: "49:13 minute",
            completed: true,
          },
          // Quizzes for Week 1
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
              {
                question: "HTML এ কোন ট্যাগ দিয়ে লিস্ট তৈরি করা হয়?",
                options: ["<ul>", "<ol>", "<li>"],
                answer: ["<ul>", "<ol>"],
              },
            ],
          },
          // Assignment for Week 1
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
    },
    {
      id: 2,
      title: "ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট উইথ MERN",
      batch: "ব্যাচ ১০",
      startDate: "১০ জানুয়ারি, ২০২৪",
      status: "Running",
      image: "/landingPage/courses/js.webp",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          আমার কোর্সসমূহ
        </h1>
        <div className="flex items-center gap-2 text-sm ">
          <div className="w-4 h-4 rounded-full bg-emerald-600 animate-pulse" />
          ১টি কোর্স রানিং
        </div>
      </div>

      <div className="grid gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-300 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 hover:border-gray-400 transition-colors group"
          >
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-200 shrink-0">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-500/20">
                    {course.status}
                  </span>
                  <span className="text-gray-600 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> সময় ৮ মাস
                  </span>
                </div>
                <h2 className="text-xl font-bold text-black leading-tight">
                  {course.title}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span>{course.batch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-500" />
                  <span>শুরু: {course.startDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Button
                onClick={() => {
                  navigate("/video-player", {
                    state: { classRecords: course.classRecords },
                  });
                }}
                className="w-full md:w-auto bg-primary hover:bg-red-500 text-white font-bold px-8 cursor-pointer"
              >
                কোর্স শুরু করুন
              </Button>
            </div>
          </div>
        ))}

        {enrolledCourses.length === 0 && (
          <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-gray-600 font-medium">
              আপনি এখনও কোন কোর্সে এনরোল করেননি।
            </h3>
            <Button className="mt-4 bg-transparent border border-gray-300 text-gray-600 hover:text-black hover:bg-gray-100">
              সব কোর্স দেখুন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
