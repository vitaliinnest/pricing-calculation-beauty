import { ListRenderItem, StyleSheet } from "react-native";
import {
  MonthlyFinancialData,
  useFinancialModelStore,
} from "@/stores/financialModelStore";
import { useRouter } from "expo-router";
import ListItem from "../ListItem";
import BottomSheetList from "../BottomSheetList";
import { MonthMap } from "@/stores/common";
import KeyValueTable from "../KeyValueTable";
import EuroInput from "../inputs/EuroInput";
import CalculatedEuroField from "../calculatedFields/CalculatedEuroField";
import CalculatedTextField from "../calculatedFields/CalculatedTextField";
import { useExpenseStore } from "@/stores/expenseStore";

export default function FinancialModelsListPage() {
  const { expenses } = useExpenseStore();

  const {
    financialData,
    calculateTotalWorkingDays,
    calculateAverageWorkingDaysPerWeek,
    calculateAverageClientsNumberPerDay,
    calculateAverageHoursNumberPerClient,
    calculateAverageDailyClientHours,
    calculateAverageClientsNumberPerWeek,
    calculateTotalClientsNumberPerMonth,
    calculateTotalMonthlyClientHours,
    calculateAverageMonthlyCostPrice,
    calculateExpectedMonthlyProfit,
  } = useFinancialModelStore();

  const router = useRouter();

  const renderItem: ListRenderItem<MonthlyFinancialData> = ({
    item,
    index,
  }) => {
    const expensesMap = expenses.reduce(
      (acc, expense) => ({
        ...acc,
        [expense.id]: expense.priceMap[item.month],
      }),
      {}
    );
    return (
      <ListItem
        index={index}
        title={MonthMap[item.month]}
        onPress={() => router.push(`/financial-model-month/${item.id}`)}
      >
        <KeyValueTable
          data={[
            ["Робочі дні в місяць", item.workingDaysPerMonth ?? 0],
            ["Робочі дні в тиждень", item.workingDaysPerWeek ?? 0],
            ["Кількість клієнтів на день", item.clientsNumberPerDay ?? 0],
            [
              "Кількість годин на одного клієнта",
              item.hoursNumberPerClient ?? 0,
            ],
            [
              "Орієнтований прибуток",
              `${calculateExpectedMonthlyProfit({ ...item, expensesMap })} €`,
            ],
          ]}
        />
      </ListItem>
    );
  };

  return (
    <BottomSheetList data={financialData} renderItem={renderItem}>
      <KeyValueTable
        data={[
          ["Загальна кількість робочих днів", calculateTotalWorkingDays()],
          [
            "Середня кількість робочих днів на тиждень",
            calculateAverageWorkingDaysPerWeek(),
          ],
          [
            "Середня кількість клієнтів на день",
            calculateAverageClientsNumberPerDay(),
          ],
          [
            "Середня кількість годин на одного клієнта",
            calculateAverageHoursNumberPerClient(),
          ],
          [
            "Середня кількість годин на одного клієнта в день",
            calculateAverageDailyClientHours(),
          ],
          [
            "Середня кількість клієнтів на тиждень",
            calculateAverageClientsNumberPerWeek(),
          ],
          [
            "Загальна кількість клієнтів в місяць",
            calculateTotalClientsNumberPerMonth(),
          ],
          [
            "Загальна кількість годин в місяць",
            calculateTotalMonthlyClientHours(),
          ],
          [
            "Середня собівартість матеріалу в місяць",
            `${calculateAverageMonthlyCostPrice()} €`,
          ],
          // four fields left
        ]}
      />
    </BottomSheetList>
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
