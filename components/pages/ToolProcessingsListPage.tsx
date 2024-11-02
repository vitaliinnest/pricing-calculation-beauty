import { ListRenderItem, StyleSheet, Text } from "react-native";
import AppendableList from "../AppendableList";
import {
  ToolProcessing,
  useToolProcessingStore,
} from "@/stores/toolProcessingStore";
import ListItem from "../ListItem";
import { useRouter } from "expo-router";
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
          ["Кількість клієнтів на день", item.clientsPerDay],
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
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
