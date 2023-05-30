import { FlatList, StyleSheet, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;

function renderExpenseItem(itemData) {
  const item = itemData.item;
  return <ExpenseItem {...item} />;
}

function ExpensesList({ expenses }) {
  // console.log(expenses);
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    container: 9,
    backgroundColor: colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  perdiod: { fontSize: 12, color: colors.primary400 },
  sum: { fontSize: 16, fontWeight: "bold", color: colors.primary500 },
});
