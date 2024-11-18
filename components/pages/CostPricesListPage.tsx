import { ListRenderItem, StyleSheet } from "react-native";
import Text from "@/components/Text";
import { CostPrice, useCostPriceStore } from "@/stores/costPriceStore";
import { useRouter } from "expo-router";
import AppendableList from "../AppendableList";
import ListItem from "../ListItem";
import KeyValueTable from "../KeyValueTable";
import { useTranslation } from "react-i18next";
import { calculateClientsNumber, calculatePricePerClient } from "@/calculators/costPriceCalculators";

export default function CostPricesListPage() {
  const { costPrices, calculateTotalForOneClient } = useCostPriceStore();
  const router = useRouter();
  const { t } = useTranslation("costPrice");

  const renderItem: ListRenderItem<CostPrice> = ({ item, index }) => (
    <ListItem
      index={index}
      title={item.name}
      onPress={() => router.push(`/cost-price/${item.id}`)}
    >
      <KeyValueTable
        data={[
          [t('price'), `${item.price} €`],
          [t('volume'), item.volume],
          [t('expenditurePerClient'), item.expenditurePerClient],
          [t('totalClients'), calculateClientsNumber(item)],
          [t('pricePerClient'), calculatePricePerClient(item)],
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
        {`${t('totalPricePerClient')}: ${calculateTotalForOneClient()} €`}
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
