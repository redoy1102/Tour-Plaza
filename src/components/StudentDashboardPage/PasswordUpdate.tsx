import { Lock, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const PasswordUpdate = () => {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-8 tracking-tight">
        পাসওয়ার্ড পরিবর্তন করুন
      </h1>

      <div className="p-8 bg-[#0a0f1c] rounded-2xl border border-slate-800/50 shadow-xl space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-500">বর্তমান পাসওয়ার্ড</label>
            <div className="relative">
              <input
                type="password"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                placeholder="••••••••"
              />
              <EyeOff className="absolute right-4 top-3.5 w-5 h-5 text-slate-600 cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-500">নতুন পাসওয়ার্ড</label>
            <div className="relative">
              <input
                type="password"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                placeholder="••••••••"
              />
              <EyeOff className="absolute right-4 top-3.5 w-5 h-5 text-slate-600 cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-500">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-sky-500/50 transition-colors"
                placeholder="••••••••"
              />
              <EyeOff className="absolute right-4 top-3.5 w-5 h-5 text-slate-600 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Button className="bg-sky-600 hover:bg-sky-500 text-white px-8 h-12 rounded-xl">
            পাসওয়ার্ড আপডেট করুন
          </Button>
          <p className="text-xs text-slate-500 flex items-center gap-2 italic">
            <Lock className="w-3 h-3" /> সিকিউরড কানেকশন
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
