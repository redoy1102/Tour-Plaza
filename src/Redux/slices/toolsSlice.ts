import type { ToolsFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ToolsState {
  items: ToolsFormValue[];
}

const initialState: ToolsState = {
  items: [],
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setTools(state, action: PayloadAction<ToolsFormValue[]>) {
      state.items = action.payload;
    },
    addTool(state, action: PayloadAction<ToolsFormValue>) {
      state.items.push(action.payload);
    },
    updateTool(
      state,
      action: PayloadAction<{ index: number; data: ToolsFormValue }>
    ) {
      const { index, data } = action.payload;
      if (state.items[index]) {
        state.items[index] = data;
      }
    },
    removeTool(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    clearTools(state) {
      state.items = [];
    },
  },
});

export const { setTools, addTool, updateTool, removeTool, clearTools } =
  toolsSlice.actions;

export default toolsSlice.reducer;
