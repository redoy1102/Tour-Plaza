import type { PaymentMethodFormValue } from "@/schemas/admin/adminSchema";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

export interface Payment {
  id: string;
  name: string;
  description?: string | undefined;
}

interface PaymentsState {
  items: Payment[];
}

const initialState: PaymentsState = {
  items: [],
};

const paymentSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    setPayments(state, action: PayloadAction<Payment[]>) {
      state.items = action.payload;
    },
    addPayment(state, action: PayloadAction<PaymentMethodFormValue>) {
      state.items.push({ id: nanoid(), ...action.payload });
    },
    updatePayment(
      state,
      action: PayloadAction<{ id: string; data: PaymentMethodFormValue }>,
    ) {
      const { id, data } = action.payload;
      const index = state.items.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...data };
      }
    },
    removePayment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
    clearPayments(state) {
      state.items = [];
    },
  },
});

export const {
  setPayments,
  addPayment,
  updatePayment,
  removePayment,
  clearPayments,
} = paymentSlice.actions;

export default paymentSlice.reducer;
