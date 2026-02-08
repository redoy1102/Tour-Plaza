import { BookOpen, ArrowLeft, GraduationCap, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NoClassRecordsProps {
  backToMyCourses?: () => void;
}

const NoClassRecords = ({ backToMyCourses }: NoClassRecordsProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-6 text-center">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-sky-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-md w-full">
        {/* Animated Icon Container */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full scale-75 animate-pulse" />
          <div className="relative bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl">
            <BookOpen className="w-16 h-16 text-sky-500 animate-bounce-slow" />
            <div className="absolute -top-2 -right-2">
              <span className="flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500 items-center justify-center">
                  <GraduationCap className="w-3 h-3 text-white" />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
          কোন ক্লাস খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          আপনার ড্যাশবোর্ড থেকে অন্য একটি কোর্স সিলেক্ট করুন অথবা পুনরায় চেষ্টা
          করুন। আমরা আপনার শেখার যাত্রায় আপনার সাথেই আছি!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={backToMyCourses || (() => navigate(-1))}
            variant="outline"
            className="border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-white h-12 px-8 rounded-xl gap-2 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            পিছনে যান
          </Button>

          <Button
            onClick={() => navigate("/student")}
            className="bg-[#007cc2] hover:bg-[#006bb0] text-white h-12 px-8 rounded-xl gap-2 shadow-lg shadow-sky-500/20 transition-all active:scale-95"
          >
            <LayoutGrid className="w-4 h-4" />
            ড্যাশবোর্ডে ফিরুন
          </Button>
        </div>

        {/* Support Link */}
        <p className="mt-12 text-sm text-slate-500">
          কোন সমস্যা হলে আমাদের{" "}
          <a href="#" className="text-sky-500 hover:underline">
            সাপোর্ট সেন্টারে
          </a>{" "}
          যোগাযোগ করুন।
        </p>
      </div>
    </div>
  );
};

export default NoClassRecords;
