import { PriceFormationFormValues } from "@/stores/priceFormationStore";

export function calculateClientsNumberPerMonth(
  priceFormation: PriceFormationFormValues
): number {
  return (
    priceFormation.clientsNumberPerDay * priceFormation.workingDaysPerMonth
  );
}

// Необхідний оборот за один день
export function calculateDailyTurnover(
  priceFormation: PriceFormationFormValues
): number {
  if (priceFormation.workingDaysPerMonth === 0) {
    return 0;
  }

  return (
    priceFormation.expectedMonthlyTurnover / priceFormation.workingDaysPerMonth
  );
}

// Ваш запланований оборот на день, виходячи з кількості робочих днів на місяць
export function calculatePlannedDailyTurnover(
  priceFormation: PriceFormationFormValues
): number {
  return priceFormation.servicePrice * priceFormation.clientsNumberPerDay;
}

// Ваш планируемый оборот в месяц  исходя из количества рабочих дней в месяц
export function calculatePlannedMonthlyTurnover(
  priceFormation: PriceFormationFormValues
): number {
  return (
    priceFormation.workingDaysPerMonth *
    calculatePlannedDailyTurnover(priceFormation)
  );
}
