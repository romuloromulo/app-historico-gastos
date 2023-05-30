import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;
function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses
    .reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.perdiod}>{periodName}</Text>
      <Text style={styles.sum}>R${expensesSum}</Text>
    </View>
  );
}

export default ExpensesSummary;
const styles = StyleSheet.create({
  container: {
    padding: 9,
    backgroundColor: colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  perdiod: { fontSize: 12, color: colors.primary400 },
  sum: { fontSize: 16, fontWeight: "bold", color: colors.primary500 },
});
