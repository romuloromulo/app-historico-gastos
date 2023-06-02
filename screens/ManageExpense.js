import { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, deleteExpense, updateExpense } from "../store/reducers";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpenseBE, deleteExpenseBE } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const colors = GlobalStyles.colors;
function ManageExpenses({ route, navigation }) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [shouldRetryRequest, setShouldRetryRequest] = useState(false);

  const [error, setError] = useState();

  const dispatch = useDispatch();
  const id = route.params?.expenseId;

  const expenses = useSelector((state) => state.expenses.expenses);

  const expense = expenses.find((expenses) => expenses.id === id);

  const isEditing = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    try {
      await deleteExpenseBE(id);
      dispatch(deleteExpense(id));
      navigation.goBack();
    } catch (error) {
      setError("Couldn't connect to server.");
      isSubmiting(false);
      setShouldRetryRequest(true);
    }
  }

  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        dispatch(updateExpense({ ...expenseData }));
        await updateExpenseBE(id, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        dispatch(addExpense({ ...expenseData, id: id }));
      }
      navigation.goBack();
      setIsSubmiting(true);
    } catch (error) {
      setError("Couldn't connect to server.");
      setIsSubmiting(false);
      setShouldRetryRequest(true);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function errorHandler() {
    setError(null);
    setIsSubmiting(false);
    setShouldRetryRequest(true);
    if (!shouldRetryRequest) navigation.goBack();
  }

  useEffect(() => {
    if (shouldRetryRequest) {
      if (isEditing) {
        confirmHandler(expense);
      } else {
        if (id) {
          deleteExpenseHandler();
        } else {
          confirmHandler(expense);
        }
      }
      setShouldRetryRequest(false);
    }
  }, [shouldRetryRequest]);

  if (error && !isSubmiting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isSubmiting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        confirmHandler={confirmHandler}
        submitLabel={isEditing ? "Update" : "Add"}
        cancelHandler={cancelHandler}
        onSubmit={confirmHandler}
        inputData={expense}
        isEditing={isEditing}
      />

      {isEditing && (
        <View style={styles.deleContainer}>
          <IconButton
            icon="trash"
            color={colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary800,
  },
  deleContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center",
  },
});
