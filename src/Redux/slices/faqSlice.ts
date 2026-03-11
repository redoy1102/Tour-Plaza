import type { FaqFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface Faq extends FaqFormValue {
  id: string;
}

interface FaqsState {
  items: Faq[];
}

const initialState: FaqsState = {
  items: [],
};

const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    setFaqs(state, action: PayloadAction<Faq[]>) {
      state.items = action.payload;
    },
    addFaq(state, action: PayloadAction<FaqFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updateFaq(
      state,
      action: PayloadAction<{ id: string; data: FaqFormValue }>
    ) {
      const { id, data } = action.payload;
      const index = state.items.findIndex((f) => f.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
      }
    },
    removeFaq(state, action: PayloadAction<string>) {
      state.items = state.items.filter((f) => f.id !== action.payload);
    },
    clearFaqs(state) {
      state.items = [];
    },
  },
});

export const { setFaqs, addFaq, updateFaq, removeFaq, clearFaqs } =
  faqsSlice.actions;

export default faqsSlice.reducer;
