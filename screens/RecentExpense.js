import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expenses = useSelector((state) => state.expenses.expenses);
  // expenses.map((x) => console.log(x.date));
  const RecentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date = getDateMinusDays(today, 7);

    // console.log(expense.date, "AUAUYIAOSUODAS");
    // console.log();
    // console.log(expense.date);
    return expense.date > date && expense.date <= today;
  });

  return (
    <ExpensesOutput
      fallbackText={"No expenses registered for the last 7 days."}
      expenses={RecentExpenses}
      expensesPeriod={"Last 7 days"}
    />
  );
}

export default RecentExpenses;
