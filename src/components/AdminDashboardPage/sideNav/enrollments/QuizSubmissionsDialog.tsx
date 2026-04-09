import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Award,
  Calendar,
  Send,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { gradeQuiz } from "@/redux/slices/enrollmentSlice";
import type { QuizMark } from "@/redux/slices/enrollmentSlice";
import toast from "react-hot-toast";

interface QuizSubmissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enrollmentId: string;
  studentName: string;
  courseName: string;
  quizMarks: QuizMark[];
}

export function QuizSubmissionsDialog({
  open,
  onOpenChange,
  enrollmentId,
  studentName,
  courseName,
  quizMarks,
}: QuizSubmissionsDialogProps) {
  const dispatch = useAppDispatch();
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleSendComment = (quizWeekId: string) => {
    const comment = comments[quizWeekId]?.trim();
    if (!comment) {
      toast.error("মন্তব্য লিখুন");
      return;
    }
    dispatch(gradeQuiz({ enrollmentId, quizWeekId, adminComments: comment }));
    setComments((prev) => ({ ...prev, [quizWeekId]: "" }));
    toast.success("মন্তব্য পাঠানো হয়েছে");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-6 h-6 text-teal-600" />
            কুইজ ফলাফল - {studentName}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">কোর্স: {courseName}</p>
        </DialogHeader>

        <div className="space-y-4 max-h-120 overflow-y-auto pr-1">
          {quizMarks.length === 0 ? (
            <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <p className="text-blue-900">কোনো কুইজ জমা দেওয়া হয়নি</p>
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              value={expandedQuiz || ""}
              onValueChange={setExpandedQuiz}
            >
              {quizMarks.map((quiz) => {
                const percentage = Math.round(
                  (quiz.score / quiz.totalQuestions) * 100,
                );
                const hasComment = !!quiz.adminComments;

                return (
                  <AccordionItem
                    key={quiz.quizWeekId}
                    value={quiz.quizWeekId}
                    className="border border-gray-200 rounded-lg mb-3"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between w-full gap-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="font-semibold">
                            {quiz.quizWeekId}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-sky-100 text-sky-800"
                          >
                            {quiz.score}/{quiz.totalQuestions} ({percentage}%)
                          </Badge>
                          {hasComment && (
                            <Badge className="bg-emerald-100 text-emerald-800">
                              মন্তব্য দেওয়া হয়েছে
                            </Badge>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 py-4 bg-gray-50 space-y-4">
                      {/* Submission time */}
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        জমা দেওয়ার সময়:{" "}
                        {new Date(quiz.submittedAt).toLocaleString("bn-BD")}
                      </p>

                      {/* Score - read-only, this is the final mark */}
                      <div className="bg-white border border-sky-200 rounded-lg p-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          চূড়ান্ত ফলাফল
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center mb-3">
                          <div>
                            <p className="text-xs text-gray-600">মোট প্রশ্ন</p>
                            <p className="text-xl font-bold text-black">
                              {quiz.totalQuestions}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">সঠিক উত্তর</p>
                            <p className="text-xl font-bold text-emerald-600">
                              {quiz.score}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">শতাংশ</p>
                            <p className="text-xl font-bold text-sky-600">
                              {percentage}%
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Existing comment display */}
                      {hasComment && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
                          <h5 className="text-sm font-semibold flex items-center gap-1 text-amber-800">
                            <MessageSquare className="w-4 h-4" /> পূর্বের
                            মন্তব্য
                          </h5>
                          <p className="text-sm text-amber-800 bg-white border border-amber-200 rounded p-3">
                            {quiz.adminComments}
                          </p>
                        </div>
                      )}

                      {/* Comment input */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-black flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-teal-600" />
                          {hasComment
                            ? "মন্তব্য আপডেট করুন"
                            : "মন্তব্য যোগ করুন"}
                        </h4>
                        <Textarea
                          placeholder="শিক্ষার্থীর জন্য মূল্যবান প্রতিক্রিয়া লিখুন..."
                          value={
                            comments[quiz.quizWeekId] ??
                            (hasComment ? (quiz.adminComments ?? "") : "")
                          }
                          onChange={(e) =>
                            setComments((prev) => ({
                              ...prev,
                              [quiz.quizWeekId]: e.target.value,
                            }))
                          }
                          className="bg-white border border-gray-300 text-black h-24 resize-none"
                        />
                        <Button
                          onClick={() => handleSendComment(quiz.quizWeekId)}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          মন্তব্য পাঠান
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
