import type { InstructorFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InstructorsState {
  items: InstructorFormValue[];
}

const initialState: InstructorsState = {
  items: [],
};

const instructorsSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    setInstructors(state, action: PayloadAction<InstructorFormValue[]>) {
      state.items = action.payload;
    },
    addInstructor(state, action: PayloadAction<InstructorFormValue>) {
      state.items.push(action.payload);
    },
    updateInstructor(
      state,
      action: PayloadAction<{ index: number; data: InstructorFormValue }>
    ) {
      const { index, data } = action.payload;
      if (state.items[index]) {
        state.items[index] = data;
      }
    },
    removeInstructor(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    clearInstructors(state) {
      state.items = [];
    },
  },
});

export const { setInstructors, addInstructor, updateInstructor, removeInstructor, clearInstructors } =
  instructorsSlice.actions;

export default instructorsSlice.reducer;