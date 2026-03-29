import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Github,
  Clock,
  AlertCircle,
  Calendar,
  Trophy,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  assignmentSchema,
  type AssignmentFormValues,
} from "@/schemas/assignment";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import {
  submitAssignment,
  autoCompleteEnrollment,
} from "@/Redux/slices/enrollmentSlice";
import { findCourseBySlug } from "@/lib/utils";
import toast from "react-hot-toast";

const Assignment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseName } = useParams<{ courseName: string }>();

  const assignment = location.state?.assignment;
  const weekKey: string = location.state?.weekKey ?? "";

  const { title, description, instructions, dueDate, maxMarks } =
    assignment || {};

  // Get current student & enrollment
  const currentStudent = useAppSelector(
    (state) => state.student.currentStudent,
  );
  const enrollments = useAppSelector((state) => state.enrollments.items);
  const allCourses = useAppSelector((state) => state.courses.items);

  const course = courseName
    ? findCourseBySlug(courseName, allCourses)
    : undefined;
  const enrollment =
    course && currentStudent
      ? enrollments.find(
          (e) =>
            String(e.courseId) === String(course.id) &&
            e.studentId === currentStudent.id,
        )
      : undefined;

  // Check if already submitted for this week
  const existingSubmission = enrollment?.assignmentMarks?.find(
    (m) => m.assignmentWeekId === weekKey,
  );

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: { githubLink: "" },
  });

  useEffect(() => {
    if (!dueDate) return;
    const timer = setInterval(() => {
      const target = new Date(dueDate).getTime();
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          isExpired: false,
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [dueDate]);

  function onSubmit(values: AssignmentFormValues) {
    if (!enrollment) {
      toast.error("এনরোলমেন্ট তথ্য পাওয়া যায়নি!");
      return;
    }
    dispatch(
      submitAssignment({
        enrollmentId: enrollment.id,
        assignmentWeekId: weekKey,
        submissionLink: values.githubLink,
      }),
    ); // Auto-complete enrollment if all assignments & quizzes submitted
    const totalAssignmentWeeks =
      course?.courseOutline?.filter(
        (m) => m.assignment && m.assignment.length > 0,
      ).length ?? 0;
    const totalQuizWeeks =
      course?.courseOutline?.filter((m) => m.quizzes && m.quizzes.length > 0)
        .length ?? 0;
    dispatch(
      autoCompleteEnrollment({
        enrollmentId: enrollment.id,
        totalAssignmentWeeks,
        totalQuizWeeks,
      }),
    );
    toast.success("অ্যাসাইনমেন্ট সফলভাবে জমা দেওয়া হয়েছে!");
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">
          অ্যাসাইনমেন্ট পাওয়া যায়নি!
        </h1>
        <Button
          onClick={() => navigate(-1)}
          className="bg-primary hover:bg-red-500 text-white"
        >
          ফিরে যান
        </Button>
      </div>
    );
  }

  const lateDeduction = Math.round(maxMarks * 0.15);
  const possibleMarks = timeLeft.isExpired
    ? maxMarks - lateDeduction
    : maxMarks;

  // ── Marks View (already submitted) ──────────────────────────────────────────
  if (existingSubmission) {
    const isGraded = existingSubmission.marks !== undefined;
    return (
      <div className="bg-white text-black">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>ফিরে যান</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            জমা দেওয়া হয়েছে
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Title */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                {title}
              </h1>
              <p className="text-gray-500 text-sm">
                জমার তারিখ:{" "}
                {new Date(existingSubmission.submittedAt).toLocaleString(
                  "bn-BD",
                )}
              </p>
            </div>

            {/* Submission Link */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Github className="w-5 h-5" /> জমা দেওয়া লিঙ্ক
              </h3>
              <a
                href={existingSubmission.submissionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <Github className="w-5 h-5 text-gray-500 shrink-0" />
                <span className="text-sm font-medium text-blue-600 truncate group-hover:underline">
                  {existingSubmission.submissionLink}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 shrink-0 ml-auto" />
              </a>
            </div>

            {/* Marks & Comments */}
            {isGraded ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" /> মূল্যায়ন
                </h3>
                {/* Score bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-gray-600">প্রাপ্ত নম্বর</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      {existingSubmission.marks}
                      <span className="text-base text-gray-400 font-normal">
                        /{maxMarks}
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, ((existingSubmission.marks ?? 0) / maxMarks) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {existingSubmission.comments && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <MessageSquare className="w-4 h-4" /> শিক্ষকের মন্তব্য
                    </h4>
                    <p className="text-gray-600 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm leading-relaxed">
                      {existingSubmission.comments}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                <Clock className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h3 className="font-bold text-amber-800 mb-1">
                  মূল্যায়ন অপেক্ষামান
                </h3>
                <p className="text-sm text-amber-700">
                  শিক্ষক এখনো আপনার অ্যাসাইনমেন্ট মূল্যায়ন করেননি। অনুগ্রহ করে
                  অপেক্ষা করুন।
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-500">জমার ডেডলাইন</p>
                  <p className="font-bold text-gray-900">{dueDate}</p>
                </div>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center gap-3 text-sm">
                <Trophy className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-gray-500">সর্বোচ্চ নম্বর</p>
                  <p className="font-bold text-gray-900">{maxMarks}</p>
                </div>
              </div>
              {isGraded && (
                <>
                  <div className="h-px bg-gray-100" />
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="text-gray-500">প্রাপ্ত নম্বর</p>
                      <p className="font-bold text-emerald-600 text-lg">
                        {existingSubmission.marks}/{maxMarks}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Submission Form ──────────────────────────────────────────────────────────
  return (
    <div className="bg-white text-black">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>ফিরে যান</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>সর্বোচ্চ নম্বর: {maxMarks}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {title}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                {description}
              </p>
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-black">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  নির্দেশনাবলী:
                </h3>
                <ul className="space-y-3">
                  {instructions?.map((instruction: string, index: number) => (
                    <li key={index} className="flex gap-3 text-gray-600">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submission Form */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Github className="w-6 h-6" /> অ্যাসাইনমেন্ট জমা দিন
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="githubLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          GitHub রিপোজিটরি লিঙ্ক
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="https://github.com/username/repo"
                              {...field}
                              className="pl-12 h-12 border-gray-300 rounded-xl"
                            />
                            <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                    <div className="text-sm">
                      {timeLeft.isExpired ? (
                        <div className="flex items-center gap-2 text-rose-600 font-medium">
                          <AlertCircle className="w-4 h-4" />
                          <span>সময় অতিক্রান্ত! ১৫% নম্বর কাটা যাবে।</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-600 font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>সময়মতো জমা দিলে পূর্ণ নম্বর পাবেন।</span>
                        </div>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-primary hover:bg-red-500 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-95"
                    >
                      জমা দিন
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Countdown Timer */}
            <div
              className={`p-6 rounded-2xl border ${
                timeLeft.isExpired
                  ? "bg-rose-50 border-rose-100 text-rose-900"
                  : "bg-blue-50 border-blue-100 text-blue-900 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2 mb-4 font-bold">
                <Clock
                  className={`w-5 h-5 ${timeLeft.isExpired ? "text-rose-600" : "text-blue-600"}`}
                />
                {timeLeft.isExpired ? "সময় শেষ হয়েছে" : "বাকি সময়"}
              </div>
              {!timeLeft.isExpired ? (
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: "দিন", value: timeLeft.days },
                    { label: "ঘন্টা", value: timeLeft.hours },
                    { label: "মিনিট", value: timeLeft.minutes },
                    { label: "সেকেন্ড", value: timeLeft.seconds },
                  ].map((unit, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-2 shadow-sm border border-blue-200/50"
                    >
                      <div className="text-xl font-bold text-blue-700">
                        {unit.value}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-blue-500">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm font-medium">
                  এই অ্যাসাইনমেন্টটি জমা দেওয়ার সময় শেষ হয়ে গিয়েছে। এখন জমা
                  দিলে লেট সাবমিশন হিসেবে গণ্য হবে।
                </div>
              )}
            </div>

            {/* Deadlines & Marks */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-500">শেষ সময়</p>
                  <p className="font-bold text-gray-900">{dueDate}</p>
                </div>
              </div>
              <div className="h-px bg-gray-100 w-full" />
              <div className="flex items-center gap-3 text-sm">
                <Trophy
                  className={`w-5 h-5 ${timeLeft.isExpired ? "text-rose-500" : "text-emerald-500"}`}
                />
                <div>
                  <p className="text-gray-500">সম্ভাব্য সর্বোচ্চ নম্বর</p>
                  <p
                    className={`font-bold ${timeLeft.isExpired ? "text-rose-600" : "text-emerald-700"}`}
                  >
                    {possibleMarks} {timeLeft.isExpired && `(মূল: ${maxMarks})`}
                  </p>
                </div>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h4 className="font-bold mb-2">সাহায্য প্রয়োজন?</h4>
                <p className="text-xs text-gray-400 mb-4">
                  আপনার যদি অ্যাসাইনমেন্ট নিয়ে কোন প্রশ্ন থাকে, আমাদের সাপোর্ট
                  গ্রুপে যোগাযোগ করুন।
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-white text-black transition-colors cursor-pointer"
                >
                  সাপোর্ট নিন
                </Button>
              </div>
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
