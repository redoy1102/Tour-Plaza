import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TagsInput: React.FC<TagsInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const addTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean) return;
    if (value.includes(clean)) return;
    onChange([...value, clean]);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      // support adding multiple tags separated by commas
      inputValue
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach(addTag);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && value.length) {
      e.preventDefault();
      onChange(value.slice(0, -1));
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      addTag(inputValue);
      setInputValue("");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 border rounded-md px-2 py-1 overflow-auto",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center bg-neutral-100 rounded-full px-2 py-0.5 text-sm whitespace-nowrap max-w-xs "
        >
          <span className="truncate flex-1 min-w-0">{tag}</span>
          {!disabled && (
            <div className="bg-red-500 hover:bg-red-600 rounded-full p-0.5 ml-1 flex-shrink-0">
              <X
                className="h-3 w-3 cursor-pointer text-white"
                onClick={() => removeTag(tag)}
              />
            </div>
          )}
        </span>
      ))}
      <Input
        disabled={disabled}
        placeholder={placeholder}
        className="flex-1 min-w-25 border-none p-1 focus:ring-0 ml-1"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  );
};

export { TagsInput };
