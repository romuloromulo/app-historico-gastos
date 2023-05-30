import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, deleteExpense, updateExpense } from "../store/reducers";

const colors = GlobalStyles.colors;
function ManageExpenses({ route, navigation }) {
  const dispatch = useDispatch();
  const id = route.params?.expenseId;

  const isEditing = !!id;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    dispatch(deleteExpense(id));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(params) {
    if (isEditing) {
      dispatch(
        updateExpense({
          description: "TESSSSTANDO",
          amount: 4.2,
          date: new Date("2023-05-29"),
          id: id,
        })
      );
    } else {
      dispatch(
        addExpense({
          description: "Maiscoisasim",
          amount: 40.2,
          date: new Date("2023-05-29"),
          id: Math.floor(Math.random()).toFixed(4),
        })
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}{" "}
        </Button>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidht: 120,
    marginHorizontal: 8,
  },
});
