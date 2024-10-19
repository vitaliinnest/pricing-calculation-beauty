import { ToolProcessing } from "@/stores/toolProcessingStore";
import { roundUpTo2 } from "@/utils";

/** Кількість днів */
export function calculateDaysAmount(tool: ToolProcessing): number {
  return roundUpTo2(tool.volume / tool.expenditurePerDay);
}

/** Ціна в день */
export function calculatePricePerDay(tool: ToolProcessing): number {
  return roundUpTo2(tool.price / calculateDaysAmount(tool));
}

/** Витрата на одного клієнта */
export function calculateExpenditurePerClient(tool: ToolProcessing): number {
  return roundUpTo2(calculatePricePerDay(tool) / tool.clientsPerDay);
}
