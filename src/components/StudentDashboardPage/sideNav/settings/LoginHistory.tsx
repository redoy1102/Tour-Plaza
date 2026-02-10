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
        <h1 className="text-2xl font-bold tracking-tight text-black">
          ডিভাইস লগইন হিস্ট্রি
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  ডিভাইস
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  যখন যুক্ত করেছেন
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">
                  অপশন
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {historyData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-lg text-gray-600">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <span className="text-gray-900 font-medium">
                        {item.device}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
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
          <div className="p-12 text-center text-gray-500">
            কোন লগইন হিস্ট্রি পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginHistory;
