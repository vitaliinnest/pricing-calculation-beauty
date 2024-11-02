import { ListRenderItem, StyleSheet } from "react-native";
import { Expense, useExpenseStore } from "@/stores/expenseStore";
import { useRouter } from "expo-router";
import AppendableList from "../AppendableList";
import ListItem from "../ListItem";
import KeyValueTable from "../KeyValueTable";

export default function ExpensesListPage() {
  const { expenses } = useExpenseStore();
  const router = useRouter();

  const renderItem: ListRenderItem<Expense> = ({ item, index }) => (
    <ListItem
      index={index}
      title={item.name}
      onPress={() => router.push(`/expense/${item.id}`)}
    />
  );

  return (
    <AppendableList
      data={expenses}
      renderItem={renderItem}
      onAddItem={() => router.push("/expense/add")}
    />
  );
}

const styles = StyleSheet.create({
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
