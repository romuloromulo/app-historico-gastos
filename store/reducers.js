import { createSlice } from "@reduxjs/toolkit";
import { getFormattedDate } from "../util/date";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Teste1",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "Teste2",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Teste3",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "Teste4",
    amount: 14.99,
    date: new Date("2023-05-30"),
  },
  {
    id: "e5",
    description: "Teste5",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Teste6",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e7",
    description: "Teste7",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e8",
    description: "Teste8",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e9",
    description: "Teste19",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [...DUMMY_EXPENSES],
  },
  reducers: {
    addExpense: (state, action) => {
      const { id, description, amount, date } = action.payload;
      state.expenses.push({
        description,
        amount,
        date,
        id,
      });
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
        expense.id = id;
      }
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expenseSlice.actions;

export const expenseReducer = expenseSlice.reducer;
