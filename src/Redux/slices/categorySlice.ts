import type { CategoryFormValue } from "@/schemas/admin/adminSchema"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState{
    items: CategoryFormValue[];
}

const initialState: CategoriesState = {
    items: [],
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<CategoryFormValue[]>) {
            state.items = action.payload;
        },
        addCategory(state, action: PayloadAction<CategoryFormValue>){
            state.items.push(action.payload);
        },
        updateCategory(state, action: PayloadAction<{index: number, data: CategoryFormValue}>){
            const {index, data} = action.payload;
            if(state.items[index]){
                state.items[index] = data;
            }
        },
        removeCategory(state, action: PayloadAction<number>){
            state.items.splice(action.payload, 1);
        },
        clearCategories(state){
            state.items = [];
        },
    },
})

export const { setCategories, addCategory, updateCategory, removeCategory, clearCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;