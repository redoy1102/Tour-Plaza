import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "./api/searchApi";
import prerequisitesReducer from "./slices/prerequisitesSlice";
import toolsReducer from "./slices/toolsSlice";
import categoriesReducer from "./slices/categorySlice";
import instructorsReducer from "./slices/instructorSlice";
import supportStaffReducer from "./slices/supportStaffSlice";

export const store = configureStore({
  reducer: {
    [searchApi.reducerPath]: searchApi.reducer,
    prerequisites: prerequisitesReducer,
    tools: toolsReducer,
    categories: categoriesReducer,
    instructors: instructorsReducer,
    supportStaff: supportStaffReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
