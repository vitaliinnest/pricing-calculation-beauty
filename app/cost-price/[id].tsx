import CostPriceDetailsPage from "@/components/pages/CostPriceDetailsPage";
import {
  CostPriceFormValues,
  useCostPriceStore,
} from "@/stores/costPriceStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function EditCostPriceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateCostPrice, deleteCostPrice, getCostPriceById } =
    useCostPriceStore();
  const costPrice = getCostPriceById(id);

  if (!costPrice) {
    return null;
  }

  const onUpdateCostPrice = (costPrice: CostPriceFormValues) => {
    updateCostPrice(id, costPrice);
    router.replace("/(tabs)/cost-price");
    Toast.show({
      type: "success",
      text1: costPrice.name,
      text2: "Собівартість оновлено",
    });
  };

  const onDeleteCostPrice = () => {
    deleteCostPrice(id);
    router.replace("/(tabs)/cost-price");
    Toast.show({
      type: "success",
      text1: costPrice.name,
      text2: "Собівартість видалено",
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