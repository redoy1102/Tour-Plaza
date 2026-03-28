import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import LandingPageButton from "@/components/shared/LandingPageButton";

interface HeaderProps {
  selectedWeek: string;
  setSelectedWeek: (value: string) => void;
  performanceData: { week: string }[];
}

const Header = ({
  selectedWeek,
  setSelectedWeek,
  performanceData,
}: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <LandingPageButton />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="text-gray-500 text-sm">
            আপনার সাপ্তাহিক অগ্রগতি এবং পরীক্ষার ফলাফল এখানে দেখুন
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">ফিল্টার:</span>
        </div>
        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="w-45 bg-white">
            <SelectValue placeholder="সপ্তাহ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব সপ্তাহ</SelectItem>
            {performanceData.map((performance) => (
              <SelectItem key={performance.week} value={performance.week}>
                {performance.week}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
