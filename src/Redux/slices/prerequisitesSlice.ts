import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PrerequisitesFormValue } from "@/schemas/admin/adminSchema";

export interface PrerequisiteItem {
  id: string;
  icon: string;
  title: string;
}

interface PrerequisitesState {
  items: PrerequisiteItem[];
}

const initialState: PrerequisitesState = {
  items: [],
};

const prerequisitesSlice = createSlice({
  name: "prerequisites",
  initialState,
  reducers: {
    setPrerequisites(state, action: PayloadAction<PrerequisiteItem[]>) {
      state.items = action.payload;
    },
    addPrerequisite(state, action: PayloadAction<PrerequisitesFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updatePrerequisite(
      state,
      action: PayloadAction<{ id: string; data: PrerequisitesFormValue }>
    ) {
      const { id, data } = action.payload;
      const idx = state.items.findIndex((p) => p.id === id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...data };
      }
    },
    removePrerequisite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
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
