import type { CategoryFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

// we maintain a unique id for each category so that courses can reference them
export interface Category {
  id: string;
  name: string;
}

interface CategoriesState {
  items: Category[];
}

const initialState: CategoriesState = {
  items: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.items = action.payload;
    },
    addCategory(state, action: PayloadAction<CategoryFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updateCategory(
      state,
      action: PayloadAction<{ id: string; data: CategoryFormValue }>
    ) {
      const { id, data } = action.payload;
      const index = state.items.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
      }
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
    clearCategories(state) {
      state.items = [];
    },
  },
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  removeCategory,
  clearCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
