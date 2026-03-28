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
  value: T[],
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

export const getYouTubeEmbedUrl = (url: string | undefined) => {
  if (!url) return "";
  // support multiple YouTube URL formats (youtu.be, watch?v=, embed)
  const reg =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(reg);
  const id = match ? match[1] : url.split("/").pop()?.split("?")[0] || "";
  return id ? `https://www.youtube.com/embed/${id}` : "";
};

// Convert course title to URL-friendly slug
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove multiple hyphens
};

// Decode slug back to find course by title match
export const findCourseBySlug = (
  slug: string,
  courses: Array<{ id: string; title: string }>,
) => {
  const decodedSlug = decodeURIComponent(slug);
  return courses.find(
    (course) => createSlug(course.title) === createSlug(decodedSlug),
  );
};
