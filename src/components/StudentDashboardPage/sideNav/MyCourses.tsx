import { BookOpen, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/Redux/hooks";
import type { Course as CourseType } from "@/Redux/slices/courseSlice";
import type {
  ClassRecords,
  Lesson as LessonType,
  Quiz as QuizType,
  Assignment as AssignmentType,
} from "@/types/classRecords";
import { createSlug } from "@/lib/utils";

const MyCourses = () => {
  const navigate = useNavigate();

  const currentStudent = useAppSelector(
    (state) => state.student.currentStudent,
  );
  const enrollments = useAppSelector((state) => state.enrollments.items);
  const allCourses = useAppSelector((state) => state.courses.items);

  // build a list of course objects supplemented with enrollment data
  // helper to convert the admin-defined outline into runtime class records
  const buildRecords = (course: CourseType): ClassRecords | undefined => {
    if (!course.courseOutline) return undefined;
    const records: ClassRecords = {};
    course.courseOutline.forEach((mod, idx) => {
      const weekKey = `week${idx + 1}`;
      const items: Array<
        LessonType | { quizzes: QuizType[] } | { assignment: AssignmentType }
      > = [];

      // classes/lessons
      if (mod.classes) {
        mod.classes.forEach((cls, cIdx) => {
          items.push({
            classNo: cIdx + 1,
            title: cls.title,
            // Set video URL - ytVideo field is used for both YouTube and other URLs
            ytVideo: cls.ytVideoUrl,
            duration: "",
            completed: false,
            resources: cls.resources,
          });
        });
      }

      // quizzes attached to module
      if (mod.quizzes && mod.quizzes.length > 0) {
        const converted: QuizType[] = mod.quizzes.map((q) => {
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
        const assignmentObj: AssignmentType = {
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

  const enrolledCourses: Array<CourseType & { status?: string }> =
    currentStudent && enrollments.length > 0
      ? enrollments
          .filter(
            (e) =>
              e.studentId === currentStudent.id && (e.accessEnabled ?? true),
          )
          .map((e) => {
            const course = allCourses.find(
              (c) => String(c.id) === String(e.courseId),
            );
            if (!course) return null;
            const withRecords: CourseType & { status?: string } = {
              ...course,
              status: e.status,
              ...(buildRecords(course)
                ? { classRecords: buildRecords(course) }
                : {}),
            } as CourseType & { status?: string };

            return withRecords;
          })
          .filter((c): c is CourseType & { status?: string } => c !== null)
      : [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          আমার কোর্সসমূহ
        </h1>
        <div className="flex items-center gap-2 text-sm ">
          <div className="w-4 h-4 rounded-full bg-emerald-600 animate-pulse" />
          {enrolledCourses.length} টি কোর্স রানিং
        </div>
      </div>

      <div className="grid gap-6">
        {enrolledCourses.map((course) => {
          const courseSlug = createSlug(course.title);
          const videoPlayerUrl = `/student/video-player/${courseSlug}`;
          return (
            <div
              key={course.id}
              className="bg-white border border-gray-300 rounded-2xl p-2 shadow-xl flex flex-col md:flex-row items-center gap-6 hover:border-gray-400 transition-colors group"
            >
              <button
                onClick={() => {
                  navigate(videoPlayerUrl);
                }}
                className="cursor-pointer"
              >
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={course.bannerImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </button>

              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider border ${
                        course.status === "completed"
                          ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}
                    >
                      {course.status === "completed"
                        ? "Completed"
                        : "In Progress"}
                    </span>
                    <span className="text-gray-600 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> সময় ৮ মাস
                    </span>
                  </div>
                  <Link
                    to={videoPlayerUrl}
                    className="text-xl font-bold text-black leading-tight"
                  >
                    {course.title}
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-500" />
                    <span>ব্যাচ {course.batchNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-500" />
                    <span>
                      শুরু:{" "}
                      {course.startDate
                        ? new Date(course.startDate).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <Button
                  onClick={() => {
                    navigate(videoPlayerUrl);
                  }}
                  className="w-full md:w-auto bg-primary hover:bg-red-500 text-white font-bold px-8 cursor-pointer"
                >
                  কোর্স শুরু করুন
                </Button>
              </div>
            </div>
          );
        })}

        {enrolledCourses.length === 0 && (
          <div className="p-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-gray-600 font-medium">
              আপনি এখনও কোন কোর্সে এনরোল করেননি।
            </h3>
            <Button
              onClick={() => navigate("/")}
              className="mt-4 bg-transparent border border-gray-300 text-gray-600 hover:text-black hover:bg-gray-100 cursor-pointer"
            >
              সব কোর্স দেখুন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
