import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ResetFiltersProps {
  onReset: () => void;
}

const ResetFilters = ({ onReset }: ResetFiltersProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onReset}
      className="group flex items-center gap-2 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl px-4 transition-all duration-300 cursor-pointer"
    >
      <RotateCcw
        size={16}
        className="transition-transform duration-500 group-hover:-rotate-180"
      />
      <span className="text-xs font-semibold uppercase tracking-wider">
        Reset
      </span>
    </Button>
  );
};

export default ResetFilters;
