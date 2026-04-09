import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeEnrollment, toggleAccess } from "@/redux/slices/enrollmentSlice";
import type {
  Enrollment,
  EnrollmentStatus,
} from "@/redux/slices/enrollmentSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
import {
  Trash2,
  SquarePen,
  Search,
  FileText,
  Zap,
  Eye,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../shared/PageHeader";
import { formatDateShort } from "@/lib/utils";
import EditEnrollmentDialog from "./EditEnrollmentDialog";
import AssignmentSubmissionsDialog from "./AssignmentSubmissionsDialog";
import { QuizSubmissionsDialog } from "./QuizSubmissionsDialog";
import ViewEnrollmentDialog from "./ViewEnrollmentDialog";

const statusConfig: Record<
  EnrollmentStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  inProgress: {
    label: "In Progress",
    className: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <Clock3 className="w-3 h-3" />,
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
};

const Enrollments = () => {
  const dispatch = useAppDispatch();
  const enrollments = useAppSelector((state) => state.enrollments.items);
  const courses = useAppSelector((state) => state.courses.items);
  const categories = useAppSelector((state) => state.categories.items);
  const students = useAppSelector((state) => state.student.students);

  const [editEnrollmentId, setEditEnrollmentId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewEnrollmentId, setViewEnrollmentId] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [submissionsEnrollmentId, setSubmissionsEnrollmentId] = useState<
    string | null
  >(null);
  const [quizSubmissionsEnrollmentId, setQuizSubmissionsEnrollmentId] =
    useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterCourseType, setFilterCourseType] = useState<string>("all");
  const [filterDateRange, setFilterDateRange] = useState<DateRange | undefined>(
    undefined,
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return enrollments.filter((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId);
      const student = students.find((s) => s.id === enrollment.studentId);

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchStudent =
          student?.name.toLowerCase().includes(q) ||
          student?.email.toLowerCase().includes(q);
        const matchCourse = course?.title.toLowerCase().includes(q);
        if (!matchStudent && !matchCourse) return false;
      }

      if (filterCategory !== "all" && course?.categoryId !== filterCategory)
        return false;

      if (filterCourseType === "live" && !course?.isLiveCourse) return false;
      if (filterCourseType === "recorded" && !course?.isPreRecordedCourse)
        return false;

      if (filterDateRange?.from) {
        const from = new Date(filterDateRange.from);
        from.setHours(0, 0, 0, 0);
        if (new Date(enrollment.enrolledAt) < from) return false;
      }
      if (filterDateRange?.to) {
        const to = new Date(filterDateRange.to);
        to.setHours(23, 59, 59, 999);
        if (new Date(enrollment.enrolledAt) > to) return false;
      }

      if (filterStatus !== "all" && enrollment.status !== filterStatus)
        return false;

      return true;
    });
  }, [
    enrollments,
    courses,
    students,
    searchQuery,
    filterCategory,
    filterCourseType,
    filterDateRange,
    filterStatus,
  ]);

  const handleDelete = (enrollment: Enrollment) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm font-medium">এই এনরোলমেন্টটি মুছে ফেলবেন?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              dispatch(removeEnrollment(enrollment.id));
              toast.success("এনরোলমেন্ট মুছে ফেলা হয়েছে!");
              toast.dismiss(t.id);
            }}
            className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition"
          >
            হ্যাঁ, মুছুন
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded-md hover:bg-gray-300 transition"
          >
            বাতিল
          </button>
        </div>
      </div>
    ));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterCourseType("all");
    setFilterDateRange(undefined);
    setFilterStatus("all");
  };

  const hasActiveFilters =
    searchQuery ||
    filterCategory !== "all" ||
    filterCourseType !== "all" ||
    filterDateRange?.from ||
    filterStatus !== "all";

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Enrollments</PageHeader>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          Total: {enrollments.length}
        </Badge>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
        {/* <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Student / course..."
              className="pl-9 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-9 text-sm mt-1">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="inProgress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <div className="">
            <DateRangePicker
              value={filterDateRange}
              onChange={setFilterDateRange}
              align="start"
              className="sm:col-span-2"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-red-500 hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm py-8 text-center">
          No enrollments found.
        </p>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-10">#</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((enrollment, index) => {
                const course = courses.find(
                  (c) => c.id === enrollment.courseId,
                );
                const student = students.find(
                  (s) => s.id === enrollment.studentId,
                );
                const category = categories.find(
                  (c) => c.id === course?.categoryId,
                );
                const sc =
                  statusConfig[enrollment.status] ?? statusConfig.inProgress;
                const accessEnabled = enrollment.accessEnabled ?? true;
                return (
                  <TableRow
                    key={enrollment.id}
                    className="hover:bg-slate-50/50"
                  >
                    <TableCell className="text-slate-400 text-xs">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm text-slate-800">
                        {student?.name ?? "—"}
                      </div>
                      <div className="text-xs text-slate-400">
                        {student?.email ?? enrollment.studentId}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-slate-700 max-w-48 truncate">
                      {course?.title ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {category?.name ?? "—"}
                    </TableCell>
                    <TableCell>
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
                          Recorded
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      ৳{enrollment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${sc.className}`}
                      >
                        {sc.icon}
                        {sc.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={accessEnabled}
                          onCheckedChange={() =>
                            dispatch(toggleAccess(enrollment.id))
                          }
                          title={
                            accessEnabled ? "Revoke access" : "Grant access"
                          }
                        />
                        {/* <span
                          className={`text-xs font-medium ${
                            accessEnabled ? "text-emerald-600" : "text-red-500"
                          }`}
                        >
                          {accessEnabled ? "On" : "Off"}
                        </span> */}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDateShort(enrollment.enrolledAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View button */}
                        <button
                          onClick={() => {
                            setViewEnrollmentId(enrollment.id);
                            setViewDialogOpen(true);
                          }}
                          className="p-1 bg-slate-500 hover:bg-slate-600 text-white rounded-md transition cursor-pointer"
                          aria-label="View enrollment"
                          title="View Details"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        {/* Submissions button */}
                        <button
                          onClick={() =>
                            setSubmissionsEnrollmentId(enrollment.id)
                          }
                          className="relative p-1 bg-violet-500 hover:bg-violet-600 text-white rounded-md transition cursor-pointer"
                          aria-label="View submissions"
                          title="Assignment Submissions"
                        >
                          <FileText className="w-3 h-3" />
                          {(enrollment.assignmentMarks?.length ?? 0) > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 text-[9px] font-bold text-black flex items-center justify-center leading-none">
                              {enrollment.assignmentMarks!.length}
                            </span>
                          )}
                        </button>
                        {/* Quiz submissions button */}
                        <button
                          onClick={() =>
                            setQuizSubmissionsEnrollmentId(enrollment.id)
                          }
                          className="relative p-1 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition cursor-pointer"
                          aria-label="View quiz submissions"
                          title="Quiz Submissions"
                        >
                          <Zap className="w-3 h-3" />
                          {(enrollment.quizMarks?.length ?? 0) > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 text-[9px] font-bold text-black flex items-center justify-center leading-none">
                              {enrollment.quizMarks!.length}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setEditEnrollmentId(enrollment.id);
                            setDialogOpen(true);
                          }}
                          className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition cursor-pointer"
                          aria-label="Edit enrollment"
                        >
                          <SquarePen className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(enrollment)}
                          className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition cursor-pointer"
                          aria-label="Delete enrollment"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onOpenChange={(open) => {
          setViewDialogOpen(open);
          if (!open) setViewEnrollmentId(null);
        }}
      >
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          {viewEnrollmentId && (
            <ViewEnrollmentDialog enrollmentId={viewEnrollmentId} />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditEnrollmentId(null);
        }}
      >
        <DialogContent className="max-w-md">
          {editEnrollmentId && (
            <EditEnrollmentDialog
              enrollmentId={editEnrollmentId}
              setDialogOpen={(open) => {
                setDialogOpen(open);
                if (!open) setEditEnrollmentId(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Assignment Submissions Dialog */}
      <Dialog
        open={!!submissionsEnrollmentId}
        onOpenChange={(open) => {
          if (!open) setSubmissionsEnrollmentId(null);
        }}
      >
        <DialogContent className="max-w-lg">
          {submissionsEnrollmentId &&
            (() => {
              const enrollment = enrollments.find(
                (e) => e.id === submissionsEnrollmentId,
              );
              const course = courses.find((c) => c.id === enrollment?.courseId);
              const student = students.find(
                (s) => s.id === enrollment?.studentId,
              );
              // Build maxMarksByWeek from course outline
              const maxMarksByWeek: Record<string, number> = {};
              course?.courseOutline?.forEach((mod, idx) => {
                const weekKey = `week${idx + 1}`;
                if (mod.assignment && mod.assignment.length > 0) {
                  maxMarksByWeek[weekKey] = mod.assignment[0].maxMarks ?? 100;
                }
              });
              return (
                <AssignmentSubmissionsDialog
                  enrollmentId={submissionsEnrollmentId}
                  studentName={student?.name ?? "অজানা শিক্ষার্থী"}
                  courseName={course?.title ?? "অজানা কোর্স"}
                  assignmentMarks={enrollment?.assignmentMarks ?? []}
                  maxMarksByWeek={maxMarksByWeek}
                />
              );
            })()}
        </DialogContent>
      </Dialog>

      {/* Quiz Submissions Dialog */}
      {quizSubmissionsEnrollmentId &&
        (() => {
          const enrollment = enrollments.find(
            (e) => e.id === quizSubmissionsEnrollmentId,
          );
          const course = courses.find((c) => c.id === enrollment?.courseId);
          const student = students.find((s) => s.id === enrollment?.studentId);
          return (
            <QuizSubmissionsDialog
              open={!!quizSubmissionsEnrollmentId}
              onOpenChange={(open: boolean) => {
                if (!open) setQuizSubmissionsEnrollmentId(null);
              }}
              enrollmentId={quizSubmissionsEnrollmentId}
              studentName={student?.name ?? "অজানা শিক্ষার্থী"}
              courseName={course?.title ?? "অজানা কোর্স"}
              quizMarks={enrollment?.quizMarks ?? []}
            />
          );
        })()}
    </div>
  );
};

export default Enrollments;
