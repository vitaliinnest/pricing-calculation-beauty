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
import { useState } from "react";
import AverageClientsNumberModal from "./AverageClientsNumberModal";
import KeyValueTable from "../KeyValueTable";
import { useTranslation } from "react-i18next";
import { calculatePricePerClient, calculatePricePerDay } from "@/calculators/equipmentWearCalculators";

export default function EquipmentWearsListPage() {
  const { equipmentWears, getTotalForOneClient, averageClientsNumberPerDay } =
    useEquipmentWearStore();

  const [avgClientsNumberModalVisible, setAvgClientsNumberModalVisible] =
    useState(false);
  const { t } = useTranslation("equipmentWear");

  const router = useRouter();

  const renderItem: ListRenderItem<EquipmentWear> = ({ item, index }) => (
    <ListItem
      index={index}
      title={item.name}
      onPress={() => router.push(`/equipment-wear/${item.id}`)}
    >
      <KeyValueTable
        data={[
          [t("price"), `${item.price} €`],
          [t("serviceLifeInDays"), item.serviceLifeInDays],
          [t("pricePerDay"), `${calculatePricePerDay(item)} €`],
          [t("pricePerClient"), `${calculatePricePerClient(item, averageClientsNumberPerDay)} €`],
        ]}
      />
    </ListItem>
  );

  return (
    <AppendableList
      data={equipmentWears}
      renderItem={renderItem}
      onAddItem={() => router.push("/equipment-wear/add")}
    >
      <View style={styles.summary}>
        <Text style={styles.totalPrice}>
          {`${t("totalPricePerClient")}: ${getTotalForOneClient()} €`}
        </Text>
        <Pressable
          style={styles.averageClientsNumberBtn}
          onPress={() => setAvgClientsNumberModalVisible(true)}
        >
          <Text style={styles.averageClientsNumber}>
            {averageClientsNumberPerDay}
          </Text>
          <Ionicons name="people" size={25} color="black" />
        </Pressable>
      </View>

      <AverageClientsNumberModal
        visible={avgClientsNumberModalVisible}
        onClose={() => setAvgClientsNumberModalVisible(false)}
      />
    </AppendableList>
  );
}

const styles = StyleSheet.create({
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
