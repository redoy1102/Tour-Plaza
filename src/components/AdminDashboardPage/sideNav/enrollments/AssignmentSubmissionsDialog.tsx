import { useState } from "react";
import { useAppDispatch } from "@/Redux/hooks";
import {
  gradeAssignment,
  type AssignmentMark,
} from "@/Redux/slices/enrollmentSlice";
import {
  Github,
  ExternalLink,
  Star,
  MessageSquare,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

interface Props {
  enrollmentId: string;
  studentName: string;
  courseName: string;
  assignmentMarks: AssignmentMark[];
  maxMarksByWeek: Record<string, number>; // weekKey → maxMarks from course outline
}

const AssignmentSubmissionsDialog = ({
  enrollmentId,
  studentName,
  courseName,
  assignmentMarks,
  maxMarksByWeek,
}: Props) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<string | null>(
    assignmentMarks[0]?.assignmentWeekId ?? null,
  );
  const [gradeInputs, setGradeInputs] = useState<
    Record<string, { marks: string; comments: string }>
  >({});

  const handleGradeChange = (
    weekId: string,
    field: "marks" | "comments",
    value: string,
  ) => {
    setGradeInputs((prev) => ({
      ...prev,
      [weekId]: {
        ...(prev[weekId] ?? { marks: "", comments: "" }),
        [field]: value,
      },
    }));
  };

  const handleSubmitGrade = (submission: AssignmentMark) => {
    const input = gradeInputs[submission.assignmentWeekId];
    const marksNum = Number(input?.marks);
    const maxMarks = maxMarksByWeek[submission.assignmentWeekId] ?? 100;

    if (!input?.marks || isNaN(marksNum)) {
      toast.error("দয়া করে সঠিক নম্বর লিখুন।");
      return;
    }
    if (marksNum < 0 || marksNum > maxMarks) {
      toast.error(`নম্বর ০ থেকে ${maxMarks} এর মধ্যে হতে হবে।`);
      return;
    }

    dispatch(
      gradeAssignment({
        enrollmentId,
        assignmentWeekId: submission.assignmentWeekId,
        marks: marksNum,
        comments: input.comments ?? "",
      }),
    );
    toast.success("মূল্যায়ন সফলভাবে সংরক্ষিত হয়েছে!");

    // Reset input for this week after grading
    setGradeInputs((prev) => {
      const next = { ...prev };
      delete next[submission.assignmentWeekId];
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-0 max-h-[80vh]">
      <DialogHeader className="pb-4 border-b border-gray-200 shrink-0">
        <DialogTitle className="text-lg font-bold">
          অ্যাসাইনমেন্ট সাবমিশন
        </DialogTitle>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-semibold text-gray-700">{studentName}</span> —{" "}
          {courseName}
        </p>
      </DialogHeader>

      {assignmentMarks.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <Clock className="w-10 h-10 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">এখনো কোনো সাবমিশন নেই।</p>
        </div>
      ) : (
        <div className="overflow-y-auto flex-1 space-y-3 pt-4 pr-1">
          {assignmentMarks.map((submission) => {
            const isOpen = expanded === submission.assignmentWeekId;
            const isGraded = submission.marks !== undefined;
            const maxMarks = maxMarksByWeek[submission.assignmentWeekId] ?? 100;
            const input = gradeInputs[submission.assignmentWeekId];

            return (
              <div
                key={submission.id}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                {/* Header row */}
                <button
                  onClick={() =>
                    setExpanded(isOpen ? null : submission.assignmentWeekId)
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-800 capitalize">
                      {submission.assignmentWeekId.replace(/(\d+)/, " $1")}
                    </span>
                    {isGraded ? (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {submission.marks}/{maxMarks}
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        মূল্যায়ন বাকি
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <span>
                      {new Date(submission.submittedAt).toLocaleDateString(
                        "bn-BD",
                      )}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
                    {/* Submission link */}
                    <div className="pt-3">
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        সাবমিশন লিঙ্ক
                      </p>
                      <a
                        href={submission.submissionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <Github className="w-4 h-4 text-gray-500 shrink-0" />
                        <span className="text-sm text-blue-600 truncate group-hover:underline flex-1">
                          {submission.submissionLink}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      </a>
                    </div>

                    {/* Already graded view */}
                    {isGraded && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-emerald-700 flex items-center gap-1">
                            <Star className="w-4 h-4" /> প্রদত্ত নম্বর
                          </span>
                          <span className="font-bold text-emerald-700">
                            {submission.marks}/{maxMarks}
                          </span>
                        </div>
                        {submission.comments && (
                          <p className="text-xs text-emerald-800 bg-white border border-emerald-200 rounded p-2">
                            {submission.comments}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Grade form (always shown to allow re-grading) */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        {isGraded ? "নম্বর আপডেট করুন" : "নম্বর দিন"}
                        <span className="text-gray-400 font-normal">
                          (সর্বোচ্চ {maxMarks})
                        </span>
                      </p>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          min={0}
                          max={maxMarks}
                          placeholder={`০–${maxMarks}`}
                          value={
                            input?.marks ??
                            (isGraded ? String(submission.marks) : "")
                          }
                          onChange={(e) =>
                            handleGradeChange(
                              submission.assignmentWeekId,
                              "marks",
                              e.target.value,
                            )
                          }
                          className="h-9 text-sm w-28 shrink-0"
                        />
                        <Textarea
                          placeholder="মন্তব্য লিখুন (ঐচ্ছিক)"
                          value={
                            input?.comments ??
                            (isGraded ? (submission.comments ?? "") : "")
                          }
                          onChange={(e) =>
                            handleGradeChange(
                              submission.assignmentWeekId,
                              "comments",
                              e.target.value,
                            )
                          }
                          className="text-sm min-h-9 h-9 resize-none"
                          rows={1}
                        />
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleSubmitGrade(submission)}
                        className="w-full bg-[#007cc2] hover:bg-[#006bb0] text-white"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {isGraded ? "আপডেট করুন" : "নম্বর সংরক্ষণ করুন"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignmentSubmissionsDialog;
