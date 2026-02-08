import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  // ChevronLeft,
  // ChevronRight,
  // Maximize2,
  //   Search,
  CheckCircle2,
  PlayCircle,
  Clock,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
import NoClassRecords from "../NoClassRecords";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Lesson {
  classNo: number;
  title: string;
  videoUrl: string;
  duration: string;
  completed: boolean;
  quizzes: Quiz[];
}

interface SelectedVideo {
  title: string;
  url: string;
}

export interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

type ClassRecords = Record<string, Lesson[]>;

const VideoClass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classRecords: ClassRecords | undefined = location.state?.classRecords;
  console.log("Received class records:", classRecords);

  // Set initial selected video to the first lesson of the first week
  const firstWeekKey = Object.keys(classRecords || {})[0];

  const firstLesson = classRecords?.[firstWeekKey]?.[0];
  console.log("First lesson:", firstLesson);

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz[] | null>(
    firstLesson?.quizzes && firstLesson.quizzes.length > 0
      ? firstLesson.quizzes
      : null
  );
  console.log("Initial selected quiz:", selectedQuiz);

  const [selectedVideo, setSelectedVideo] = useState<SelectedVideo>(
    firstLesson
      ? {
          title: firstLesson.title,
          url: firstLesson.videoUrl,
        }
      : {
          title: "",
          url: "",
        }
  );

  const getWeekTitle = (weekKey: string) => {
    switch (weekKey) {
      case "week1":
        return "Week 1 - HTML & Structure";
      case "week2":
        return "Week 2 - Styling with CSS";
      case "week3":
        return "Week 3 - JavaScript Fundamentals";
      case "week4":
        return "Week 4 - DOM Manipulation";
      default:
        return weekKey;
    }
  };

  if (!classRecords) {
    return (
      <NoClassRecords backToMyCourses={() => navigate("/student/my-courses")} />
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col lg:flex-row overflow-hidden pt-10">
      {/* Main Content - Video Player */}
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full">
          <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
            <video
              key={selectedVideo.url}
              src={selectedVideo.url}
              controls
              className="w-full h-full"
              poster="/landingPage/courses/js.webp"
            />
          </div>

          {/* <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              className="bg-[#007cc2] hover:bg-[#006bb0] text-white border-none gap-2 px-8 h-12 rounded-xl transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
              আগের লেসন
            </Button>

            <Button
              variant="outline"
              className="bg-[#007cc2] hover:bg-[#006bb0] text-white border-none gap-2 px-8 h-12 rounded-xl transition-all active:scale-95"
            >
              পরের লেসন
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div> */}
        </div>
        {selectedQuiz && (
          <Button
            className="bg-[#007cc2] hover:bg-[#006bb0] text-white border-none gap-2 px-8 h-12 rounded-xl transition-all active:scale-95 cursor-pointer my-4"
            onClick={() =>
              navigate("/quiz", { state: { quizzes: selectedQuiz } })
            }
          >
            Start Quiz
          </Button>
        )}
      </div>

      {/* Sidebar - Course Content */}
      <div className="w-full lg:w-112.5 border-l border-slate-800 bg-[#0a0f1c]/90 backdrop-blur-xl flex flex-col shrink-0 overflow-hidden">
        {/* Search Header */}
        {/* <div className="p-6 border-b border-slate-800/50">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-sky-500 transition-colors" />
            <Input
              placeholder="কোর্স লেসন সার্চ করুন"
              className="pl-12 h-12 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus-visible:ring-sky-500/50 rounded-xl"
            />
          </div>
        </div> */}

        {/* Module List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Accordion
            type="single"
            collapsible
            defaultValue={firstWeekKey}
            className="w-full"
          >
            {Object.entries(classRecords).map(([weekKey, classes]) => (
              <AccordionItem
                key={weekKey}
                value={weekKey}
                className="border-slate-800/50 px-4"
              >
                <AccordionTrigger className="hover:no-underline py-5 px-2 rounded-xl hover:bg-slate-800/30 transition-all group">
                  <div className="text-left space-y-1.5">
                    <p className="font-bold text-sm tracking-tight group-hover:text-sky-400 transition-colors">
                      {getWeekTitle(weekKey)}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {classes.length}টি লেসন • ৪ ঘন্টা ২০ মিনিট
                    </p>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="p-0 pt-1 pb-4">
                  <div className="space-y-1">
                    {classes.map((lesson: Lesson) => (
                      <button
                        key={lesson.classNo}
                        onClick={() => {
                          setSelectedVideo({
                            title: lesson.title,
                            url: lesson.videoUrl,
                          });
                          setSelectedQuiz(lesson.quizzes);
                        }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left relative overflow-hidden group/item ${
                          selectedVideo.title === lesson.title
                            ? "bg-[#007cc2] text-white shadow-lg shadow-sky-500/20"
                            : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-transform duration-300 group-hover/item:scale-110 ${
                            selectedVideo.title === lesson.title
                              ? "bg-white/20"
                              : "bg-slate-900 border border-slate-800 group-hover/item:border-slate-700"
                          }`}
                        >
                          <PlayCircle
                            className={`w-5 h-5 ${
                              selectedVideo.title === lesson.title
                                ? "text-white"
                                : "text-sky-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold leading-tight mb-1">
                            {lesson.classNo}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-[11px] font-medium ${
                                selectedVideo.title === lesson.title
                                  ? "text-white/80"
                                  : "text-slate-500"
                              }`}
                            >
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                        {lesson.completed && (
                          <div
                            className={`p-1.5 rounded-lg ${
                              selectedVideo.title === lesson.title
                                ? "bg-white/20"
                                : "bg-emerald-500/10"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                selectedVideo.title === lesson.title
                                  ? "text-white"
                                  : "text-emerald-500"
                              }`}
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default VideoClass;
