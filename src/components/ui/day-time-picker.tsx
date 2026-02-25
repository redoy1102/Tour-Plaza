import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface DayTimeEntry {
  day: string;
  startTime: string;
  endTime: string;
}

interface DayTimePickerProps {
  value: DayTimeEntry[];
  onChange: (value: DayTimeEntry[]) => void;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_OPTIONS = [
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];

const DayTimePicker = ({ value, onChange }: DayTimePickerProps) => {
  const handleAdd = () => {
    onChange([...(value || []), { day: "", startTime: "", endTime: "" }]);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleUpdate = (
    index: number,
    field: keyof DayTimeEntry,
    val: string
  ) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {/* Entries */}
      {value && value.length > 0 && (
        <div className="space-y-3">
          {value.map((entry, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-3 border border-gray-200 rounded-md bg-white"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Day selector */}
                <Select
                  value={entry.day}
                  onValueChange={(val) => handleUpdate(index, "day", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Start time */}
                <Select
                  value={entry.startTime}
                  onValueChange={(val) => handleUpdate(index, "startTime", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* End time */}
                <Select
                  value={entry.endTime}
                  onValueChange={(val) => handleUpdate(index, "endTime", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_OPTIONS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="self-end text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAdd}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Schedule
      </Button>
    </div>
  );
};

export default DayTimePicker;
