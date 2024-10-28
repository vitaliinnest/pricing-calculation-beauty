import { ListRenderItem, StyleSheet, Text, View } from "react-native";
import AppendableList from "../AppendableList";
import {
  EquipmentWear,
  useEquipmentWearStore,
} from "@/stores/equipmentWearStore";
import ListItem from "../ListItem";
import { useRouter } from "expo-router";

export default function EquipmentWearsListPage() {
  const { equipmentWears, getTotalForOneClient } = useEquipmentWearStore();
  const router = useRouter();

  const renderItem: ListRenderItem<EquipmentWear> = ({ item, index }) => (
    <ListItem
      index={index}
      onPress={() => router.push(`/equipment-wear/${item.id}`)}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    </ListItem>
  );

  return (
    <AppendableList
      data={equipmentWears}
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
