import { useState, useEffect, useCallback } from "react";
import type { Quiz } from "@/types/classRecords";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  ArrowLeft,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import {
  submitQuiz,
  autoCompleteEnrollment,
} from "@/Redux/slices/enrollmentSlice";
import { findCourseBySlug } from "@/lib/utils";
import toast from "react-hot-toast";

const Quizzes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseName } = useParams<{ courseName: string }>();

  const quizzes: Quiz[] | null = location.state?.quizzes || null;
  const weekKey: string = location.state?.weekKey ?? "";

  // Get student & enrollment info
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

  // Check if quiz already submitted for this week
  const existingSubmission = enrollment?.quizMarks?.find(
    (m) => m.quizWeekId === weekKey,
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [showResults, setShowResults] = useState(false);

  // Helper to check if answer is correct
  const isAnswerCorrect = useCallback(
    (userAnswers: string[], correctAnswer: string | string[]): boolean => {
      const correct: string[] = Array.isArray(correctAnswer)
        ? correctAnswer
        : [correctAnswer];
      const correctItems: string[] = [];
      correct.forEach((ans) => {
        const tagMatches = ans.match(/<[^>]+>/g);
        if (tagMatches) {
          correctItems.push(...tagMatches);
        } else {
          correctItems.push(ans);
        }
      });
      return (
        userAnswers.length === correctItems.length &&
        userAnswers.every((ans) => correctItems.includes(ans))
      );
    },
    [],
  );

  // Calculate score - wrapped in useCallback
  const calculateScore = useCallback(() => {
    if (!quizzes || quizzes.length === 0) return 0;
    return answers.reduce((score, answer, index) => {
      return isAnswerCorrect(answer, quizzes[index].answer) ? score + 1 : score;
    }, 0);
  }, [answers, quizzes, isAnswerCorrect]);

  // Handle results submission - before any early returns
  useEffect(() => {
    if (
      showResults &&
      !existingSubmission &&
      enrollment &&
      quizzes &&
      quizzes.length > 0
    ) {
      const score = calculateScore();
      dispatch(
        submitQuiz({
          enrollmentId: enrollment.id,
          quizWeekId: weekKey,
          score,
          totalQuestions: quizzes.length,
        }),
      ); // Auto-complete enrollment if all quizzes & assignments submitted
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
      toast.success("কুইজ সফলভাবে জমা দেওয়া হয়েছে!");
    }
  }, [
    showResults,
    existingSubmission,
    enrollment,
    weekKey,
    quizzes,
    dispatch,
    calculateScore,
  ]);

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">কোন কুইজ পাওয়া যায়নি!</h1>
        <Button
          onClick={() => navigate(-1)}
          className="bg-primary hover:bg-red-500 text-white"
        >
          ফিরে যান
        </Button>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];

  const handleNext = () => {
    if (selectedOption.length > 0) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);
      setSelectedOption([]);

      if (currentIndex < quizzes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizzes.length) * 100);

    return (
      <div className="min-h-screen bg-white text-black p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>ফিরে যান</span>
          </button>

          <div className="bg-white border border-gray-300 rounded-2xl p-6 md:p-10 shadow-2xl space-y-8">
            {/* Results Summary */}
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-2 text-black">
                কুইজ সম্পন্ন!
              </h1>
              <p className="text-gray-600">আপনি সফলভাবে কুইজ শেষ করেছেন।</p>
            </div>

            {/* Score Display */}
            <div className="bg-linear-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">মোট প্রশ্ন</p>
                  <p className="text-3xl font-bold text-black">
                    {quizzes.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">সঠিক উত্তর</p>
                  <p className="text-3xl font-bold text-emerald-600">{score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">শতাংশ</p>
                  <p className="text-3xl font-bold text-sky-600">
                    {percentage}%
                  </p>
                </div>
              </div>
              {/* Score bar */}
              <div className="mt-6 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Admin Comment */}
            {existingSubmission?.adminComments ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-amber-900">শিক্ষকের মন্তব্য</h3>
                </div>
                <p className="text-sm text-amber-800 bg-white border border-amber-200 rounded p-3">
                  {existingSubmission.adminComments}
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                <AlertCircle className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <h3 className="font-bold text-blue-900 mb-1">
                  মন্তব্য অপেক্ষামান
                </h3>
                <p className="text-sm text-blue-800">
                  শিক্ষক শীঘ্রই আপনার কুইজের বিষয়ে মন্তব্য করবেন।
                </p>
              </div>
            )}

            {/* Detailed Results */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black border-b border-gray-300 pb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> বিস্তারিত ফলাফল
              </h3>
              {quizzes.map((quiz, index) => {
                const isCorrect = isAnswerCorrect(answers[index], quiz.answer);
                return (
                  <div
                    key={index}
                    className={`p-5 rounded-xl border ${
                      isCorrect
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p className="font-semibold mb-4 text-lg text-black">
                      {index + 1}. {quiz.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-medium">
                          আপনার উত্তর
                        </span>
                        <div
                          className={`p-3 rounded-lg text-sm flex items-center justify-between ${
                            isCorrect
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                              : "bg-red-100 text-red-700 border border-red-300"
                          }`}
                        >
                          {answers[index].join(", ")}
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <RotateCcw className="w-4 h-4 rotate-45" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-medium">
                          সঠিক উত্তর
                        </span>
                        <div className="p-3 rounded-lg text-sm bg-gray-100 text-gray-700 border border-gray-300">
                          {(Array.isArray(quiz.answer)
                            ? quiz.answer
                            : [quiz.answer]
                          ).join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center pt-6 border-t border-gray-200">
              <Button
                onClick={() => navigate(-1)}
                className="bg-[#007cc2] hover:bg-[#006bb0] text-white gap-2 cursor-pointer h-12 px-8 rounded-xl font-bold"
              >
                পাঠে ফিরুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Already submitted - show results view
  if (existingSubmission) {
    const score = existingSubmission.score;
    const percentage = Math.round(
      (score / existingSubmission.totalQuestions) * 100,
    );

    return (
      <div className="min-h-screen bg-white text-black p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>ফিরে যান</span>
          </button>

          <div className="bg-white border border-gray-300 rounded-2xl p-6 md:p-10 shadow-2xl space-y-8">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-2 text-black">
                কুইজ সম্পন্ন
              </h1>
              <p className="text-gray-600">
                আপনার ফলাফল নিচে প্রদর্শিত হয়েছে।
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-linear-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">মোট প্রশ্ন</p>
                  <p className="text-3xl font-bold text-black">
                    {existingSubmission.totalQuestions}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">সঠিক উত্তর</p>
                  <p className="text-3xl font-bold text-emerald-600">{score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">শতাংশ</p>
                  <p className="text-3xl font-bold text-sky-600">
                    {percentage}%
                  </p>
                </div>
              </div>
              <div className="mt-6 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Admin Comment */}
            {existingSubmission.adminComments ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-amber-900">শিক্ষকের মন্তব্য</h3>
                </div>
                <p className="text-sm text-amber-800 bg-white border border-amber-200 rounded p-3">
                  {existingSubmission.adminComments}
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                <AlertCircle className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <h3 className="font-bold text-blue-900 mb-1">
                  মন্তব্য অপেক্ষামান
                </h3>
                <p className="text-sm text-blue-800">
                  শিক্ষক শীঘ্রই আপনার কুইজের বিষয়ে মন্তব্য করবেন।
                </p>
              </div>
            )}

            <div className="flex justify-center pt-6 border-t border-gray-200">
              <Button
                onClick={() => navigate(-1)}
                className="bg-[#007cc2] hover:bg-[#006bb0] text-white gap-2 cursor-pointer h-12 px-8 rounded-xl font-bold"
              >
                পাঠে ফিরুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz taking UI
  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>ফিরে যান</span>
          </button>
          <div className="text-sm font-medium text-gray-600">
            প্রশ্ন <span className="text-black">{currentIndex + 1}</span> এর{" "}
            {quizzes.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded-full mb-12 overflow-hidden">
          <div
            className="h-full bg-[#007cc2] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-xl md:text-2xl font-bold mb-8 leading-tight text-black">
            {currentQuiz.question}
          </h2>

          <div className="space-y-4 mb-10">
            {currentQuiz.options.map((option: string, idx: number) => (
              <label
                key={idx}
                className="flex items-center space-x-3 p-5 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedOption.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOption([...selectedOption, option]);
                    } else {
                      setSelectedOption(
                        selectedOption.filter((o) => o !== option),
                      );
                    }
                  }}
                  className="w-5 h-5 text-[#007cc2] bg-gray-200 border-gray-300 rounded focus:ring-[#007cc2] focus:ring-2"
                />
                <span className="font-medium text-gray-700 group-hover:text-black">
                  {option}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={selectedOption.length === 0}
              className={`h-12 px-8 rounded-xl font-bold transition-all gap-2 cursor-pointer ${
                selectedOption.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#007cc2] hover:bg-[#006bb0] text-white active:scale-95 shadow-lg shadow-sky-500/20"
              }`}
            >
              {currentIndex === quizzes.length - 1
                ? "কুইজ জমা দিন"
                : "পরবর্তী প্রশ্ন"}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
