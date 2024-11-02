import { ListRenderItem, StyleSheet, Text } from "react-native";
import {
  MonthlyFinancialData,
  useFinancialModelStore,
} from "@/stores/financialModelStore";
import { useRouter } from "expo-router";
import ListItem from "../ListItem";
import BottomSheetList from "../BottomSheetList";
import { MonthMap } from "@/stores/common";
import KeyValueTable from "../KeyValueTable";

export default function FinancialModelsListPage() {
  const { financialData } = useFinancialModelStore();
  const router = useRouter();

  const renderItem: ListRenderItem<MonthlyFinancialData> = ({
    item,
    index,
  }) => (
    <ListItem
      index={index}
      title={MonthMap[item.month]}
      onPress={() => router.push(`/financial-model-month/${item.id}`)}
    >
      <KeyValueTable
        data={[
          ["Робочі дні в місяць", item.workingDaysPerMonth ?? 0],
          ["Робочі дні в тиждень", item.workingDaysPerWeek ?? 0],
          ["Кількість клієнтів на день", item.clientsNumberPerDay ?? 0],
          ["Кількість годин на одного клієнта", item.hoursNumberPerClient ?? 0],
        ]}
      />
    </ListItem>
  );

  return (
    <BottomSheetList data={financialData} renderItem={renderItem}>
      <Text style={styles.totalPrice}>test</Text>
    </BottomSheetList>
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
