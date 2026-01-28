import { Target } from "lucide-react";

const MissionAbout = () => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2 inline-block">
              Our Mission
            </span>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              আমাদের লক্ষ্য
            </h2>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed text-lg italic">
          "আমাদের লক্ষ্য হলো বাংলাদেশের তরুণদের দক্ষ এবং আত্মবিশ্বাসী প্রফেশনাল
          হিসেবে গড়ে তোলা। আমরা বিশ্বাস করি যে, প্রযুক্তি এবং দক্ষতার মাধ্যমে
          দেশের অর্থনীতি এবং সমাজকে এগিয়ে নেওয়া সম্ভব।"
        </p>
      </div>
    </div>
  );
};

export default MissionAbout;
