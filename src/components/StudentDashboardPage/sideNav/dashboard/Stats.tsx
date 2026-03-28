import {
  // TrendingUp,
  // TrendingDown,
  BookOpen,
  FileText,
  Trophy,
  Video
} from "lucide-react";

interface StatsProps {
  currentStats: {
    quiz: number;
    assignment: number;
    videoProgress: number;
    totalObtainedMarks: number;
    totalMarks: number;
  };
}

const Stats = ({ currentStats }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Marks */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-amber-50 rounded-lg">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
          {/* {currentStats.totalObtainedMarks > 700 ? (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" /> +৫%
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
              <TrendingDown className="w-3 h-3" /> -২%
            </span>
          )} */}
        </div>
        <p className="text-sm text-gray-500 font-medium">মোট প্রাপ্ত নম্বর</p>
        <h3 className="text-2xl font-bold text-gray-900">
          {currentStats.totalObtainedMarks}{" "}
          {/* <span className="text-sm font-normal text-gray-400">/ {currentStats.totalMarks}</span> */}
        </h3>
      </div>

      {/* Quiz Marks */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-500" />
          </div>
          
        </div>
        <p className="text-sm text-gray-500 font-medium">কুইজ মার্কস</p>
        <h3 className="text-2xl font-bold text-gray-900">
          {currentStats.quiz}
        </h3>
      </div>

      {/* Assignment Marks */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <FileText className="w-6 h-6 text-purple-500" />
          </div>
          
        </div>
        <p className="text-sm text-gray-500 font-medium">
          অ্যাসাইনমেন্ট মার্কস
        </p>
        <h3 className="text-2xl font-bold text-gray-900">
          {currentStats.assignment}
        </h3>
      </div>

      {/* Progress */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Video className="w-6 h-6 text-emerald-500" />
          </div>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            সম্পন্ন
          </span>
        </div>
        <p className="text-sm text-gray-500 font-medium">কোর্স প্রগ্রেস</p>
        <h3 className="text-2xl font-bold text-gray-900">
          {currentStats.videoProgress}%
        </h3>
      </div>
    </div>
  );
};

export default Stats;
