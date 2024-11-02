import { MonthlyFinancialDataFormValues } from "@/stores/financialModelStore";
import { roundUpTo2 } from "@/utils";

/** загальна кількість годин в день */
export function calculateDailyClientHours(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundUpTo2(
    (financialData?.clientsNumberPerDay ?? 0) *
      (financialData?.hoursNumberPerClient ?? 0)
  );
}

/** кількість клієнтів в тиждень */
export function calculateClientsNumberPerWeek(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundUpTo2(
    (financialData?.workingDaysPerWeek ?? 0) *
      (financialData?.clientsNumberPerDay ?? 0)
  );
}

/** кількість клієнтів в місяць */
export function calculateClientsNumberPerMonth(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundUpTo2(
    (financialData?.workingDaysPerMonth ?? 0) *
      (financialData?.clientsNumberPerDay ?? 0)
  );
}

/** кількість годин в місяць */
export function calculateHoursNumberPerMonth(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundUpTo2(
    calculateClientsNumberPerMonth(financialData) *
      (financialData?.hoursNumberPerClient ?? 0)
  );
}

/** чи виконали ви вашу мету на місяць */
export function calculateTurnoverDifference(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundUpTo2(
    financialData.expectedMonthlyTurnover - financialData.actualMonthlyTurnover
  );
}
