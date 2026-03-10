import type { PromoCodeFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface PromoCode extends PromoCodeFormValue {
  id: string;
}

interface PromoCodesState {
  items: PromoCode[];
}

const initialState: PromoCodesState = {
  items: [],
};

const promoCodesSlice = createSlice({
  name: "promoCodes",
  initialState,
  reducers: {
    setPromoCodes(state, action: PayloadAction<PromoCode[]>) {
      state.items = action.payload;
    },
    addPromoCode(state, action: PayloadAction<PromoCodeFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updatePromoCode(
      state,
      action: PayloadAction<{ id: string; data: PromoCodeFormValue }>
    ) {
      const { id, data } = action.payload;
      const index = state.items.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
      }
    },
    removePromoCode(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
    clearPromoCodes(state) {
      state.items = [];
    },
  },
});

export const {
  setPromoCodes,
  addPromoCode,
  updatePromoCode,
  removePromoCode,
  clearPromoCodes,
} = promoCodesSlice.actions;

export default promoCodesSlice.reducer;
