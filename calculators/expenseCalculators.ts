import { ExpenseFormValues } from "@/stores/expenseStore";
import { roundUpTo2 } from "@/utils";

export function calculateTotalPrice(expense: ExpenseFormValues): number {
  return roundUpTo2(
    Object.values(expense.priceMap).reduce((sum, price) => sum + price, 0)
  );
}
