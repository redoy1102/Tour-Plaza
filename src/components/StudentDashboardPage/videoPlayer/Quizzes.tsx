import { useState } from "react";
import type { Quiz } from "./VideoClass";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, RotateCcw, ArrowLeft } from "lucide-react";

const Quizzes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizzes: Quiz[] | null = location.state?.quizzes || null;

  const isAnswerCorrect = (
    userAnswers: string[],
    correctAnswer: string | string[]
  ) => {
    // Ensure correctAnswer is always an array
    const correct: string[] = Array.isArray(correctAnswer)
      ? correctAnswer
      : [correctAnswer];

    // Extract all HTML tags or individual items from the correct answers
    const correctItems: string[] = [];
    correct.forEach((ans) => {
      // Match HTML tags like <ul>, <ol>, etc.
      const tagMatches = ans.match(/<[^>]+>/g);
      if (tagMatches) {
        correctItems.push(...tagMatches);
      } else {
        // If no tags found, use the whole answer
        correctItems.push(ans);
      }
    });

    // Check if lengths match and all user answers exist in correct items
    return (
      userAnswers.length === correctItems.length &&
      userAnswers.every((ans) => correctItems.includes(ans))
    );
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
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

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return isAnswerCorrect(answer, quizzes[index].answer) ? score + 1 : score;
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-white text-black p-4 md:p-8 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white border border-gray-300 rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="text-center mb-10">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-2 text-black">
              Quiz Completed!
            </h1>
            <p className="text-gray-600 mb-8">
              You have successfully finished the quiz.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-10">
              <div className="bg-gray-200 p-6 rounded-xl border border-gray-300">
                <p className="text-sm text-gray-600 mb-1">Total Questions</p>
                <p className="text-2xl font-bold text-black">
                  {quizzes.length}
                </p>
              </div>
              <div className="bg-gray-200 p-6 rounded-xl border border-gray-300">
                <p className="text-sm text-gray-600 mb-1">Correct Answers</p>
                <p className="text-2xl font-bold text-emerald-500">{score}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h3 className="text-xl font-bold text-black border-b border-gray-300 pb-4 flex items-center gap-2">
              Detailed Results
            </h3>
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-gray-100 p-5 rounded-xl border border-gray-300"
              >
                <p className="font-semibold mb-4 text-lg text-black">
                  {index + 1}. {quiz.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-medium">
                      Your Answer
                    </span>
                    <div
                      className={`p-3 rounded-lg text-sm flex items-center justify-between ${
                        isAnswerCorrect(answers[index], quizzes[index].answer)
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {answers[index].join(", ")}
                      {isAnswerCorrect(
                        answers[index],
                        quizzes[index].answer
                      ) ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <RotateCcw className="w-4 h-4 rotate-45" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-medium">
                      Correct Answer
                    </span>
                    <div className="p-3 rounded-lg text-sm bg-gray-200 text-gray-700 border border-gray-300">
                      {(Array.isArray(quizzes[index].answer)
                        ? quizzes[index].answer
                        : [quizzes[index].answer]
                      ).join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(-1)}
              className="bg-[#007cc2] hover:bg-[#006bb0] text-white gap-2 cursor-pointer h-12 px-8 rounded-xl font-bold transition-all"
            >
              Back to Lesson
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            <span>Back</span>
          </button>
          <div className="text-sm font-medium text-gray-600">
            Question <span className="text-black">{currentIndex + 1}</span> of{" "}
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
            {currentQuiz.options.map((option, idx) => (
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
                        selectedOption.filter((o) => o !== option)
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
