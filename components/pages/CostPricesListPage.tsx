import { View, ListRenderItem, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/Text";
import { CostPrice, useCostPriceStore } from "@/stores/costPriceStore";
import { useRouter } from "expo-router";
import AppendableList from "../AppendableList";
import ListItem from "../ListItem";
import { Ionicons } from "@expo/vector-icons";

export default function CostPricesListPage() {
  const { costPrices } = useCostPriceStore();
  const router = useRouter();

  const renderItem: ListRenderItem<CostPrice> = ({ item, index }) => (
    <ListItem
      index={index}
      onPress={() => router.push(`/cost-price/${item.id}`)}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </ListItem>
  );

  return (
    <AppendableList
      data={costPrices}
      renderItem={renderItem}
      onAddItem={() => router.push("/cost-price/add")}
    ></AppendableList>
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
  summary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  averageClientsNumberBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  averageClientsNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
