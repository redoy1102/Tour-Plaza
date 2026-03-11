import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateShort(date?: Date | string | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export const handlePreventEmptyField = <T extends Record<string, string>>(
  value: T[]
) => {
  const final: boolean[] = [];
  value.map((item) => {
    const itemArray = Object.entries(item);

    itemArray.map((element) => {
      if (element[1] == "") {
        final.push(false);
      } else {
        final.push(true);
      }
    });
  });

  if (final.includes(false)) {
    return false;
  } else {
    return true;
  }
};
