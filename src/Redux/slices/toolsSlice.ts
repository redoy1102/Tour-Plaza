import type { ToolsFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface Tool {
  id: string;
  name: string;
  description: string;
  imageFile?: string;
}

interface ToolsState {
  items: Tool[];
}

const initialState: ToolsState = {
  items: [
    {
      id: nanoid(),
      name: "VS Code",
      description: "A popular code editor developed by Microsoft.",
      imageFile: undefined,
    }
  ],
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setTools(state, action: PayloadAction<Tool[]>) {
      state.items = action.payload;
    },
    addTool(state, action: PayloadAction<ToolsFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updateTool(
      state,
      action: PayloadAction<{ id: string; data: ToolsFormValue }>
    ) {
      const { id, data } = action.payload;
      const idx = state.items.findIndex((t) => t.id === id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...data };
      }
    },
    removeTool(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    clearTools(state) {
      state.items = [];
    },
  },
});

export const { setTools, addTool, updateTool, removeTool, clearTools } =
  toolsSlice.actions;

export default toolsSlice.reducer;
