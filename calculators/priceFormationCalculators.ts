import { PriceFormationFormValues } from "@/stores/priceFormationStore";
import { roundNumber } from "@/utils";

export function calculateClientsNumberPerMonth(
  priceFormation: PriceFormationFormValues,
  discard?: boolean
): number {
  return roundNumber(
    priceFormation.clientsNumberPerDay * priceFormation.workingDaysPerMonth,
    discard
  );
}

// Необхідний оборот за один день
export function calculateDailyTurnover(
  priceFormation: PriceFormationFormValues,
  discard?: boolean
): number {
  if (priceFormation.workingDaysPerMonth === 0) {
    return 0;
  }

  return roundNumber(
    priceFormation.expectedMonthlyTurnover / priceFormation.workingDaysPerMonth,
    discard
  );
}

// Ваш запланований оборот на день, виходячи з кількості робочих днів на місяць
export function calculatePlannedDailyTurnover(
  priceFormation: PriceFormationFormValues,
  discard?: boolean
): number {
  return roundNumber(
    priceFormation.servicePrice * priceFormation.clientsNumberPerDay,
    discard
  );
}

// Ваш планируемый оборот в месяц  исходя из количества рабочих дней в месяц
export function calculatePlannedMonthlyTurnover(
  priceFormation: PriceFormationFormValues,
  discard?: boolean
): number {
  return roundNumber(
    priceFormation.workingDaysPerMonth *
      calculatePlannedDailyTurnover(priceFormation, true),
    discard
  );
}
