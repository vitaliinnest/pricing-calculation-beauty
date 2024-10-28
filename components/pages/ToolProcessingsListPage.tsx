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

export default function ToolProcessingsListPage() {
  const { tools, getTotalForOneClient } = useToolProcessingStore();
  const router = useRouter();

  const renderItem: ListRenderItem<ToolProcessing> = ({ item, index }) => (
    <ListItem
      index={index}
      onPress={() => router.push(`/tool-processing/${item.id}`)}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            <Text style={styles.itemDetail}>{`Вартість: ${item.price} €`}</Text>
            <Text style={styles.itemDetail}>{`Обсяг: ${item.volume}`}</Text>
            <Text
              style={styles.itemDetail}
            >{`Витрати на день: ${item.expenditurePerDay}`}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.itemDetail}>{`Дні: ${calculateDaysAmount(
              item
            )}`}</Text>
            <Text
              style={styles.itemDetail}
            >{`Ціна в день: ${calculatePricePerDay(item)}`}</Text>
            <Text
              style={styles.itemDetail}
            >{`Витрата на одного клієнта: ${calculateExpenditurePerClient(
              item
            )} €`}</Text>
          </View>
        </View>
      </View>
    </ListItem>
  );

  return (
    <AppendableList
      data={tools}
      renderItem={renderItem}
      onAddItem={() => router.push("/tool-processing/add")}
    >
      <Text style={styles.totalPrice}>
        {`Сумарна ціна обробки інструментів на одного клієнта: ${getTotalForOneClient()} €`}
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
    marginBottom: 20,
  },
});
