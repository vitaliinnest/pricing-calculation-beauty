import { ToolProcessingFormValues } from "@/stores/toolProcessingStore";
import { roundNumber } from "@/utils";

/** Кількість днів */
export function calculateDaysAmount(tool: ToolProcessingFormValues): number {
  if (!tool?.expenditurePerDay) {
    return 0;
  }
  return roundNumber(tool.volume / tool.expenditurePerDay);
}

/** Ціна в день */
export function calculatePricePerDay(tool: ToolProcessingFormValues): number {
  const daysAmount = calculateDaysAmount(tool);
  if (daysAmount === 0) {
    return 0;
  }
  return roundNumber(tool.price / daysAmount);
}

/** Витрата на одного клієнта */
export function calculateExpenditurePerClient(
  tool: ToolProcessingFormValues
): number {
  if (!tool?.clientsPerDay) {
    return 0;
  }
  return roundNumber(calculatePricePerDay(tool) / tool.clientsPerDay);
}
