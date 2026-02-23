import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeRangePickerProps {
  value?: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

// generate list of 12‑hour times at 30‑minute increments
const TIMELIST = Array.from({ length: 48 }, (_, i) => {
  const h24 = Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  const period = h24 >= 12 ? "PM" : "AM";
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${m} ${period}`;
});

function TimeRangePicker({
  value = "",
  onChange,
  disabled,
}: TimeRangePickerProps) {
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");

  React.useEffect(() => {
    if (value) {
      const parts = value.split("-").map((p) => p.trim());
      setStart(parts[0] || "");
      setEnd(parts[1] || "");
    }
  }, [value]);

  React.useEffect(() => {
    if (start || end) {
      onChange(`${start}${start && end ? " - " : ""}${end}`);
    } else {
      onChange("");
    }
  }, [start, end]);

  const renderPicker = (
    label: string,
    current: string,
    setter: (v: string) => void
  ) => (
    <div className="flex flex-col">
      {/* <span className="text-xs text-neutral-500 mb-1">{label}</span> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "justify-between w-28 text-left",
              !current && "text-neutral-400"
            )}
          >
            {current || "Select"}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 max-h-52 p-0 overflow-auto">
          <div className="overflow-y-auto">
            {TIMELIST.map((t) => (
              <button
                key={t}
                type="button"
                className={cn(
                  "w-full px-2 py-1 text-left text-sm hover:bg-neutral-100",
                  t === current && "bg-neutral-200"
                )}
                onClick={() => {
                  setter(t);
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      {renderPicker("From", start, setStart)}
      <span className="select-none">-</span>
      {renderPicker("To", end, setEnd)}
    </div>
  );
}

export { TimeRangePicker };
