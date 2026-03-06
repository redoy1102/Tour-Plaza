import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/Redux/hooks";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  CalendarDays,
  Clock,
  Users,
  MonitorPlay,
  PlayCircle,
  CheckCircle2,
  Info,
  GraduationCap,
  Tag,
  Layers,
  Sparkles,
  Radio,
  ClipboardCheck,
  Cpu,
  Hammer,
  PackageOpen,
  HelpCircle,
  FileText,
  Trophy,
  BookOpen,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const CourseViewPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const course = useAppSelector((state) =>
    state.courses.items.find((c) => c.id === courseId),
  );

  console.log(course);

  const categories = useAppSelector((state) => state.categories.items);
  const instructors = useAppSelector((state) => state.instructors.items);
  const tools = useAppSelector((state) => state.tools.items);
  const prerequisites = useAppSelector((state) => state.prerequisites.items);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Info className="w-12 h-12 text-gray-400" />
        <h2 className="text-xl font-semibold">Course not found</h2>
        <Button onClick={() => navigate("/admin-dashboard/courses/allCourses")}>
          Go Back
        </Button>
      </div>
    );
  }

  const categoryName =
    categories.find((c) => c.id === course.categoryId)?.name || "Uncategorized";
  const instructorNames = instructors
    .filter((i) => course.instructorsIds?.includes(i.id))
    .map((i) => i.name);
  const toolNames = tools
    .filter((t) => course.toolsIds?.includes(t.id))
    .map((t) => t.name);
  const prerequisiteTitles = prerequisites
    .filter((p) => course.prerequisitesIds?.includes(p.id))
    .map((p) => p.title);

  const finalPrice =
    course.discount > 0 ? course.price - course.discount : course.price;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Navigation */}
      <div className="flex justify-between items-center">
        <PageHeader>Course Details</PageHeader>
        <Button
          variant="outline"
          onClick={() => navigate("/admin-dashboard/courses/allCourses")}
        >
          Back to Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ============== LEFT COLUMN (Main Content) ============== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Title Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* Category Badge */}
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                <Tag className="w-3.5 h-3.5" />
                {categoryName}
              </span>
              {/* Batch Number */}
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                <Layers className="w-3.5 h-3.5" />
                Batch {course.batchNumber}
              </span>

              {/* Conditional Badges */}
              {course.isFeatured && (
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Course
                </span>
              )}
              {course.isLiveCourse && (
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                  <Radio className="w-3.5 h-3.5" />
                  Live Course
                </span>
              )}

              {course.isPreRecordedCourse && (
                <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                  <PlayCircle className="w-3.5 h-3.5" />
                  Pre-recorded Course
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {course.title}
            </h1>
            {instructorNames.length > 0 && (
              <p className="text-gray-600 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Instructors:{" "}
                <span className="font-medium text-gray-900">
                  {instructorNames.join(", ")}
                </span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-300 rounded-2xl p-3 md:p-4">
            <h2 className="text-xl font-bold mb-3">About this Course</h2>
            <div
              className="prose max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>

          {/* Tools & Prerequisites
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-300 rounded-2xl p-4">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />{" "}
                Prerequisites
              </h2>
              <div>
                {prerequisiteTitles.length ? (
                  <ul className="space-y-2 text-gray-600">
                    <div className="grid grid-cols-2 gap-1">
                      {prerequisiteTitles.map((title, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <ListChecks className="w-4 h-4 text-green-500" />
                          {title}
                        </li>
                      ))}
                    </div>
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    No prerequisites required.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600" /> Tools Covered
              </h2>
              {toolNames.length ? (
                <div className="flex flex-wrap gap-2">
                  {toolNames.map((name, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 border text-gray-700 text-sm px-3 py-1 rounded-md"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No specific tools listed.
                </p>
              )}
            </div>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prerequisites Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                <ClipboardCheck className="w-5 h-5 text-emerald-600" />
                Prerequisites
              </h2>
              <div>
                {prerequisiteTitles.length ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {prerequisiteTitles.map((title, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-400 italic">
                    <Info className="w-4 h-4" />
                    No prior experience required.
                  </div>
                )}
              </div>
            </div>

            {/* Tools Covered Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                <Cpu className="w-5 h-5 text-indigo-600" />
                Software & Tools
              </h2>
              {toolNames.length ? (
                <div className="flex flex-wrap gap-2">
                  {toolNames.map((name, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-lg"
                    >
                      <Hammer className="w-3 h-3" />
                      {name}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-400 italic">
                  <PackageOpen className="w-4 h-4" />
                  No specific tools listed.
                </div>
              )}
            </div>
          </div>

          {/* Course Outline (Syllabus) */}
          <div className="bg-white border border-gray-300 rounded-2xl p-3 md:p-4">
            <h2 className="text-xl font-bold mb-3">Course Syllabus</h2>
            {course.courseOutline?.length ? (
              <div className="space-y-4">
                {course.courseOutline.map((module, mIdx) => {
                  const classes = module.classes ?? [];
                  return (
                    <div
                      key={mIdx}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <div className="bg-gray-50 border-b px-4 py-3">
                        <h3 className="font-bold text-gray-900">
                          {module.moduleTitle?.trim()
                            ? module.moduleTitle
                            : `Module ${mIdx + 1}`}
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {classes.length ? (
                          classes.map((cls, cIdx) => (
                            <div
                              key={cIdx}
                              className="p-5 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    Class-{cIdx + 1}
                                    {cls.title ? `: ${cls.title}` : ""}
                                  </p>
                                  {cls.resources && (
                                    <p className="text-sm text-gray-600 mt-1">
                                      {cls.resources}
                                    </p>
                                  )}
                                </div>
                                {cls.ytVideoUrl && (
                                  <a
                                    href={cls.ytVideoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                                  >
                                    <PlayCircle className="w-4 h-4" /> Watch
                                  </a>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-5 text-sm text-gray-500">
                            No classes added for this module.
                          </div>
                        )}
                      </div>

                      {/* Quizzes Table */}
                      {module.quizzes && module.quizzes.length > 0 && (
                        <div className="px-5 py-4 bg-gray-50/30 border-t">
                          <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
                            <HelpCircle className="w-4 h-4 text-orange-500" />
                            Module Quizzes
                          </h4>
                          <div className="border rounded-lg overflow-hidden bg-white">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                  <TableHead className="w-12">#</TableHead>
                                  <TableHead>Question</TableHead>
                                  <TableHead>Options</TableHead>
                                  <TableHead>Correct Answer</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {module.quizzes.map((quiz, qIdx) => (
                                  <TableRow key={qIdx}>
                                    <TableCell className="font-medium text-gray-400">
                                      {qIdx + 1}
                                    </TableCell>
                                    <TableCell className="max-w-md">
                                      {quiz.question}
                                    </TableCell>
                                    <TableCell>
                                      <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="p-1 px-2 border rounded bg-gray-50">
                                          1: {quiz.options.opt1}
                                        </div>
                                        <div className="p-1 px-2 border rounded bg-gray-50">
                                          2: {quiz.options.opt2}
                                        </div>
                                        <div className="p-1 px-2 border rounded bg-gray-50">
                                          3: {quiz.options.opt3}
                                        </div>
                                        <div className="p-1 px-2 border rounded bg-gray-50">
                                          4: {quiz.options.opt4}
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      {quiz.answer ? (
                                        <Badge
                                          variant="secondary"
                                          className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
                                        >
                                          Option{" "}
                                          {quiz.answer.replace("opt", "")}
                                        </Badge>
                                      ) : (
                                        <span className="text-gray-400 italic text-xs">
                                          Not set
                                        </span>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}

                      {/* Assignment Section */}
                      {module.assignment && (
                        <div className="px-5 py-6 bg-green-50/20 border-t">
                          <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                            <FileText className="w-4 h-4 text-green-600" />
                            Module Assignment
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-3 space-y-4">
                              <div className="bg-white p-4 border rounded-xl shadow-sm">
                                <h5 className="font-bold text-lg text-gray-900 mb-2">
                                  {module.assignment.title}
                                </h5>
                                <div
                                  className="text-sm text-gray-600 prose prose-sm max-w-none mb-4"
                                  dangerouslySetInnerHTML={{
                                    __html: module.assignment.description,
                                  }}
                                />
                                {module.assignment.instruction && (
                                  <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-lg">
                                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                                      <BookOpen className="w-3 h-3" />
                                      Instructions
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed italic">
                                      "{module.assignment.instruction}"
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="bg-white p-4 border rounded-xl shadow-sm flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-50 rounded-lg">
                                    <Trophy className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                                      Max Marks
                                    </p>
                                    <p className="font-bold text-gray-900">
                                      {module.assignment.maxMarks}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-red-50 rounded-lg">
                                    <CalendarDays className="w-4 h-4 text-red-600" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                                      Due Date
                                    </p>
                                    <p className="font-bold text-gray-900">
                                      {module.assignment.dueDate
                                        ? format(
                                            new Date(module.assignment.dueDate),
                                            "PPP",
                                          )
                                        : "No Deadline"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed">
                <p className="text-gray-500">
                  Course outline has not been published yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ============== RIGHT COLUMN (Sticky Sidebar) ============== */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-6">
          {/* Main Action / Info Card */}
          <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
            {course.bannerImage ? (
              <img
                src={course.bannerImage}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <MonitorPlay className="w-12 h-12 text-gray-300" />
              </div>
            )}

            <div className="p-6 space-y-3">
              {/* Pricing */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ৳{finalPrice}
                  </span>
                  {course.discount > 0 && (
                    <span className="text-lg text-gray-400 line-through">
                      ৳{course.price}
                    </span>
                  )}
                </div>
                {course.discount > 0 && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    You save ৳{course.discount}!
                  </p>
                )}
              </div>

              <hr />

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CalendarDays className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Starts</p>
                    <p className="text-gray-500">
                      {course.startDate
                        ? format(new Date(course.startDate), "MMMM d, yyyy")
                        : "TBA"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-500">
                      {course.courseDuration} Months
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Seats</p>
                    <p className="text-gray-500">{course.totalSeat} Total</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <MonitorPlay className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Live Classes</p>
                    <p className="text-gray-500">
                      {course.totalLiveClasses} Sessions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white border border-gray-300 rounded-2xl p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MonitorPlay className="w-4 h-4 text-red-500" /> Live Schedule
              </h3>
              {course.liveClassTime?.length ? (
                <ul className="space-y-2 text-sm text-gray-600">
                  {course.liveClassTime.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border-b border-gray-50 pb-1 last:border-0"
                    >
                      <span className="font-medium">{item.day}</span>
                      <span>
                        {item.startTime} - {item.endTime}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No schedule added.
                </p>
              )}
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" /> Support Schedule
              </h3>
              {course.supportClassTime?.length ? (
                <ul className="space-y-2 text-sm text-gray-600">
                  {course.supportClassTime.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border-b border-gray-50 pb-1 last:border-0"
                    >
                      <span className="font-medium">{item.day}</span>
                      <span>
                        {item.startTime} - {item.endTime}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No schedule added.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage;
