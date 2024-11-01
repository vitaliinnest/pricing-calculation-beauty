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
import BottomSheetList from "../BottomSheetList";
import { MonthMap } from "@/stores/common";

export default function FinancialModelsListPage() {
  const { financialData } = useFinancialModelStore();
  const router = useRouter();

  const renderItem: ListRenderItem<MonthlyFinancialData> = ({
    item,
    index,
  }) => (
    <ListItem
      index={index}
      onPress={() => router.push(`/financial-model/${item.id}`)}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{MonthMap[item.month]}</Text>
      </View>
    </ListItem>
  );

  return (
    <BottomSheetList data={financialData} renderItem={renderItem}>
      
    </BottomSheetList>
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
