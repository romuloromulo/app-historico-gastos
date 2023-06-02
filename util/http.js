import axios from "axios";
import ExpensesSummary from "../components/ExpensesOutput/ExpensesSummary";

const BACKEND_URL = "https://app-controle-gastos-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const resp = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
  const id = resp.data.name;
  return id;
};

export async function fetchExpense() {
  const resp = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];

  for (key in resp.data) {
    const expenseObj = {
      id: key,
      amount: resp.data[key].amount,
      date: new Date(resp.data[key].date),
      description: resp.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpenseBE(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpenseBE(id) {
  console.log(id, "id delte");
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
