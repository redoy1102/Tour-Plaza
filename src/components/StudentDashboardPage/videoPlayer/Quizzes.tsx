import { useState } from "react";
import type { Quiz } from "./VideoClass";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, RotateCcw, ArrowLeft } from "lucide-react";

const Quizzes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizzes: Quiz[] | null = location.state?.quizzes || null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">
          No quizzes available for this lesson.
        </h1>
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#007cc2] hover:bg-[#006bb0]"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const currentQuiz = quizzes[currentIndex];

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentIndex < quizzes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === quizzes[index].answer ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-[#020817] text-white p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-[#0a0f1c] border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
          <p className="text-slate-400 mb-8">
            You have successfully finished the quiz.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <p className="text-sm text-slate-500 mb-1">Total Questions</p>
              <p className="text-2xl font-bold">{quizzes.length}</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <p className="text-sm text-slate-500 mb-1">Correct Answers</p>
              <p className="text-2xl font-bold text-emerald-500">{score}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button
              onClick={resetQuiz}
              variant="outline"
              className="border-slate-700 bg-transparent text-white hover:bg-slate-800 gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </Button> */}
            <Button
              onClick={() => navigate(-1)}
              className="bg-[#007cc2] hover:bg-[#006bb0] text-white gap-2 cursor-pointer"
            >
              Back to Lesson
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-sm font-medium text-slate-500">
            Question <span className="text-white">{currentIndex + 1}</span> of{" "}
            {quizzes.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full mb-12 overflow-hidden">
          <div
            className="h-full bg-[#007cc2] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-[#0a0f1c] border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-xl md:text-2xl font-bold mb-8 leading-tight">
            {currentQuiz.question}
          </h2>

          <div className="space-y-4 mb-10">
            {currentQuiz.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  selectedOption === option
                    ? "bg-[#007cc2]/10 border-[#007cc2] ring-1 ring-[#007cc2]"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                }`}
              >
                <span
                  className={`font-medium ${
                    selectedOption === option ? "text-white" : "text-slate-300"
                  }`}
                >
                  {option}
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedOption === option
                      ? "border-[#007cc2] bg-[#007cc2]"
                      : "border-slate-700 group-hover:border-slate-500"
                  }`}
                >
                  {selectedOption === option && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`h-12 px-8 rounded-xl font-bold transition-all gap-2 cursor-pointer ${
                selectedOption === null
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-[#007cc2] hover:bg-[#006bb0] text-white active:scale-95 shadow-lg shadow-sky-500/20"
              }`}
            >
              {currentIndex === quizzes.length - 1
                ? "Submit Quiz"
                : "Next Question"}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
