import { MonthlyFinancialData } from "@/stores/financialModelStore";
import { roundUpTo2 } from "@/utils";

/** загальна кількість годин в день */
export function calculateDailyClientHours(financialData: MonthlyFinancialData) {
  return roundUpTo2(
    (financialData?.clientsNumberPerDay ?? 0) *
      (financialData?.hoursNumberPerClient ?? 0)
  );
}

/** кількість клієнтів в тиждень */
export function calculateClientsNumberPerWeek(
  financialData: MonthlyFinancialData
) {
  return roundUpTo2(
    (financialData?.workingDaysPerWeek ?? 0) *
      (financialData?.clientsNumberPerDay ?? 0)
  );
}

/** кількість клієнтів в місяць */
export function calculateClientsNumberPerMonth(
  financialData: MonthlyFinancialData
) {
  return roundUpTo2(
    (financialData?.workingDaysPerMonth ?? 0) *
      (financialData?.clientsNumberPerDay ?? 0)
  );
}

/** кількість годин в місяць */
export function calculateHoursNumberPerMonth(
  financialData: MonthlyFinancialData
) {
  return roundUpTo2(
    calculateClientsNumberPerMonth(financialData) *
      (financialData?.hoursNumberPerClient ?? 0)
  );
}
