import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { SupportStuffFormValue } from "@/schemas/admin/adminSchema";

export interface supportStaffItem {
  id: string;
  name: string;
  role: string;
  imageFile?: string;
  runningCompanyName: string;
}

interface SupportStaffState {
  items: supportStaffItem[];
}

const initialState: SupportStaffState = {
  items: [
    {
      id: nanoid(),
      name: "John Doe",
      role: "Support Engineer",
      runningCompanyName: "eManagerIT",
      imageFile: undefined,
    }
  ],
};

const supportStaffSlice = createSlice({
  name: "supportStaff",
  initialState,
  reducers: {
    setSupportStaff(state, action: PayloadAction<supportStaffItem[]>) {
      state.items = action.payload;
    },
    addSupportStaff(state, action: PayloadAction<SupportStuffFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updateSupportStaff(
      state,
      action: PayloadAction<{ id: string; data: SupportStuffFormValue }>
    ) {
      const { id, data } = action.payload;
      const existIndex = state.items.findIndex((item) => item.id === id);
      if (existIndex !== -1) {
        state.items[existIndex] = { ...state.items[existIndex], ...data };
      }
    },
    removeSupportStaff(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearSupportStaff(state) {
      state.items = [];
    },
  },
});

export const {
  setSupportStaff,
  addSupportStaff,
  updateSupportStaff,
  removeSupportStaff,
  clearSupportStaff,
} = supportStaffSlice.actions;

export default supportStaffSlice.reducer;
