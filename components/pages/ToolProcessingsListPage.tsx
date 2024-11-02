import { ListRenderItem, StyleSheet, Text, View } from "react-native";
import AppendableList from "../AppendableList";
import {
  ToolProcessing,
  useToolProcessingStore,
} from "@/stores/toolProcessingStore";
import ListItem from "../ListItem";
import { useRouter } from "expo-router";
import {
  calculateDaysAmount,
  calculateExpenditurePerClient,
  calculatePricePerDay,
} from "@/calculators/toolProcessingCalculators";
import KeyValueTable from "../KeyValueTable";

export default function ToolProcessingsListPage() {
  const { tools, getTotalForOneClient } = useToolProcessingStore();
  const router = useRouter();

  const renderItem: ListRenderItem<ToolProcessing> = ({ item, index }) => (
    <ListItem
      index={index}
      title={item.name}
      onPress={() => router.push(`/tool-processing/${item.id}`)}
    >
      <KeyValueTable
        data={[
          ["Вартість", `${item.price} €`],
          ["Обсяг", item.volume],
          ["Витрати на день", item.expenditurePerDay],
          ["Дні", calculateDaysAmount(item)],
          ["Ціна в день", calculatePricePerDay(item)],
          [
            "Витрата на одного клієнта",
            `${calculateExpenditurePerClient(item)} €`,
          ],
        ]}
      />
    </ListItem>
  );

  return (
    <AppendableList
      data={tools}
      renderItem={renderItem}
      onAddItem={() => router.push("/tool-processing/add")}
    >
      <Text style={styles.totalPrice}>
        {`Сумарна ціна на одного клієнта: ${getTotalForOneClient()} €`}
      </Text>
    </AppendableList>
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
