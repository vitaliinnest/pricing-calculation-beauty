import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { roundNumber } from "@/utils";
import {
  calculateClientsNumberPerMonth,
  calculateClientsNumberPerWeek,
  calculateDailyClientHours,
  calculateHoursNumberPerMonth,
} from "@/calculators/financialModelCalculators";
import { useCostPriceStore } from "./costPriceStore";
import { mapExpenses, Month } from "./common";
import { MonthlyFinancialDataWithExpenses } from "@/components/pages/MonthlyFinancialDataDetailsPage";
import { useExpenseStore } from "./expenseStore";

export interface MonthlyFinancialData {
  id: string;
  month: Month;
  workingDaysPerMonth: number | undefined; // рабочі дні в місяць
  workingDaysPerWeek: number | undefined; // рабочі дні в тиждень
  clientsNumberPerDay: number | undefined; // кількість клієнтів на день
  hoursNumberPerClient: number | undefined; // кількість годин на одного клієнта
  expectedMonthlyTurnover: number;
  actualMonthlyTurnover: number;
}

export type MonthlyFinancialDataFormValues = Omit<MonthlyFinancialData, "id">;

interface FinancialModelStore {
  financialData: MonthlyFinancialData[];
  updateFinancialData: (
    id: string,
    updatedFinancialData: MonthlyFinancialDataFormValues
  ) => void;
  getFinancialDataById: (id: string) => MonthlyFinancialData | undefined;

  calculateTotalWorkingDays: () => number;
  calculateAverageWorkingDaysPerWeek: () => number;
  calculateAverageClientsNumberPerDay: () => number;
  calculateAverageHoursNumberPerClient: () => number;

  calculateAverageDailyClientHours: () => number;
  calculateAverageClientsNumberPerWeek: () => number;
  calculateTotalClientsNumberPerMonth: () => number;
  calculateTotalMonthlyClientHours: () => number;

  // себестоимость материала
  calculateMonthlyCostPrice: (data: MonthlyFinancialDataFormValues) => number;
  calculateAverageMonthlyCostPrice: () => number;
  calculateTotalMonthlyCostPrice: () => number;

  // итого расходы
  calculateTotalExpenses: (data: MonthlyFinancialDataWithExpenses) => number;
  calculateTotalExpensesPerClient: (
    data: MonthlyFinancialDataWithExpenses
  ) => number;
  calculateTotalDailyExpenses: (
    data: MonthlyFinancialDataWithExpenses
  ) => number;
  calculateTotalHourlyExpenses: (
    data: MonthlyFinancialDataWithExpenses
  ) => number;

  // орієнтований прибуток
  calculateExpectedMonthlyProfit: (
    data: MonthlyFinancialDataWithExpenses
  ) => number;

  calculateYearlyExpectedProfit: () => number;
  calculateYearlyTotalExpenses: () => number;
  calculateAverageYearlyExpensesPerClient: () => number;
  calculateAverageYearlyExpensesPerDay: () => number;
  calculateAverageYearlyExpensesPerHour: () => number;
}

const storage = buildStorage<FinancialModelStore>();

const seedFinancialData = (): MonthlyFinancialData[] => [
  {
    id: uuidv4(),
    month: Month.January,
    workingDaysPerMonth: 22,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.3,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2650,
    actualMonthlyTurnover: 2800,
  },
  {
    id: uuidv4(),
    month: Month.February,
    workingDaysPerMonth: 20,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.3,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.March,
    workingDaysPerMonth: 22,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.3,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.April,
    workingDaysPerMonth: 21,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.4,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.May,
    workingDaysPerMonth: 22,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.5,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.June,
    workingDaysPerMonth: 21,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.3,
    hoursNumberPerClient: 2.5,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.July,
    workingDaysPerMonth: 23,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.4,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.August,
    workingDaysPerMonth: 22,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.3,
    hoursNumberPerClient: 2.3,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.September,
    workingDaysPerMonth: 21,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.5,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.October,
    workingDaysPerMonth: 22,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.4,
    hoursNumberPerClient: 2.5,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.November,
    workingDaysPerMonth: 21,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.3,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
  {
    id: uuidv4(),
    month: Month.December,
    workingDaysPerMonth: 23,
    workingDaysPerWeek: 5,
    clientsNumberPerDay: 0.6,
    hoursNumberPerClient: 2,
    expectedMonthlyTurnover: 2500,
    actualMonthlyTurnover: 2550,
  },
];

export const useFinancialModelStore = create<FinancialModelStore>()(
  persist(
    (set, get) => ({
      financialData: seedFinancialData(),

      updateFinancialData: (id, updatedFinancialData) =>
        set((state) => ({
          financialData: state.financialData.map((financialData) =>
            financialData.id === id
              ? { ...financialData, ...updatedFinancialData }
              : financialData
          ),
        })),

      getFinancialDataById: (id) =>
        get().financialData.find((financialData) => financialData.id === id),

      calculateTotalWorkingDays: () =>
        roundNumber(
          get()
            .financialData.filter(
              (financialData) => financialData.workingDaysPerMonth !== undefined
            )
            .reduce(
              (acc, financialData) => acc + financialData.workingDaysPerMonth!,
              0
            )
        ),

      calculateAverageWorkingDaysPerWeek: () => {
        const financialData = get().financialData;
        return roundNumber(
          financialData
            .filter(
              (financialData) => financialData.workingDaysPerWeek !== undefined
            )
            .reduce(
              (acc, financialData) => acc + financialData.workingDaysPerWeek!,
              0
            ) / financialData.length
        );
      },

      calculateAverageClientsNumberPerDay: () => {
        const financialData = get().financialData;
        return roundNumber(
          financialData
            .filter(
              (financialData) => financialData.clientsNumberPerDay !== undefined
            )
            .reduce(
              (acc, financialData) => acc + financialData.clientsNumberPerDay!,
              0
            ) / financialData.length
        );
      },

      calculateAverageHoursNumberPerClient: () => {
        const financialData = get().financialData;
        return roundNumber(
          financialData
            .filter(
              (financialData) =>
                financialData.hoursNumberPerClient !== undefined
            )
            .reduce(
              (acc, financialData) => acc + financialData.hoursNumberPerClient!,
              0
            ) / financialData.length
        );
      },

      calculateAverageDailyClientHours: () =>
        roundNumber(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + calculateDailyClientHours(financialData),
            0
          ) / get().financialData.length
        ),

      calculateAverageClientsNumberPerWeek: () =>
        roundNumber(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + calculateClientsNumberPerWeek(financialData),
            0
          ) / get().financialData.length
        ),

      calculateTotalClientsNumberPerMonth: () =>
        roundNumber(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + calculateClientsNumberPerMonth(financialData),
            0
          )
        ),

      calculateTotalMonthlyClientHours: () =>
        roundNumber(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + calculateHoursNumberPerMonth(financialData),
            0
          )
        ),

      calculateMonthlyCostPrice: (data: MonthlyFinancialDataFormValues) => {
        const totalCostForOneClient = useCostPriceStore
          .getState()
          .calculateTotalForOneClient(true);
        return roundNumber(
          calculateClientsNumberPerMonth(data) * totalCostForOneClient
        );
      },

      calculateAverageMonthlyCostPrice: () => {
        const financialData = get().financialData;
        return roundNumber(
          financialData.reduce(
            (acc, financialData) =>
              acc + get().calculateMonthlyCostPrice(financialData),
            0
          ) / financialData.length
        );
      },

      calculateTotalMonthlyCostPrice: () =>
        roundNumber(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + get().calculateMonthlyCostPrice(financialData),
            0
          )
        ),

      calculateTotalExpenses: (data: MonthlyFinancialDataWithExpenses) => {
        return roundNumber(
          Object.values(data.expensesMap).reduce((acc, price) => acc + price, 0)
        );
      },

      calculateTotalExpensesPerClient: (
        data: MonthlyFinancialDataWithExpenses
      ) => {
        const clientsNumberPerMonth = calculateClientsNumberPerMonth(data);
        if (!clientsNumberPerMonth) {
          return 0;
        }
        return roundNumber(
          get().calculateTotalExpenses(data) / clientsNumberPerMonth
        );
      },

      calculateTotalDailyExpenses: (data: MonthlyFinancialDataWithExpenses) => {
        if (!data?.workingDaysPerMonth) {
          return 0;
        }
        return roundNumber(
          get().calculateTotalExpenses(data) / data.workingDaysPerMonth
        );
      },

      calculateTotalHourlyExpenses: (
        data: MonthlyFinancialDataWithExpenses
      ) => {
        const hoursNumberPerMonth = calculateHoursNumberPerMonth(data);
        if (!hoursNumberPerMonth) {
          return 0;
        }
        return roundNumber(
          get().calculateTotalExpenses(data) / hoursNumberPerMonth
        );
      },

      calculateExpectedMonthlyProfit: (
        data: MonthlyFinancialDataWithExpenses
      ) =>
        roundNumber(
          (data.actualMonthlyTurnover ?? 0) -
            get().calculateTotalExpenses(data) -
            get().calculateMonthlyCostPrice(data)
        ),

      calculateYearlyExpectedProfit: () => {
        const expenses = useExpenseStore.getState().expenses;
        return roundNumber(
          get().financialData.reduce(
            (acc, financialData) =>
              acc +
              get().calculateExpectedMonthlyProfit({
                ...financialData,
                expensesMap: mapExpenses(expenses, financialData),
              }),
            0
          )
        );
      },

      calculateYearlyTotalExpenses: () => {
        const expenses = useExpenseStore.getState().expenses;
        return roundNumber(
          get().financialData.reduce(
            (acc, financialData) =>
              acc +
              get().calculateTotalExpenses({
                ...financialData,
                expensesMap: mapExpenses(expenses, financialData),
              }),
            0
          )
        );
      },

      calculateAverageYearlyExpensesPerClient: () => {
        const expenses = useExpenseStore.getState().expenses;
        const expensesPerClientArr = get()
          .financialData.map((d) =>
            get().calculateTotalExpensesPerClient({
              ...d,
              expensesMap: mapExpenses(expenses, d),
            })
          )
          .filter((ex) => ex > 0);

        if (expensesPerClientArr.length === 0) {
          return 0;
        }

        return roundNumber(
          expensesPerClientArr.reduce((acc, ex) => acc + ex, 0) /
            expensesPerClientArr.length
        );
      },

      calculateAverageYearlyExpensesPerDay: () => {
        const expenses = useExpenseStore.getState().expenses;
        const dailyExpensesArr = get()
          .financialData.map((d) =>
            get().calculateTotalDailyExpenses({
              ...d,
              expensesMap: mapExpenses(expenses, d),
            })
          )
          .filter((ex) => ex > 0);

        if (dailyExpensesArr.length === 0) {
          return 0;
        }

        return roundNumber(
          dailyExpensesArr.reduce((acc, ex) => acc + ex, 0) /
            dailyExpensesArr.length
        );
      },

      calculateAverageYearlyExpensesPerHour: () => {
        const expenses = useExpenseStore.getState().expenses;
        const hourlyExpensesArr = get()
          .financialData.map((d) =>
            get().calculateTotalHourlyExpenses({
              ...d,
              expensesMap: mapExpenses(expenses, d),
            })
          )
          .filter((ex) => ex > 0);

        if (hourlyExpensesArr.length === 0) {
          return 0;
        }

        return roundNumber(
          hourlyExpensesArr.reduce((acc, ex) => acc + ex, 0) /
            hourlyExpensesArr.length
        );
      },
    }),
    {
      name: "financial-model-storage",
      storage,
    }
  )
);
