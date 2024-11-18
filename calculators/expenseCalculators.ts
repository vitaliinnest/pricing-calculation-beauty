import { ExpenseFormValues } from "@/stores/expenseStore";
import { roundNumber } from "@/utils";

export function calculateTotalPrice(expense: ExpenseFormValues): number {
  return roundNumber(
    Object.values(expense.priceMap).reduce((sum, price) => sum + price, 0)
  );
}
