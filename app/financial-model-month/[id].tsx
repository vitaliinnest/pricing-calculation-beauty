import MonthlyFinancialDataDetailsPage, {
  MonthlyFinancialDataWithExpenses,
} from "@/components/pages/MonthlyFinancialDataDetailsPage";
import { useMonthMap } from "@/stores/common";
import { useExpenseStore } from "@/stores/expenseStore";
import { useFinancialModelStore } from "@/stores/financialModelStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function EditFinancialModelDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateFinancialData, getFinancialDataById } =
    useFinancialModelStore();
  const { updateExpensesPrices } = useExpenseStore();
  const financialData = getFinancialDataById(id);
  const { t } = useTranslation("financialModel");
  const monthMap = useMonthMap();

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
      text1: monthMap[financialData.month],
      text2: t("updated"),
    });
  };

  return (
    <MonthlyFinancialDataDetailsPage
      financialData={financialData}
      onSubmit={onUpdateFinancialData}
    />
  );
}
