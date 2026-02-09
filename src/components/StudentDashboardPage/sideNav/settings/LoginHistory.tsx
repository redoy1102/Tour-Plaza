import { AlertCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoginHistory = () => {
  const historyData = [
    {
      id: 1,
      device: "iPhone 13 - Safari (iOS)",
      date: "৫ ফেব্রুয়ারি, ২০২৬ - ১০:৩০ AM",
    },
    {
      id: 2,
      device: "Windows 11 - Chrome",
      date: "৪ ফেব্রুয়ারি, ২০২৬ - ০৮:১৫ PM",
    },
    {
      id: 3,
      device: "MacBook Pro - Firefox",
      date: "৩ ফেব্রুয়ারি, ২০২৬ - ১১:৪৫ AM",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-sky-500/10 rounded-lg">
          <AlertCircle className="w-6 h-6 text-sky-400" />
        </div>
        <h1 className="text-2xl font-bold  tracking-tight">
          ডিভাইস লগইন হিস্ট্রি
        </h1>
      </div>

      <div className="bg-[#0a0f1c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30">
                <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                  ডিভাইস
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                  যখন যুক্ত করেছেন
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-center">
                  অপশন
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {historyData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <span className="text-slate-200 font-medium">
                        {item.device}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 transition-all gap-2"
                    >
                      রিপোর্ট করুন
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {historyData.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            কোন লগইন হিস্ট্রি পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginHistory;
