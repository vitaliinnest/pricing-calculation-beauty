import { View, ListRenderItem, StyleSheet } from "react-native";
import { Text } from "@/components/Text";
import { Expense, useExpenseStore } from "@/stores/expenseStore";
import { useRouter } from "expo-router";
import AppendableList from "../AppendableList";
import ListItem from "../ListItem";

export default function ExpensesListPage() {
  const { expenses } = useExpenseStore();
  const router = useRouter();

  const renderItem: ListRenderItem<Expense> = ({ item, index }) => (
    <ListItem
      index={index}
      onPress={() => router.push(`/expense/${item.id}`)}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </ListItem>
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
  itemContainer: {
    paddingLeft: 10,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    // marginHorizontal: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: "#555",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
