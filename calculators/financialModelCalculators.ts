import { MonthlyFinancialDataFormValues } from "@/stores/financialModelStore";
import { roundNumber } from "@/utils";

/** загальна кількість годин в день */
export function calculateDailyClientHours(
  financialData: MonthlyFinancialDataFormValues,
  discard?: boolean
) {
  return roundNumber(
    (financialData?.clientsNumberPerDay ?? 0) *
      (financialData?.hoursNumberPerClient ?? 0),
    discard
  );
}

/** кількість клієнтів в тиждень */
export function calculateClientsNumberPerWeek(
  financialData: MonthlyFinancialDataFormValues,
  discard?: boolean
) {
  return roundNumber(
    (financialData?.workingDaysPerWeek ?? 0) *
      (financialData?.clientsNumberPerDay ?? 0),
    discard
  );
}

/** кількість клієнтів в місяць */
export function calculateClientsNumberPerMonth(
  financialData: MonthlyFinancialDataFormValues,
  discard?: boolean
) {
  return roundNumber(
    (financialData?.workingDaysPerMonth ?? 0) *
      (financialData?.clientsNumberPerDay ?? 0),
    discard
  );
}

/** кількість годин в місяць */
export function calculateHoursNumberPerMonth(
  financialData: MonthlyFinancialDataFormValues,
  discard?: boolean
) {
  return roundNumber(
    calculateClientsNumberPerMonth(financialData, true) *
      (financialData?.hoursNumberPerClient ?? 0),
    discard
  );
}

/** чи виконали ви вашу мету на місяць */
export function calculateTurnoverDifference(
  financialData: MonthlyFinancialDataFormValues,
  discard?: boolean
) {
  return roundNumber(
    (financialData.actualMonthlyTurnover ?? 0) -
      (financialData.expectedMonthlyTurnover ?? 0),
    discard
  );
}
