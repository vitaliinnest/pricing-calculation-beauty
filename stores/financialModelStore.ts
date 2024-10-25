export enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const MonthMap: Record<Month, string> = {
  [Month.January]: "Січень",
  [Month.February]: "Лютий",
  [Month.March]: "Березень",
  [Month.April]: "Квітень",
  [Month.May]: "Травень",
  [Month.June]: "Червень",
  [Month.July]: "Липень",
  [Month.August]: "Серпень",
  [Month.September]: "Вересень",
  [Month.October]: "Жовтень",
  [Month.November]: "Листопад",
  [Month.December]: "Грудень",
};

export interface MonthlyFinancialData {
  id: string;
  month: Month;
  workingDaysPerMonth: number; // рабочі дні в місяць
  workingDaysPerWeek: number; // рабочі дні в тиждень
  clientsNumberPerDay: number; // кількість клієнтів на день
  hoursPerClient: number; // кількість годин на одного клієнта
}
