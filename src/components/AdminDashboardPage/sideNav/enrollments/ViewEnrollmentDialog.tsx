import type { Enrollment } from "@/Redux/slices/enrollmentSlice";
import { useAppSelector } from "@/Redux/hooks";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  User,
  BookOpen,
  Calendar,
  DollarSign,
  Activity,
  FileText,
  Zap,
  ShieldCheck,
  ShieldOff,
  CheckCircle2,
  Clock3,
  Star,
} from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface ViewEnrollmentDialogProps {
  enrollmentId: string;
}

const statusConfig = {
  inProgress: {
    label: "In Progress",
    className: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <Clock3 className="w-3.5 h-3.5" />,
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
};

const ViewEnrollmentDialog = ({ enrollmentId }: ViewEnrollmentDialogProps) => {
  const enrollments = useAppSelector((state) => state.enrollments.items);
  const courses = useAppSelector((state) => state.courses.items);
  const students = useAppSelector((state) => state.student.students);

  const enrollment: Enrollment | undefined = enrollments.find(
    (e) => e.id === enrollmentId,
  );
  const course = courses.find((c) => c.id === enrollment?.courseId);
  const student = students.find((s) => s.id === enrollment?.studentId);
  console.log("Enrolled student:", student);
  const categories = useAppSelector((state) => state.categories.items);
  const category = categories.find((c) => c.id === course?.categoryId);

  if (!enrollment) return null;

  const sc = statusConfig[enrollment.status] ?? statusConfig.inProgress;
  const accessEnabled = enrollment.accessEnabled ?? true;

  // Compute total weeks with assignments and quizzes from course outline
  const totalAssignmentWeeks =
    course?.courseOutline?.filter(
      (m) => m.assignment && m.assignment.length > 0,
    ).length ?? 0;
  const totalQuizWeeks =
    course?.courseOutline?.filter((m) => m.quizzes && m.quizzes.length > 0)
      .length ?? 0;

  const submittedAssignments = enrollment.assignmentMarks?.length ?? 0;
  const submittedQuizzes = enrollment.quizMarks?.length ?? 0;

  return (
    <div className="space-y-5">
      <DialogHeader>
        <DialogTitle className="text-lg font-bold text-slate-800">
          Enrollment Details
        </DialogTitle>
        <DialogDescription className="text-xs text-slate-400">
          ID: {enrollment.id}
        </DialogDescription>
      </DialogHeader>

      {/* Student & Course Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Student */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 uppercase tracking-wide">
            <User className="w-3.5 h-3.5" />
            {student?.name ?? "—"}
          </div>
          <p className="text-xs text-slate-400">{student?.email ?? "—"}</p>
          <p className="text-xs text-slate-400">{student?.phone ?? "—"}</p>
        </div>

        {/* Course */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 uppercase tracking-wide">
            <BookOpen className="w-3.5 h-3.5" />
            {course?.title ?? "—"}
          </div>
          
          <p className="text-xs text-slate-400">{category?.name ?? "—"}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Enrolled Date */}
        <div className="rounded-xl border border-slate-100 bg-white p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            Enrolled
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {formatDateShort(enrollment.enrolledAt)}
          </p>
        </div>

        {/* Amount */}
        <div className="rounded-xl border border-slate-100 bg-white p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <DollarSign className="w-3.5 h-3.5" />
            Amount
          </div>
          <p className="text-sm font-semibold text-slate-700">
            ৳{enrollment.amount.toLocaleString()}
          </p>
        </div>

        {/* Status */}
        <div className="rounded-xl border border-slate-100 bg-white p-2 space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Activity className="w-3.5 h-3.5" />
            Status
          </div>
          <span
            className={`inline-flex items-center gap-1 px-1 py-0.5 rounded-lg text-xs font-semibold border ${sc.className}`}
          >
            {sc.icon}
            {sc.label}
          </span>
        </div>

        {/* Access */}
        <div className="rounded-xl border border-slate-100 bg-white p-2 space-y-1">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            {accessEnabled ? (
              <ShieldCheck className="w-3.5 h-3.5" />
            ) : (
              <ShieldOff className="w-3.5 h-3.5" />
            )}
            Access
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${
              accessEnabled
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-600 border-red-200"
            }`}
          >
            {accessEnabled ? "Granted" : "Revoked"}
          </span>
        </div>
      </div>

      {/* Course Type */}
      <div className="rounded-xl border border-slate-100 bg-white p-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Course Type
        </span>
        {course?.isLiveCourse ? (
          <Badge
            variant="outline"
            className="text-xs border-orange-200 text-orange-600"
          >
            Live
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-xs border-blue-200 text-blue-600"
          >
            Pre-Recorded
          </Badge>
        )}
      </div>

      {/* Progress Summary */}
      <div className="rounded-xl border border-slate-100 bg-white p-3 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Submission Progress
        </p>
        <div className="grid grid-cols-2 gap-3">
          {/* Assignments */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-50">
              <FileText className="w-3.5 h-3.5 text-violet-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Assignments</p>
              <p className="text-sm font-bold text-slate-700">
                {submittedAssignments}{" "}
                <span className="text-slate-400 font-normal">
                  / {totalAssignmentWeeks}
                </span>
              </p>
            </div>
          </div>
          {/* Quizzes */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-50">
              <Zap className="w-3.5 h-3.5 text-teal-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Quizzes</p>
              <p className="text-sm font-bold text-slate-700">
                {submittedQuizzes}{" "}
                <span className="text-slate-400 font-normal">
                  / {totalQuizWeeks}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Marks */}
      {(enrollment.assignmentMarks?.length ?? 0) > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            Assignment Submissions
          </p>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">
                    Week
                  </th>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">
                    Submitted
                  </th>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">
                    Marks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {enrollment.assignmentMarks!.map((mark) => (
                  <tr key={mark.id} className="hover:bg-slate-50/50">
                    <td className="px-3 py-2 font-medium text-slate-700 capitalize">
                      {mark.assignmentWeekId.replace("week", "Week ")}
                    </td>
                    <td className="px-3 py-2 text-slate-500">
                      {formatDateShort(mark.submittedAt)}
                    </td>
                    <td className="px-3 py-2">
                      {mark.marks != null ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                          <Star className="w-3 h-3" />
                          {mark.marks}
                        </span>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quiz Marks */}
      {(enrollment.quizMarks?.length ?? 0) > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            Quiz Submissions
          </p>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">
                    Week
                  </th>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">
                    Score
                  </th>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {enrollment.quizMarks!.map((mark) => {
                  const pct = Math.round(
                    (mark.score / mark.totalQuestions) * 100,
                  );
                  return (
                    <tr key={mark.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2 font-medium text-slate-700 capitalize">
                        {mark.quizWeekId.replace("week", "Week ")}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`font-semibold ${pct >= 70 ? "text-emerald-600" : pct >= 40 ? "text-amber-600" : "text-red-500"}`}
                        >
                          {mark.score}/{mark.totalQuestions}
                        </span>
                        <span className="text-slate-400 ml-1">({pct}%)</span>
                      </td>
                      <td className="px-3 py-2 text-slate-500">
                        {formatDateShort(mark.submittedAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEnrollmentDialog;
