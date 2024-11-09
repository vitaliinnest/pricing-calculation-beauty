import { useTranslation } from "react-i18next";
import { Expense } from "./expenseStore";
import { MonthlyFinancialData } from "./financialModelStore";

export enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const useMonthMap = (): Record<Month, string> => {
  const { t } = useTranslation("months");
  return {
    [Month.January]: t("1"),
    [Month.February]: t("2"),
    [Month.March]: t("3"),
    [Month.April]: t("4"),
    [Month.May]: t("5"),
    [Month.June]: t("6"),
    [Month.July]: t("7"),
    [Month.August]: t("8"),
    [Month.September]: t("9"),
    [Month.October]: t("10"),
    [Month.November]: t("11"),
    [Month.December]: t("12"),
  };
};

export function mapExpenses(
  expenses: Expense[],
  monthlyFinancialData: MonthlyFinancialData
) {
  return expenses.reduce(
    (acc, expense) => ({
      ...acc,
      [expense.id]: expense.priceMap[monthlyFinancialData.month],
    }),
    {}
  );
}
