import CostPriceDetailsPage from "@/components/pages/CostPriceDetailsPage";
import {
  CostPriceFormValues,
  useCostPriceStore,
} from "@/stores/costPriceStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function EditCostPriceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateCostPrice, deleteCostPrice, getCostPriceById } =
    useCostPriceStore();
  const costPrice = getCostPriceById(id);
  const { t } = useTranslation("costPrice");

  if (!costPrice) {
    return null;
  }

  const onUpdateCostPrice = (costPrice: CostPriceFormValues) => {
    updateCostPrice(id, costPrice);
    router.replace("/(tabs)/cost-price");
    Toast.show({
      type: "success",
      text1: costPrice.name,
      text2: t("updated"),
    });
  };

  const onDeleteCostPrice = () => {
    deleteCostPrice(id);
    router.replace("/(tabs)/cost-price");
    Toast.show({
      type: "success",
      text1: costPrice.name,
      text2: t("deleted"),
    });
  };

  return (
    <CostPriceDetailsPage
      costPrice={costPrice}
      onSubmit={onUpdateCostPrice}
      onDelete={onDeleteCostPrice}
    />
  );
}
