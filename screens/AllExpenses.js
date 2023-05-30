import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

function AllExpenses({ navigation }) {
  const expenses = useSelector((state) => state.expenses.expenses);

  // console.log(expenses);
  return (
    <ExpensesOutput
      fallbackText={"No registered expenses found."}
      expenses={expenses}
      expensesPeriod={"Total"}
    />
  );
}

export default AllExpenses;
