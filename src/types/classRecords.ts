export interface Lesson {
  classNo: number;
  title: string;
  videoUrl?: string;
  ytVideo?: string;
  duration: string;
  completed: boolean;
  resources?: string; // free‑text links, notes, etc
}

export interface Quiz {
  question: string;
  options: string[];
  answer: string[];
}

export interface Assignment {
  title: string;
  description: string;
  instructions: string[];
  dueDate: string;
  maxMarks: number;
}

// generic structure used throughout the video/quiz/assignment components
export type ClassRecords = Record<
  string,
  (Lesson | { quizzes: Quiz[] } | { assignment: Assignment })[]
>;
