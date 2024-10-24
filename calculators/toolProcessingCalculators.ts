import { ToolProcessingFormValues } from "@/stores/toolProcessingStore";
import { roundUpTo2 } from "@/utils";

/** Кількість днів */
export function calculateDaysAmount(tool: ToolProcessingFormValues): number {
  if (!tool?.expenditurePerDay) {
    return 0;
  }
  return roundUpTo2(tool.volume / tool.expenditurePerDay);
}

/** Ціна в день */
export function calculatePricePerDay(tool: ToolProcessingFormValues): number {
  const daysAmount = calculateDaysAmount(tool);
  if (daysAmount === 0) {
    return 0;
  }
  return roundUpTo2(tool.price / daysAmount);
}

/** Витрата на одного клієнта */
export function calculateExpenditurePerClient(
  tool: ToolProcessingFormValues
): number {
  if (!tool?.clientsPerDay) {
    return 0;
  }
  return roundUpTo2(calculatePricePerDay(tool) / tool.clientsPerDay);
}
