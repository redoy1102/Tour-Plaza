import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  PlayCircle,
  Clock,
  Link,
  ChevronLeft,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import NoClassRecords from "../NoClassRecords";
import type {
  Lesson,
  Quiz,
  Assignment,
  ClassRecords,
} from "@/types/classRecords";
import { getYouTubeEmbedUrl, findCourseBySlug } from "@/lib/utils";
import { useAppSelector } from "@/Redux/hooks";
import type { Course } from "@/Redux/slices/courseSlice";

interface SelectedVideo {
  title: string;
  url: string | undefined;
  type: "local" | "youtube";
}

const VideoClass = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const navigate = useNavigate();
  const allCourses = useAppSelector((state) => state.courses.items);
  const currentStudent = useAppSelector((s) => s.student.currentStudent);
  const enrollments = useAppSelector((s) => s.enrollments.items);

  // Helper function to build class records (moved from MyCourses)
  const buildRecords = (course: Course): ClassRecords | undefined => {
    if (!course.courseOutline) return undefined;
    const records: ClassRecords = {};
    course.courseOutline.forEach((mod, idx) => {
      const weekKey = `week${idx + 1}`;
      const items: Array<
        Lesson | { quizzes: Quiz[] } | { assignment: Assignment }
      > = [];

      // classes/lessons
      if (mod.classes) {
        mod.classes.forEach((cls, cIdx) => {
          items.push({
            classNo: cIdx + 1,
            title: cls.title,
            ytVideo: cls.ytVideoUrl,
            duration: "",
            completed: false,
            resources: cls.resources,
          });
        });
      }

      // quizzes attached to module
      if (mod.quizzes && mod.quizzes.length > 0) {
        const converted: Quiz[] = mod.quizzes.map((q) => {
          const opts = [
            q.options.opt1,
            q.options.opt2,
            q.options.opt3,
            q.options.opt4,
          ];
          let ansText: string[] = [];
          if (q.answer) {
            const num = Number(q.answer.replace("opt", "")) - 1;
            if (num >= 0 && num < opts.length) ansText = [opts[num]];
          }
          return {
            question: q.question,
            options: opts,
            answer: ansText,
          };
        });
        items.push({ quizzes: converted });
      }

      // assignment (only first one shown in admin UI)
      if (mod.assignment && mod.assignment.length > 0) {
        const a = mod.assignment[0];
        const assignmentObj: Assignment = {
          title: a.title,
          description: a.description,
          instructions: a.instruction ? [a.instruction] : [],
          dueDate: a.dueDate
            ? typeof a.dueDate === "string"
              ? a.dueDate
              : a.dueDate.toISOString()
            : "",
          maxMarks: a.maxMarks,
        };
        items.push({ assignment: assignmentObj });
      }

      records[weekKey] = items;
    });
    return records;
  };

  // Get the course and build class records from URL parameter
  const course = courseName
    ? findCourseBySlug(courseName, allCourses)
    : undefined;
  const classRecords =
    course && "courseOutline" in course
      ? buildRecords(course as Course)
      : undefined;

  // Find the student's enrollment for this course to check submission status
  const enrollment = enrollments.find(
    (e) => e.studentId === currentStudent?.id && e.courseId === course?.id,
  );
  console.log("Course:", course);
  console.log("Class records:", classRecords);

  // Set initial selected video to the first lesson of the first week
  const firstWeekKey = Object.keys(classRecords || {})[0];

  // Find the first actual lesson (not quiz or assignment)
  let firstLesson: Lesson | undefined;
  if (classRecords) {
    for (const week of Object.values(classRecords)) {
      for (const item of week) {
        if ("title" in item) {
          firstLesson = item as Lesson;
          break;
        }
      }
      if (firstLesson) break;
    }
  }

  console.log("First lesson found:", firstLesson);

  const isYouTubeUrl = (url?: string) => {
    if (!url) return false;
    return /(?:youtube\.com\/|youtu\.be\/)/.test(url);
  };

  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo>(() => {
    if (!firstLesson) {
      return { title: "", url: "", type: "local" };
    }
    const url = firstLesson.ytVideo || firstLesson.videoUrl || "";
    const youtube = isYouTubeUrl(url);
    return {
      title: firstLesson.title,
      url,
      type: youtube ? "youtube" : "local",
    };
  });

  const [selectedResources, setSelectedResources] = useState<
    string | undefined
  >(firstLesson?.resources);

  const getWeekTitle = (weekKey: string) => {
    switch (weekKey) {
      case "week1":
        return "Week 1 - HTML & Structure";
      case "week2":
        return "Week 2 - Styling with CSS";
      case "week3":
        return "Week 3 - JavaScript Fundamentals";
      case "week4":
        return "Week 4 - DOM Manipulation";
      default:
        return weekKey;
    }
  };

  // export const getYouTubeEmbedUrl = (url: string | undefined) => {
  //   if (!url) return "";
  //   // support multiple YouTube URL formats (youtu.be, watch?v=, embed)
  //   const reg =
  //     /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  //   const match = url.match(reg);
  //   const id = match ? match[1] : url.split("/").pop()?.split("?")[0] || "";
  //   return id ? `https://www.youtube.com/embed/${id}` : "";
  // };

  if (!classRecords || Object.keys(classRecords).length === 0) {
    return (
      <NoClassRecords backToMyCourses={() => navigate("/student/my-courses")} />
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col lg:flex-row overflow-hidden">
      {/* Main Content - Video Player */}
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          <div className="flex items-center">
            <Button
              onClick={() => navigate("/student/my-courses")}
              className="px-3 rounded-md flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              ফিরে যান
            </Button>
          </div>

          <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-300 group">
            {selectedVideo.type === "youtube" && (
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo.url)}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {selectedResources && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {selectedResources}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - Course Content */}
      <div className="w-full lg:w-112.5 border-l border-gray-300 bg-white flex flex-col shrink-0 overflow-hidden">
        {/* Module List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Accordion
            type="single"
            collapsible
            defaultValue={firstWeekKey}
            className="w-full"
          >
            {Object.entries(classRecords).map(([weekKey, classes]) => {
              console.log("Classes:", classes);
              return (
                <AccordionItem
                  key={weekKey}
                  value={weekKey}
                  className="border-gray-300 px-4"
                >
                  <AccordionTrigger className="hover:no-underline py-5 px-2 rounded-xl hover:bg-gray-100 transition-all group">
                    <div className="text-left space-y-1.5">
                      <p className="font-bold text-sm tracking-tight group-hover:text-sky-400 transition-colors">
                        {getWeekTitle(weekKey)}
                      </p>
                      <p className="text-[11px] font-medium text-gray-600 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {classes.length}টি লেসন • ৪ ঘন্টা ২০ মিনিট
                      </p>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="p-0 pt-1 pb-4">
                    <div className="space-y-1">
                      {classes.map(
                        (
                          lesson:
                            | Lesson
                            | { quizzes: Quiz[] }
                            | { assignment: Assignment },
                        ) => {
                          if ("quizzes" in lesson) {
                            const quizSubmitted = !!enrollment?.quizMarks?.some(
                              (m) => m.quizWeekId === weekKey,
                            );
                            return (
                              <button
                                key={lesson.quizzes[0].question}
                                onClick={() => {
                                  navigate(`/quiz/${courseName}`, {
                                    state: { quizzes: lesson.quizzes, weekKey },
                                  });
                                }}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left relative overflow-hidden group/item hover:bg-gray-100 text-gray-600 hover:text-gray-800 cursor-pointer`}
                              >
                                <div
                                  className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 group-hover/item:scale-110 bg-gray-200 border border-gray-300 group-hover/item:border-gray-400`}
                                >
                                  <Link className={`w-5 h-5 `} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-bold leading-tight mb-1">
                                    Quiz - {lesson.quizzes.length} Questions
                                  </p>
                                </div>
                                {quizSubmitted && (
                                  <div className="p-1.5 rounded-lg bg-emerald-500/10">
                                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                                  </div>
                                )}
                              </button>
                            );
                          } else if ("assignment" in lesson) {
                            const assignmentSubmitted =
                              !!enrollment?.assignmentMarks?.some(
                                (m) => m.assignmentWeekId === weekKey,
                              );
                            return (
                              <button
                                key={lesson.assignment.title}
                                onClick={() => {
                                  navigate(
                                    `/student/assignment/${courseName}`,
                                    {
                                      state: {
                                        assignment: lesson.assignment,
                                        weekKey,
                                      },
                                    },
                                  );
                                }}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left relative overflow-hidden group/item hover:bg-gray-100 text-gray-600 hover:text-gray-800 cursor-pointer`}
                              >
                                <div
                                  className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 group-hover/item:scale-110 bg-gray-200 border border-gray-300 group-hover/item:border-gray-400`}
                                >
                                  <Link className={`w-5 h-5 `} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-bold leading-tight mb-1">
                                    Assignment - {lesson.assignment.title}
                                  </p>
                                </div>
                                {assignmentSubmitted && (
                                  <div className="p-1.5 rounded-lg bg-emerald-500/10">
                                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                                  </div>
                                )}
                              </button>
                            );
                          } else {
                            return (
                              <button
                                key={lesson.classNo}
                                onClick={() => {
                                  const url =
                                    lesson.ytVideo || lesson.videoUrl || "";
                                  setSelectedVideo({
                                    title: lesson.title,
                                    url,
                                    type: isYouTubeUrl(url)
                                      ? "youtube"
                                      : "local",
                                  });
                                  setSelectedResources(
                                    "resources" in lesson
                                      ? lesson.resources
                                      : undefined,
                                  );
                                }}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left relative overflow-hidden group/item ${
                                  selectedVideo.title === lesson.title
                                    ? "bg-[#007cc2] text-white shadow-lg shadow-sky-500/20"
                                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                                }`}
                              >
                                <div
                                  className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 group-hover/item:scale-110 ${
                                    selectedVideo.title === lesson.title
                                      ? "bg-white/20"
                                      : "bg-gray-200 border border-gray-300 group-hover/item:border-gray-400"
                                  }`}
                                >
                                  <PlayCircle
                                    className={`w-5 h-5 ${
                                      selectedVideo.title === lesson.title
                                        ? "text-white"
                                        : "text-sky-500"
                                    }`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-bold leading-tight mb-1">
                                    {lesson.classNo}. {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <span
                                      className={`text-[11px] font-medium ${
                                        selectedVideo.title === lesson.title
                                          ? "text-white/80"
                                          : "text-slate-500"
                                      }`}
                                    >
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </div>
                                {lesson.completed && (
                                  <div
                                    className={`p-1.5 rounded-lg ${
                                      selectedVideo.title === lesson.title
                                        ? "bg-white/20"
                                        : "bg-emerald-500/10"
                                    }`}
                                  >
                                    <CheckCircle2
                                      className={`w-4 h-4 shrink-0 ${
                                        selectedVideo.title === lesson.title
                                          ? "text-white"
                                          : "text-emerald-500"
                                      }`}
                                    />
                                  </div>
                                )}
                              </button>
                            );
                          }
                        },
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default VideoClass;
