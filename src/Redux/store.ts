import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { searchApi } from "./api/searchApi";
import prerequisitesReducer from "./slices/prerequisitesSlice";
import toolsReducer from "./slices/toolsSlice";
import categoriesReducer from "./slices/categorySlice";
import instructorsReducer from "./slices/instructorSlice";
import supportStaffReducer from "./slices/supportStaffSlice";
import coursesReducer from "./slices/courseSlice";
import paymentMethodsReducer from "./slices/paymentSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "prerequisites",
    "tools",
    "categories",
    "instructors",
    "supportStaff",
    "courses",
    "paymentMethods",
  ],
};

const rootReducer = combineReducers({
  [searchApi.reducerPath]: searchApi.reducer,
  prerequisites: prerequisitesReducer,
  tools: toolsReducer,
  categories: categoriesReducer,
  instructors: instructorsReducer,
  supportStaff: supportStaffReducer,
  courses: coursesReducer,
  paymentMethods: paymentMethodsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(searchApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
