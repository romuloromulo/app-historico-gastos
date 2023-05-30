// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { expenseReducer } from "./reducers";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: { expenses: expenseReducer },
  middleware: customizedMiddleware,
});
