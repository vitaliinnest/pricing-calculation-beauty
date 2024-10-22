import { ListRenderItem, StyleSheet, Text } from "react-native";
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

  const renderItem: ListRenderItem<ToolProcessing> = ({ item }) => {
    return (
      <ListItem onPress={() => router.push(`/tool-processing/${item.id}`)}>
        <Text>{JSON.stringify(item)}</Text>
      </ListItem>
    );
  };

  return (
    <AppendableList
      data={tools}
      renderItem={renderItem}
      onAddItem={() => router.push("/tool-processing/add")}
    >
      <Text>
        {`Сумарна ціна обробки інструментів на одного клієнта: ${calculateTotalPricePerClient(tools)} €`}
      </Text>
    </AppendableList>
  );
}

const styles = StyleSheet.create({
  
});
