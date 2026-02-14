import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { performanceData } from "@/data/student/dashboardData";
import { Minimize, Expand } from "lucide-react";
import { useState } from "react";
const Charts = () => {
  const [weeklyProgressData, setWeeklyProgressData] = useState(
    performanceData.slice(0, 5)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Performance Graph */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        {/* Graph Header  */}
        <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
          {/* Title and description  */}
          <div className="text-center md:text-start">
            <h3 className="text-lg font-bold text-gray-900">
              পারফরম্যান্স গ্রাফ
            </h3>
            <p className="text-sm text-gray-500 my-3">
              আপনার কুইজ এবং অ্যাসাইনমেন্টের তুলনা
            </p>
          </div>

          {/* Quiz and Assignment color indicators */}
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
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorQuiz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorAssignment"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
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
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          সাপ্তাহিক প্রগ্রেস
        </h3>
        <div className="space-y-6">
          {weeklyProgressData.map((d) => (
            <div key={d.week} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{d.week}</span>
                <span className="text-gray-500">{d.videoProgress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${d.videoProgress}%` }}
                />
              </div>
            </div>
          ))}

          {weeklyProgressData.length === performanceData.length ? (
            <button
              className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 mt-4 cursor-pointer"
              onClick={() => setWeeklyProgressData(performanceData.slice(0, 5))}
            >
              ছোট করুন <Minimize className="w-4 h-4" />
            </button>
          ) : (
            <button
              className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 mt-4 cursor-pointer"
              onClick={() => setWeeklyProgressData(performanceData)}
            >
              সব দেখুন <Expand className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
