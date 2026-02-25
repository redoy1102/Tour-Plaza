import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: MultiSelectProps) => {
  const toggle = (id: string) => {
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else onChange([...value, id]);
  };

  const selectedNames = options
    .filter((o) => value.includes(o.id))
    .map((o) => o.name);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between w-full text-left text-gray-500 font-normal">
          <span
            className={cn(
              "line-clamp-1",
              selectedNames.length ? "" : "text-muted-foreground"
            )}
          >
            {selectedNames.length
              ? selectedNames.join(", ")
              : placeholder || "Select..."}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="flex flex-col space-y-2 max-h-56 overflow-auto">
          {options.map((opt) => {
            const checked = value.includes(opt.id);
            return (
              <label
                key={opt.id}
                className="flex items-center justify-between cursor-pointer rounded-md px-2 py-2 hover:bg-neutral-50"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(opt.id)}
                    className="h-4 w-4 rounded border-neutral-200"
                  />
                  <span className="text-sm">{opt.name}</span>
                </div>
                {checked && <Check className="w-4 h-4 text-neutral-700" />}
              </label>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
