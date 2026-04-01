import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface SingleDatePickerProps {
  field: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
  };
}

const SingleDatePicker = ({ field }: SingleDatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!field.value}
            className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-53 p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(date) => {
              field.onChange(date);
              setOpen(false);
            }}
            initialFocus
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SingleDatePicker;
