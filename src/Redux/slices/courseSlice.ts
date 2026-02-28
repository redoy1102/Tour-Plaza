import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

// ─── Outline types (shared with CourseOutlinePage) ────────────────────────────
export interface ClassItem {
  title: string;
  description: string;
  ytVideoUrl: string;
}
export type WeekClasses = ClassItem[];

export interface Course extends AddCourseFormValue {
  id: string;
}

interface CoursesState {
  items: Course[];
  /** Temporary outline for a course that hasn't been created yet ("add" flow). */
  draftOutline: WeekClasses[];
}

const initialState: CoursesState = {
  items: [],
  draftOutline: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses(state, action: PayloadAction<Course[]>) {
      state.items = action.payload;
    },
    addCourse(state, action: PayloadAction<AddCourseFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updateCourse(
      state,
      action: PayloadAction<{ id: string; data: AddCourseFormValue }>
    ) {
      const { id, data } = action.payload;
      const index = state.items.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
      }
    },
    /** Update only the courseOutline of an already-saved course. */
    updateCourseOutline(
      state,
      action: PayloadAction<{ id: string; outline: WeekClasses[] }>
    ) {
      const { id, outline } = action.payload;
      const index = state.items.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.items[index].courseOutline = outline;
      }
    },
    removeCourse(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
    clearCourses(state) {
      state.items = [];
    },
    /** Temporarily holds the outline while creating a brand-new course. */
    setDraftOutline(state, action: PayloadAction<WeekClasses[]>) {
      state.draftOutline = action.payload;
    },
    clearDraftOutline(state) {
      state.draftOutline = [];
    },
  },
});

export const {
  setCourses,
  addCourse,
  updateCourse,
  updateCourseOutline,
  removeCourse,
  clearCourses,
  setDraftOutline,
  clearDraftOutline,
} = coursesSlice.actions;

export default coursesSlice.reducer;
