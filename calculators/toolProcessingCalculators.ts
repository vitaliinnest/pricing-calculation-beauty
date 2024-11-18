import { ToolProcessingFormValues } from "@/stores/toolProcessingStore";
import { roundNumber } from "@/utils";

/** Кількість днів */
export function calculateDaysAmount(
  tool: ToolProcessingFormValues,
  discard?: boolean
): number {
  if (!tool?.expenditurePerDay) {
    return 0;
  }
  return roundNumber(tool.volume / tool.expenditurePerDay, discard);
}

/** Ціна в день */
export function calculatePricePerDay(
  tool: ToolProcessingFormValues,
  discard?: boolean
): number {
  const daysAmount = calculateDaysAmount(tool, true);
  if (daysAmount === 0) {
    return 0;
  }
  return roundNumber(tool.price / daysAmount, discard);
}

/** Витрата на одного клієнта */
export function calculateExpenditurePerClient(
  tool: ToolProcessingFormValues,
  discard?: boolean
): number {
  if (!tool?.clientsPerDay) {
    return 0;
  }
  return roundNumber(calculatePricePerDay(tool, true) / tool.clientsPerDay, discard);
}
