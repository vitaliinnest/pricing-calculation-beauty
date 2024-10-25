import { MonthlyFinancialData } from "@/stores/financialModelStore";
import { roundUpTo2 } from "@/utils";

/** загальна кількість годин в день */
export function calculateDailyClientHours(financialData: MonthlyFinancialData) {
  return roundUpTo2(
    financialData.clientsNumberPerDay * financialData.hoursPerClient
  );
}

/** кількість клієнтів в тиждень */
export function calculateClientsNumberPerWeek(
  financialData: MonthlyFinancialData
) {
  return roundUpTo2(
    financialData.workingDaysPerWeek * financialData.clientsNumberPerDay
  );
}

/** кількість клієнтів в місяць */
export function calculateClientsNumberPerMonth(
  financialData: MonthlyFinancialData
) {
  return roundUpTo2(
    financialData.workingDaysPerMonth * financialData.clientsNumberPerDay
  );
}

/** кількість годин в місяць */
export function calculateMonthlyClientHours(
  financialData: MonthlyFinancialData
) {
  return roundUpTo2(
    calculateClientsNumberPerMonth(financialData) * financialData.hoursPerClient
  );
}
