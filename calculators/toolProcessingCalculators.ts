import { ToolProcessingFormValues } from "@/stores/toolProcessingStore";
import { roundUpTo2 } from "@/utils";

// todo: move to store

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

/** Сумарна ціна обробки інструментів на одного клієнта */
export function calculateTotalPricePerClient(
  tools: ToolProcessingFormValues[]
): number {
  if (!tools?.length) {
    return 0;
  }

  return tools.reduce(
    (acc, tool) => acc + calculateExpenditurePerClient(tool),
    0
  );
}
