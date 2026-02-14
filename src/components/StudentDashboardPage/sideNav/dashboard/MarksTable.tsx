// import {
//   ChevronRight,
// } from "lucide-react";

interface MarksTableProps {
  filteredData: {
    week: string;
    quiz: number;
    assignment: number;
    videoProgress: number;
  }[];
}

const MarksTable = ({ filteredData }: MarksTableProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">বিস্তারিত ফলাফল</h3>
        {/* <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          রিপোর্ট ডাউনলোড করুন
        </button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                সপ্তাহ
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                কুইজ মার্কস
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                অ্যাসাইনমেন্ট
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                স্ট্যাটাস
              </th>
              {/* <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                অ্যাকশন
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.map((row, idx: number) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-gray-900">
                    {row.week}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {row.quiz}
                    </span>
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${row.quiz}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {row.assignment}
                    </span>
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${row.assignment}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Passed
                  </span>
                </td>
                {/* <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarksTable;
