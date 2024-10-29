import {
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  MonthlyFinancialData,
  useFinancialModelStore,
} from "@/stores/financialModelStore";
import { useRouter } from "expo-router";
import ListItem from "../ListItem";
import { Ionicons } from "@expo/vector-icons";
import AppendableList from "../AppendableList";

export default function FinancialModelsListPage() {
  const { financialData } = useFinancialModelStore();
  const router = useRouter();

  // const renderItem: ListRenderItem<MonthlyFinancialData> = ({
  //   item,
  //   index,
  // }) => (
  //   <ListItem
  //     index={index}
  //     onPress={() => router.push(`/financial-model/${item.id}`)}
  //   >
  //     <View style={styles.itemContainer}>
  //       <Text style={styles.itemTitle}>{item.name}</Text>
  //     </View>
  //   </ListItem>
  // );

  return <View></View>;
  // return (
  //   <AppendableList
  //     data={financialData}
  //     renderItem={renderItem}
  //     onAddItem={() => router.push("/financial-model/add")}
  //   >
  //     {/* <View style={styles.summary}>
  //       <Text style={styles.totalPrice}>
  //         {`Сумарна ціна на одного клієнта: ${getTotalForOneClient()} €`}
  //       </Text>
  //       <Pressable
  //         style={styles.averageClientsNumberBtn}
  //         onPress={() => setAvgClientsNumberModalVisible(true)}
  //       >
  //         <Text style={styles.averageClientsNumber}>
  //           {averageClientsNumberPerDay}
  //         </Text>
  //         <Ionicons name="people" size={25} color="black" />
  //       </Pressable>
  //     </View> */}
  //   </AppendableList>
  // );
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
