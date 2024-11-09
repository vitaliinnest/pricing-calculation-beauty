import { ListRenderItem, StyleSheet, Text } from "react-native";
import AppendableList from "../AppendableList";
import {
  ToolProcessing,
  useToolProcessingStore,
} from "@/stores/toolProcessingStore";
import ListItem from "../ListItem";
import { useRouter } from "expo-router";
import KeyValueTable from "../KeyValueTable";
import { useTranslation } from "react-i18next";

export default function ToolProcessingsListPage() {
  const { tools, getTotalForOneClient } = useToolProcessingStore();
  const router = useRouter();
  const { t } = useTranslation("toolProcessing");

  const renderItem: ListRenderItem<ToolProcessing> = ({ item, index }) => (
    <ListItem
      index={index}
      title={item.name}
      onPress={() => router.push(`/tool-processing/${item.id}`)}
    >
      <KeyValueTable
        data={[
          [t("price"), `${item.price} €`],
          [t("volume"), item.volume],
          [t("expenditurePerDay"), item.expenditurePerDay],
          [t("clientsPerDay"), item.clientsPerDay],
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
        {`${t("totalPricePerClient")}: ${getTotalForOneClient()} €`}
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
