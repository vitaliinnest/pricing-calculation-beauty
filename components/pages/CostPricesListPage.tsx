import { View, ListRenderItem, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/Text";
import { CostPrice, useCostPriceStore } from "@/stores/costPriceStore";
import { useRouter } from "expo-router";
import AppendableList from "../AppendableList";
import ListItem from "../ListItem";
import { Ionicons } from "@expo/vector-icons";
import KeyValueTable from "../KeyValueTable";

export default function CostPricesListPage() {
  const { costPrices, calculateTotalForOneClient } = useCostPriceStore();
  const router = useRouter();

  const renderItem: ListRenderItem<CostPrice> = ({ item, index }) => (
    <ListItem
      index={index}
      title={item.name}
      onPress={() => router.push(`/cost-price/${item.id}`)}
    >
      <KeyValueTable
        data={[
          ["Вартість", `${item.price} €`],
          ["Обсяг", item.volume],
          ["Витрати на одного клієнта", item.expenditurePerClient],
        ]}
      />
    </ListItem>
  );

  return (
    <AppendableList
      data={costPrices}
      renderItem={renderItem}
      onAddItem={() => router.push("/cost-price/add")}
    >
      <Text style={styles.totalPrice}>
        {`Сумарна ціна на одного клієнта: ${calculateTotalForOneClient()} €`}
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
