import CostPriceDetailsPage from "@/components/pages/CostPriceDetailsPage";
import { CostPriceFormValues, useCostPriceStore } from "@/stores/costPriceStore";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function AddCostPrice() {
  const { addCostPrice } = useCostPriceStore();
  const router = useRouter();

  const onAddCostPrice = (costPrice: CostPriceFormValues) => {
    addCostPrice(costPrice);
    router.replace('/(tabs)/cost-price');
    Toast.show({
      type: "success",
      text1: costPrice.name,
      text2: "Собівартість додано",
    });
  };

  return <CostPriceDetailsPage onSubmit={onAddCostPrice} />;
}