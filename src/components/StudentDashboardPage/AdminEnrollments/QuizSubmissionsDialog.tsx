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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Award,
  Calendar,
} from "lucide-react";
import { useAppDispatch } from "@/Redux/hooks";
import { gradeQuiz } from "@/Redux/slices/enrollmentSlice";
import type { QuizMark } from "@/Redux/slices/enrollmentSlice";
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
  const [gradingData, setGradingData] = useState<{
    [key: string]: { marks: string; comments: string };
  }>({});

  const handleGrade = async (quizWeekId: string) => {
    const data = gradingData[quizWeekId];
    if (!data || !data.marks.trim()) {
      toast.error("নম্বর প্রবেশ করুন");
      return;
    }

    const marks = parseFloat(data.marks);
    if (isNaN(marks) || marks < 0) {
      toast.error("বৈধ নম্বর প্রবেশ করুন");
      return;
    }

    dispatch(
      gradeQuiz({
        enrollmentId,
        quizWeekId,
        adminMarks: marks,
        adminComments: data.comments.trim() || undefined,
      }),
    );

    setGradingData((prev) => {
      const newData = { ...prev };
      delete newData[quizWeekId];
      return newData;
    });

    toast.success("কুইজ মূল্যায়ন সম্পন্ন");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            কুইজ জমা দেওয়া হয়েছে - {studentName}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">কোর্স: {courseName}</p>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
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
                const isGraded = quiz.adminMarks !== undefined;
                const percentage = Math.round(
                  (quiz.score / quiz.totalQuestions) * 100,
                );

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
                            {quiz.score}/{quiz.totalQuestions}
                          </Badge>
                          {isGraded && (
                            <Badge className="bg-emerald-100 text-emerald-800">
                              মূল্যায়ন করা হয়েছে
                            </Badge>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 py-4 bg-gray-50 space-y-4">
                      {/* Submission Details */}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          জমা দেওয়ার সময়:{" "}
                          {new Date(quiz.submittedAt).toLocaleString("bn-BD")}
                        </p>
                      </div>

                      {/* Score Display */}
                      <div className="bg-white border border-sky-200 rounded-lg p-4">
                        <div className="grid grid-cols-3 gap-2 text-center mb-3">
                          <div>
                            <p className="text-xs text-gray-600">মোট প্রশ্ন</p>
                            <p className="text-lg font-bold text-black">
                              {quiz.totalQuestions}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">সঠিক উত্তর</p>
                            <p className="text-lg font-bold text-emerald-600">
                              {quiz.score}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">শতাংশ</p>
                            <p className="text-lg font-bold text-sky-600">
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

                      {/* Grading Section */}
                      {isGraded ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-600" />
                            <h4 className="font-semibold text-amber-900">
                              শিক্ষক মূল্যায়ন
                            </h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-amber-800">
                              প্রদত্ত নম্বর:
                            </span>
                            <Badge className="bg-amber-100 text-amber-900">
                              {quiz.adminMarks}
                            </Badge>
                          </div>
                          {quiz.adminComments && (
                            <div className="space-y-2">
                              <h5 className="text-sm font-semibold flex items-center gap-1 text-amber-800">
                                <MessageSquare className="w-4 h-4" /> মন্তব্য
                              </h5>
                              <p className="text-sm text-amber-800 bg-white border border-amber-200 rounded p-3">
                                {quiz.adminComments}
                              </p>
                            </div>
                          )}
                          <Button
                            onClick={() => {
                              setGradingData((prev) => ({
                                ...prev,
                                [quiz.quizWeekId]: {
                                  marks: String(quiz.adminMarks || ""),
                                  comments: quiz.adminComments || "",
                                },
                              }));
                            }}
                            variant="outline"
                            size="sm"
                            className="text-amber-700 border-amber-300 hover:bg-amber-50 cursor-pointer mt-2"
                          >
                            পুনরায় মূল্যায়ন করুন
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                          <h4 className="font-semibold text-black">
                            মূল্যায়ন করুন
                          </h4>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              নম্বর
                            </label>
                            <Input
                              type="number"
                              placeholder="উদাহরণ: 18"
                              min="0"
                              step="0.5"
                              value={gradingData[quiz.quizWeekId]?.marks || ""}
                              onChange={(e) => {
                                setGradingData((prev) => ({
                                  ...prev,
                                  [quiz.quizWeekId]: {
                                    ...prev[quiz.quizWeekId],
                                    marks: e.target.value,
                                  },
                                }));
                              }}
                              className="bg-white border border-gray-300 text-black"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              মন্তব্য (ঐচ্ছিক)
                            </label>
                            <Textarea
                              placeholder="শিক্ষার্থীর জন্য মূল্যবান প্রতিক্রিয়া..."
                              value={
                                gradingData[quiz.quizWeekId]?.comments || ""
                              }
                              onChange={(e) => {
                                setGradingData((prev) => ({
                                  ...prev,
                                  [quiz.quizWeekId]: {
                                    ...prev[quiz.quizWeekId],
                                    comments: e.target.value,
                                  },
                                }));
                              }}
                              className="bg-white border border-gray-300 text-black h-24 resize-none"
                            />
                          </div>

                          <Button
                            onClick={() => handleGrade(quiz.quizWeekId)}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            মূল্যায়ন সম্পন্ন করুন
                          </Button>
                        </div>
                      )}
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
