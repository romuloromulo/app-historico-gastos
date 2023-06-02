import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      const { id } = action.payload;
      state.expenses = [{ ...action.payload, id: id }, ...state.expenses];
    },
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse();
      state.expenses = inverted;
    },
    deleteExpense: (state, action) => {
      state.expenses.splice(
        state.expenses.findIndex((state) => state.id === action.payload),
        1
      );
    },

    updateExpense: (state, action) => {
      const { id, description, amount, date } = action.payload;

      const expense = state.expenses.find((expense) => expense.id === id);

      if (expense) {
        expense.description = description;
        expense.amount = amount;
        expense.date = date;
      }
    },
  },
});

export const { addExpense, updateExpense, deleteExpense, setExpenses } =
  expenseSlice.actions;

export const expenseReducer = expenseSlice.reducer;
