import { Button } from "../ui/button";
import { X, Command } from "lucide-react"; // Command আইকনটি ব্যবহার করা হয়েছে

interface LayoutSidebarHeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
  label: string;
}

const LayoutSidebarHeader = ({
  setIsSidebarOpen,
  label,
}: LayoutSidebarHeaderProps) => {
  return (
    <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-white">
      {/* আইকন এবং লেবেল সেকশন */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-red-500 to-red-600 shadow-sm shadow-red-200">
          <Command className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-bold tracking-tight text-gray-900 leading-none">
            {label}
          </h2>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
            Admin Panel
          </span>
        </div>
      </div>

      {/* মোবাইল ক্লোজ বাটন */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden hover:bg-gray-100 rounded-lg h-8 w-8"
        onClick={() => setIsSidebarOpen(false)}
      >
        <X className="w-5 h-5 text-gray-500" />
      </Button>
    </div>
  );
};

export default LayoutSidebarHeader;
