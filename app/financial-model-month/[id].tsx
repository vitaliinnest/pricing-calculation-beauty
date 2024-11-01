import MonthlyFinancialDataDetailsPage from "@/components/pages/MonthlyFinancialDataDetailsPage";
import { MonthMap } from "@/stores/common";
import {
  MonthlyFinancialDataFormValues,
  useFinancialModelStore,
} from "@/stores/financialModelStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function EditFinancialModelDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateFinancialData, getFinancialDataById } =
    useFinancialModelStore();
  const financialData = getFinancialDataById(id);

  if (!financialData) {
    return null;
  }

  const onUpdateFinancialData = (
    financialData: MonthlyFinancialDataFormValues
  ) => {
    updateFinancialData(id, financialData);
    router.replace("/(tabs)/financial-model");
    Toast.show({
      type: "success",
      text1: MonthMap[financialData.month],
      text2: "Дані оновлено",
    });
  };

  return (
    <MonthlyFinancialDataDetailsPage
      financialData={financialData}
      onSubmit={onUpdateFinancialData}
    />
  );
}
