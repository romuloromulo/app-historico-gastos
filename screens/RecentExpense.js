import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector, useDispatch } from "react-redux";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import { useEffect, useState } from "react";
import { setExpenses } from "../store/reducers";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [shouldRetryFetch, setShouldRetryFetch] = useState(false);

  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError("Could not fetch expenses!");
        setShouldRetryFetch(true);
      }
      setIsFetching(false);
    }
    getExpenses();
  }, [shouldRetryFetch]);

  function errorHandler() {
    setShouldRetryFetch(true);
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const RecentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date = getDateMinusDays(today, 7);

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
