import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PrerequisitesFormValue } from "@/schemas/admin/adminSchema";

interface PrerequisitesState {
  items: PrerequisitesFormValue[];
}

const initialState: PrerequisitesState = {
  items: [],
};

const prerequisitesSlice = createSlice({
  name: "prerequisites",
  initialState,
  reducers: {
    setPrerequisites(state, action: PayloadAction<PrerequisitesFormValue[]>) {
      state.items = action.payload;
    },
    addPrerequisite(state, action: PayloadAction<PrerequisitesFormValue>) {
      state.items.push(action.payload);
    },
    updatePrerequisite(
      state,
      action: PayloadAction<{ index: number; data: PrerequisitesFormValue }>
    ) {
      const { index, data } = action.payload;
      if (state.items[index]) {
        state.items[index] = data;
      }
    },
    removePrerequisite(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    clearPrerequisites(state) {
      state.items = [];
    },
  },
});

export const {
  setPrerequisites,
  addPrerequisite,
  updatePrerequisite,
  removePrerequisite,
  clearPrerequisites,
} = prerequisitesSlice.actions;

export default prerequisitesSlice.reducer;
