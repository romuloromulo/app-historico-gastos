import { View, Text, FlatList, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content =
    expenses.length < 1 ? (
      <Text style={styles.infoText}>{fallbackText}</Text>
    ) : (
      <ExpensesList expenses={expenses} />
    );

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
