import MonthlyFinancialDataDetailsPage, {
  MonthlyFinancialDataWithExpenses,
} from "@/components/pages/MonthlyFinancialDataDetailsPage";
import { MonthMap } from "@/stores/common";
import { useExpenseStore } from "@/stores/expenseStore";
import { useFinancialModelStore } from "@/stores/financialModelStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function EditFinancialModelDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateFinancialData, getFinancialDataById } =
    useFinancialModelStore();
  const { updateExpensesPrices } = useExpenseStore();
  const financialData = getFinancialDataById(id);

  if (!financialData) {
    return null;
  }

  const onUpdateFinancialData = (
    financialData: MonthlyFinancialDataWithExpenses
  ) => {
    updateFinancialData(id, financialData);
    updateExpensesPrices(financialData.month, financialData.expensesMap);
    router.replace("/(tabs)/");
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
