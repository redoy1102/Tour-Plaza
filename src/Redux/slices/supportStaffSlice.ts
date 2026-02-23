import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SupportStuffFormValue } from "@/schemas/admin/adminSchema";

interface SupportStaffState {
  items: SupportStuffFormValue[];
}

const initialState: SupportStaffState = {
  items: [],
};

const supportStaffSlice = createSlice({
  name: "supportStaff",
  initialState,
  reducers: {
    setSupportStaff(state, action: PayloadAction<SupportStuffFormValue[]>) {
      state.items = action.payload;
    },
    addSupportStaff(state, action: PayloadAction<SupportStuffFormValue>) {
      state.items.push(action.payload);
    },
    updateSupportStaff(
      state,
      action: PayloadAction<{ index: number; data: SupportStuffFormValue }>
    ) {
      const { index, data } = action.payload;
      if (state.items[index]) {
        state.items[index] = data;
      }
    },
    removeSupportStaff(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
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
