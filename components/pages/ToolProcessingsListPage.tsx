import { ListRenderItem, StyleSheet, Text, View } from "react-native";
import AppendableList from "../AppendableList";
import {
  ToolProcessing,
  useToolProcessingStore,
} from "@/stores/toolProcessingStore";
import ListItem from "../ListItem";
import { useRouter } from "expo-router";
import { calculateTotalPricePerClient } from "@/calculators/toolProcessingCalculators";

export default function ToolProcessingsListPage() {
  const { tools } = useToolProcessingStore();
  const router = useRouter();

  const renderItem: ListRenderItem<ToolProcessing> = ({ index, item }) => {
    return (
      <ListItem index={index} onPress={() => router.push(`/tool-processing/${item.id}`)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDetail}>{`Вартість: ${item.price} €`}</Text>
          <Text style={styles.itemDetail}>{`Обсяг: ${item.volume}`}</Text>
          <Text style={styles.itemDetail}>{`Витрати на день: ${item.expenditurePerDay}`}</Text>
        </View>
      </ListItem>
    );
  };

  return (
    <AppendableList
      data={tools}
      renderItem={renderItem}
      onAddItem={() => router.push("/tool-processing/add")}
    >
      {tools.length > 0 && (
        <Text style={styles.totalPrice}>
          {`Ціна обробки інструментів для одного клієнта: ${calculateTotalPricePerClient(tools)} €`}
        </Text>
      )}
    </AppendableList>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: '#555',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});