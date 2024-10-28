import {
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppendableList from "../AppendableList";
import {
  EquipmentWear,
  useEquipmentWearStore,
} from "@/stores/equipmentWearStore";
import ListItem from "../ListItem";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EquipmentWearsListPage() {
  const {
    equipmentWears,
    getTotalForOneClient,
    averageClientsNumberPerDay,
    setAverageCustomersPerDay,
  } = useEquipmentWearStore();

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

  const onChangeAverageClientsNumber = () => {
    
  };

  return (
    <AppendableList
      data={equipmentWears}
      renderItem={renderItem}
      onAddItem={() => router.push("/equipment-wear/add")}
    >
      <View style={styles.summary}>
        <Text style={styles.totalPrice}>
          {`Сумарна ціна на одного клієнта: ${getTotalForOneClient()} €`}
        </Text>
        <Pressable style={styles.averageClientsNumberBtn} onPress={onChangeAverageClientsNumber}>
          <Text style={styles.averageClientsNumber}>
            {averageClientsNumberPerDay}
          </Text>
          <Ionicons name="people" size={25} color="black" />
        </Pressable>
      </View>
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
