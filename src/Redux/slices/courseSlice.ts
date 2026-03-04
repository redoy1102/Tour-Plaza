import type { AddCourseFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

// ─── Outline types (shared with CourseOutlinePage) ────────────────────────────
export interface Class {
  title?: string;
  resources?: string;
  ytVideoUrl: string;
}
export interface Module {
  moduleTitle?: string;
  classes?: Class[];
}

export interface Course extends AddCourseFormValue {
  id: string;
}

interface CoursesState {
  items: Course[];
}

const initialState: CoursesState = {
  items: [],
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
      action: PayloadAction<{ id: string; outline: Module[] }>
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
  },
});

export const {
  setCourses,
  addCourse,
  updateCourse,
  updateCourseOutline,
  removeCourse,
  clearCourses,
} = coursesSlice.actions;

export default coursesSlice.reducer;
