import { ListRenderItem, StyleSheet } from "react-native";
import {
  MonthlyFinancialData,
  useFinancialModelStore,
} from "@/stores/financialModelStore";
import { useRouter } from "expo-router";
import ListItem from "../ListItem";
import BottomSheetList from "../BottomSheetList";
import { mapExpenses, useMonthMap } from "@/stores/common";
import KeyValueTable from "../KeyValueTable";
import { useExpenseStore } from "@/stores/expenseStore";
import Text from "@/components/Text";
import { useTranslation } from "react-i18next";

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
    calculateYearlyExpectedProfit,
    calculateYearlyTotalExpenses,
    calculateAverageYearlyExpensesPerClient,
    calculateAverageYearlyExpensesPerDay,
    calculateAverageYearlyExpensesPerHour,
  } = useFinancialModelStore();

  const { t } = useTranslation("financialModel");
  const monthMap = useMonthMap();
  
  const router = useRouter();

  const renderItem: ListRenderItem<MonthlyFinancialData> = ({
    item,
    index,
  }) => {
    const expensesMap = mapExpenses(expenses, item);
    return (
      <ListItem
        index={index}
        title={monthMap[item.month]}
        onPress={() => router.push(`/financial-model-month/${item.id}`)}
      >
        <KeyValueTable
          data={[
            [t("workingDaysPerMonth"), item.workingDaysPerMonth ?? 0],
            [t("workingDaysPerWeek"), item.workingDaysPerWeek ?? 0],
            [t("clientsNumberPerDay"), item.clientsNumberPerDay ?? 0],
            [t("hoursNumberPerClient"), item.hoursNumberPerClient ?? 0],
            [
              t("expectedMonthlyProfit"),
              `${calculateExpectedMonthlyProfit({ ...item, expensesMap })} €`,
            ],
          ]}
        />
      </ListItem>
    );
  };
  return (
    <BottomSheetList data={financialData} renderItem={renderItem}>
      <Text type="subtitle" style={styles.title}>
        {t("calculations")}
      </Text>
      <KeyValueTable
        data={[
          [t("expectedYearlyProfit"), `${calculateYearlyExpectedProfit()} €`],
          [t("yearlyExpenses"), `${calculateYearlyTotalExpenses()} €`],
          [
            t("averageExpensesPerClient"),
            `${calculateAverageYearlyExpensesPerClient()} €`,
          ],
          [
            t("averageExpensesPerDay"),
            `${calculateAverageYearlyExpensesPerDay()} €`,
          ],
          [
            t("averageExpensesPerHour"),
            `${calculateAverageYearlyExpensesPerHour()} €`,
          ],
          [t("totalWorkingDays"), calculateTotalWorkingDays()],
          [
            t("averageWorkingDaysPerWeek"),
            calculateAverageWorkingDaysPerWeek(),
          ],
          [
            t("averageClientsNumberPerDay"),
            calculateAverageClientsNumberPerDay(),
          ],
          [
            t("averageHoursNumberPerClient"),
            calculateAverageHoursNumberPerClient(),
          ],
          [t("averageDailyClientHours"), calculateAverageDailyClientHours()],
          [
            t("averageClientsNumberPerWeek"),
            calculateAverageClientsNumberPerWeek(),
          ],
          [
            t("totalClientsNumberPerMonth"),
            calculateTotalClientsNumberPerMonth(),
          ],
          [t("totalMonthlyClientHours"), calculateTotalMonthlyClientHours()],
          [
            t("averageMonthlyCostPrice"),
            `${calculateAverageMonthlyCostPrice()} €`,
          ],
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
  title: {
    paddingLeft: 5,
    paddingBottom: 10,
  },
});
