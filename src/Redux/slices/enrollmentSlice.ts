import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

export type EnrollmentStatus = "active" | "completed" | "cancelled";

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string; // ISO date string
  status: EnrollmentStatus;
  amount: number;
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
      action: PayloadAction<Omit<Enrollment, "id" | "enrolledAt">>
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
      }>
    ) {
      const index = state.items.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },

    removeEnrollment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
  },
});

export const { addEnrollment, updateEnrollment, removeEnrollment } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;
