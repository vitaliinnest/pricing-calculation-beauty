import { CostPriceFormValues } from "@/stores/costPriceStore";
import { roundNumber } from "@/utils";

/** Усього клієнтів */
export function calculateClientsNumber(
  costPrice: CostPriceFormValues,
  discard?: boolean
): number {
  if (!costPrice?.expenditurePerClient) {
    return 0;
  }
  return roundNumber(
    costPrice.volume / costPrice.expenditurePerClient,
    discard
  );
}

/** Ціна на одного клієнта */
export function calculatePricePerClient(
  costPrice: CostPriceFormValues,
  discard?: boolean
): number {
  const clientsNumber = calculateClientsNumber(costPrice, true);
  if (clientsNumber === 0) {
    return 0;
  }
  return roundNumber(costPrice.price / clientsNumber, discard);
}
