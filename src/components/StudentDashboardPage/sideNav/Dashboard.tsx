import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  FileText,
  Trophy,
  Target,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Data for Performance
const performanceData = [
  { week: "সপ্তাহ ১", quiz: 85, assignment: 90, progress: 100 },
  { week: "সপ্তাহ ২", quiz: 75, assignment: 85, progress: 95 },
  { week: "সপ্তাহ ৩", quiz: 95, assignment: 80, progress: 90 },
  { week: "সপ্তাহ ৪", quiz: 80, assignment: 100, progress: 85 },
  { week: "সপ্তাহ ৫", quiz: 88, assignment: 88, progress: 80 },
  { week: "সপ্তাহ ৬", quiz: 92, assignment: 90, progress: 75 },
  { week: "সপ্তাহ ৭", quiz: 70, assignment: 82, progress: 70 },
  { week: "সপ্তাহ ৮", quiz: 85, assignment: 94, progress: 65 },
];

const Dashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState("all");

  const filteredData =
    selectedWeek === "all"
      ? performanceData
      : performanceData.filter((d) => d.week === selectedWeek);

  const currentStats =
    selectedWeek === "all"
      ? {
          quiz: Math.round(
            performanceData.reduce((acc, curr) => acc + curr.quiz, 0) /
              performanceData.length
          ),
          assignment: Math.round(
            performanceData.reduce((acc, curr) => acc + curr.assignment, 0) /
              performanceData.length
          ),
          progress: 85,
          totalMarks: 740,
        }
      : {
          quiz: filteredData[0].quiz,
          assignment: filteredData[0].assignment,
          progress: filteredData[0].progress,
          totalMarks: filteredData[0].quiz + filteredData[0].assignment,
        };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="text-gray-500 text-sm">
            আপনার সাপ্তাহিক অগ্রগতি এবং পরীক্ষার ফলাফল এখানে দেখুন
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">ফিল্টার:</span>
          </div>
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="সপ্তাহ নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব সপ্তাহ</SelectItem>
              {performanceData.map((d) => (
                <SelectItem key={d.week} value={d.week}>
                  {d.week}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Marks */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
            {currentStats.totalMarks > 700 ? (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> +৫%
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                <TrendingDown className="w-3 h-3" /> -২%
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 font-medium">মোট প্রাপ্ত নম্বর</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {currentStats.totalMarks}{" "}
            <span className="text-sm font-normal text-gray-400">/ ৮০০</span>
          </h3>
        </div>

        {/* Quiz Marks */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              গড় নম্বর
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">কুইজ মার্কস</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {currentStats.quiz}%
          </h3>
        </div>

        {/* Assignment Marks */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              গড় নম্বর
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">অ্যাসাইনমেন্ট মার্কস</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {currentStats.assignment}%
          </h3>
        </div>

        {/* Progress */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Target className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              সম্পন্ন
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">কোর্স প্রগ্রেস</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {currentStats.progress}%
          </h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Graph */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">পারফরম্যান্স গ্রাফ</h3>
              <p className="text-sm text-gray-500">আপনার কুইজ এবং অ্যাসাইনমেন্টের তুলনা</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>কুইজ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span>অ্যাসাইনমেন্ট</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorQuiz" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAssignment" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9ca3af', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="quiz" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorQuiz)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="assignment" 
                  stroke="#a855f7" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAssignment)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Progress Bar Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">সাপ্তাহিক প্রগ্রেস</h3>
          <div className="space-y-6">
            {performanceData.slice(0, 5).map((d) => (
              <div key={d.week} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{d.week}</span>
                  <span className="text-gray-500">{d.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${d.progress}%` }}
                  />
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 mt-4">
              সব দেখুন <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Marks Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">বিস্তারিত ফলাফল</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">রিপোর্ট ডাউনলোড করুন</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">সপ্তাহ</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">কুইজ মার্কস</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">অ্যাসাইনমেন্ট</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">{row.week}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-medium text-gray-700">{row.quiz}</span>
                       <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                         <div className="h-full bg-blue-500" style={{width: `${row.quiz}%`}} />
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-medium text-gray-700">{row.assignment}</span>
                       <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                         <div className="h-full bg-purple-500" style={{width: `${row.assignment}%`}} />
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
                      Passed
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
