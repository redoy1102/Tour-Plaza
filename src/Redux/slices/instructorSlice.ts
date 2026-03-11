import type { InstructorFormValue } from "@/schemas/admin/people/instructor.schema";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface InstructorItem {
  id: string;
  name: string;
  role: string;
  imageFile?: string;
  runningCompanyName: string;
}

interface InstructorsState {
  items: InstructorItem[];
}

const initialState: InstructorsState = {
  items: [],
};

const instructorsSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    setInstructors(state, action: PayloadAction<InstructorItem[]>) {
      state.items = action.payload;
    },
    addInstructor(state, action: PayloadAction<InstructorFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updateInstructor(
      state,
      action: PayloadAction<{ id: string; data: InstructorFormValue }>
    ) {
      const { id, data } = action.payload;
      const idx = state.items.findIndex((i) => i.id === id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...data };
      }
    },
    removeInstructor(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearInstructors(state) {
      state.items = [];
    },
  },
});

export const {
  setInstructors,
  addInstructor,
  updateInstructor,
  removeInstructor,
  clearInstructors,
} = instructorsSlice.actions;

export default instructorsSlice.reducer;
