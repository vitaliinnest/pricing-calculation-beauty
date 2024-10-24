import { CostPriceFormValues } from "@/stores/costPriceStore";
import { roundUpTo2 } from "@/utils";

/** Усього клієнтів */
export function calculateClientsNumber(costPrice: CostPriceFormValues): number {
  if (!costPrice?.expenditurePerClient) {
    return 0;
  }
  return roundUpTo2(costPrice.volume / costPrice.expenditurePerClient);
}

/** Ціна на одного клієнта */
export function calculatePricePerClient(
  costPrice: CostPriceFormValues
): number {
  const clientsNumber = calculateClientsNumber(costPrice);
  if (clientsNumber === 0) {
    return 0;
  }
  return roundUpTo2(costPrice.price / clientsNumber);
}
