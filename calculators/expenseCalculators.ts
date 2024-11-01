import { ExpenseFormValues } from "@/stores/expenseStore";
import { roundUpTo2 } from "@/utils";

export function calculateAveragePrice(expense: ExpenseFormValues): number {
  const prices = Object.values(expense.priceMap);
  const total = prices.reduce((sum, price) => sum + price, 0);
  const average = total / prices.length;
  return roundUpTo2(average);
}
