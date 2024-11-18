import { ListRenderItem } from "react-native";
import { Expense, useExpenseStore } from "@/stores/expenseStore";
import { useRouter } from "expo-router";
import AppendableList from "../AppendableList";
import ListItem from "../ListItem";
import KeyValueTable from "../KeyValueTable";
import { useTranslation } from "react-i18next";
import { calculateTotalPrice } from "@/calculators/expenseCalculators";

export default function ExpensesListPage() {
  const { expenses } = useExpenseStore();
  const router = useRouter();
  const { t } = useTranslation("expenses");

  const renderItem: ListRenderItem<Expense> = ({ item, index }) => (
    <ListItem
      index={index}
      title={item.name}
      onPress={() => router.push(`/expense/${item.id}`)}
    >
      <KeyValueTable
        data={[
          [t("totalPrice"), `${calculateTotalPrice(item)} €`],
        ]}
      />
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
