import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

export type EnrollmentStatus = "active" | "completed" | "cancelled";

export interface AssignmentMark {
  id: string;
  assignmentWeekId: string; // e.g. "week1", "week2"
  submissionLink: string;
  submittedAt: string; // ISO date string
  marks?: number;
  comments?: string;
}

export interface QuizMark {
  id: string;
  quizWeekId: string; // e.g. "week1", "week2"
  submittedAt: string; // ISO date string
  score: number; // student's score
  totalQuestions: number; // total questions in quiz
  adminComments?: string; // feedback from admin
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string; // ISO date string
  status: EnrollmentStatus;
  amount: number;
  assignmentMarks?: AssignmentMark[];
  quizMarks?: QuizMark[];
}

interface EnrollmentState {
  items: Enrollment[];
}

const initialState: EnrollmentState = {
  items: [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment(
      state,
      action: PayloadAction<Omit<Enrollment, "id" | "enrolledAt">>,
    ) {
      state.items.push({
        id: nanoid(),
        enrolledAt: new Date().toISOString(),
        ...action.payload,
      });
    },

    updateEnrollment(
      state,
      action: PayloadAction<{
        id: string;
        studentId?: string;
        status?: EnrollmentStatus;
      }>,
    ) {
      const index = state.items.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },

    removeEnrollment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },

    submitAssignment(
      state,
      action: PayloadAction<{
        enrollmentId: string;
        assignmentWeekId: string;
        submissionLink: string;
      }>,
    ) {
      const enrollment = state.items.find(
        (e) => e.id === action.payload.enrollmentId,
      );
      if (!enrollment) return;
      if (!enrollment.assignmentMarks) enrollment.assignmentMarks = [];
      // Prevent duplicate submission for the same week
      const alreadySubmitted = enrollment.assignmentMarks.some(
        (m) => m.assignmentWeekId === action.payload.assignmentWeekId,
      );
      if (alreadySubmitted) return;
      enrollment.assignmentMarks.push({
        id: nanoid(),
        assignmentWeekId: action.payload.assignmentWeekId,
        submissionLink: action.payload.submissionLink,
        submittedAt: new Date().toISOString(),
      });
    },

    gradeAssignment(
      state,
      action: PayloadAction<{
        enrollmentId: string;
        assignmentWeekId: string;
        marks: number;
        comments: string;
      }>,
    ) {
      const enrollment = state.items.find(
        (e) => e.id === action.payload.enrollmentId,
      );
      if (!enrollment || !enrollment.assignmentMarks) return;
      const mark = enrollment.assignmentMarks.find(
        (m) => m.assignmentWeekId === action.payload.assignmentWeekId,
      );
      if (!mark) return;
      mark.marks = action.payload.marks;
      mark.comments = action.payload.comments;
    },

    submitQuiz(
      state,
      action: PayloadAction<{
        enrollmentId: string;
        quizWeekId: string;
        score: number;
        totalQuestions: number;
      }>,
    ) {
      const enrollment = state.items.find(
        (e) => e.id === action.payload.enrollmentId,
      );
      if (!enrollment) return;
      if (!enrollment.quizMarks) enrollment.quizMarks = [];
      // Prevent duplicate submission for the same week
      const alreadySubmitted = enrollment.quizMarks.some(
        (m) => m.quizWeekId === action.payload.quizWeekId,
      );
      if (alreadySubmitted) return;
      enrollment.quizMarks.push({
        id: nanoid(),
        quizWeekId: action.payload.quizWeekId,
        submittedAt: new Date().toISOString(),
        score: action.payload.score,
        totalQuestions: action.payload.totalQuestions,
      });
    },

    gradeQuiz(
      state,
      action: PayloadAction<{
        enrollmentId: string;
        quizWeekId: string;
        adminComments: string;
      }>,
    ) {
      const enrollment = state.items.find(
        (e) => e.id === action.payload.enrollmentId,
      );
      if (!enrollment || !enrollment.quizMarks) return;
      const mark = enrollment.quizMarks.find(
        (m) => m.quizWeekId === action.payload.quizWeekId,
      );
      if (!mark) return;
      mark.adminComments = action.payload.adminComments;
    },
  },
});

export const {
  addEnrollment,
  updateEnrollment,
  removeEnrollment,
  submitAssignment,
  gradeAssignment,
  submitQuiz,
  gradeQuiz,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
