import { MonthlyFinancialDataFormValues } from "@/stores/financialModelStore";
import { roundNumber } from "@/utils";

/** загальна кількість годин в день */
export function calculateDailyClientHours(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundNumber(
    (financialData?.clientsNumberPerDay ?? 0) *
      (financialData?.hoursNumberPerClient ?? 0)
  );
}

/** кількість клієнтів в тиждень */
export function calculateClientsNumberPerWeek(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundNumber(
    (financialData?.workingDaysPerWeek ?? 0) *
      (financialData?.clientsNumberPerDay ?? 0)
  );
}

/** кількість клієнтів в місяць */
export function calculateClientsNumberPerMonth(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundNumber(
    (financialData?.workingDaysPerMonth ?? 0) *
      (financialData?.clientsNumberPerDay ?? 0)
  );
}

/** кількість годин в місяць */
export function calculateHoursNumberPerMonth(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundNumber(
    calculateClientsNumberPerMonth(financialData) *
      (financialData?.hoursNumberPerClient ?? 0)
  );
}

/** чи виконали ви вашу мету на місяць */
export function calculateTurnoverDifference(
  financialData: MonthlyFinancialDataFormValues
) {
  return roundNumber(
    (financialData.actualMonthlyTurnover ?? 0) - (financialData.expectedMonthlyTurnover ?? 0)
  );
}
