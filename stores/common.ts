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

export const MonthMap: Record<Month, string> = {
  [Month.January]: "Січень",
  [Month.February]: "Лютий",
  [Month.March]: "Березень",
  [Month.April]: "Квітень",
  [Month.May]: "Травень",
  [Month.June]: "Червень",
  [Month.July]: "Липень",
  [Month.August]: "Серпень",
  [Month.September]: "Вересень",
  [Month.October]: "Жовтень",
  [Month.November]: "Листопад",
  [Month.December]: "Грудень",
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
