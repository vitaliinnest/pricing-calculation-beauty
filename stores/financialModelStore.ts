import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import { v4 as uuidv4 } from "uuid";
import { roundUpTo2 } from "@/utils";
import {
  calculateClientsNumberPerMonth,
  calculateClientsNumberPerWeek,
  calculateDailyClientHours,
  calculateHoursNumberPerMonth,
} from "@/calculators/financialModelCalculators";
import { useCostPriceStore } from "./costPriceStore";
import { Month } from "./common";
import { MonthlyFinancialDataWithExpenses } from "@/components/pages/MonthlyFinancialDataDetailsPage";

export interface MonthlyFinancialData {
  id: string;
  month: Month;
  workingDaysPerMonth: number | undefined; // рабочі дні в місяць
  workingDaysPerWeek: number | undefined; // рабочі дні в тиждень
  clientsNumberPerDay: number | undefined; // кількість клієнтів на день
  hoursNumberPerClient: number | undefined; // кількість годин на одного клієнта
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

  calculateMonthlyCostPrice: (data: MonthlyFinancialDataFormValues) => number; // Себестоимость материала
  calculateAverageMonthlyCostPrice: () => number;

  calculateTotalExpenses: (data: MonthlyFinancialDataWithExpenses) => number; // итого расходы
  calculateTotalExpensesPerClient: (
    data: MonthlyFinancialDataWithExpenses
  ) => number;
  calculateTotalDailyExpenses: (
    data: MonthlyFinancialDataWithExpenses
  ) => number;
  calculateTotalHourlyExpenses: (
    data: MonthlyFinancialDataWithExpenses
  ) => number;
}

const storage = buildStorage<FinancialModelStore>();

const initializeFinancialData = (): MonthlyFinancialData[] =>
  Object.values(Month)
    .filter((value) => typeof value === "number")
    .map<MonthlyFinancialData>((month) => ({
      id: uuidv4(),
      month: month as Month,
      workingDaysPerMonth: undefined,
      workingDaysPerWeek: undefined,
      clientsNumberPerDay: undefined,
      hoursNumberPerClient: undefined,
    }));

export const useFinancialModelStore = create<FinancialModelStore>()(
  persist(
    (set, get) => ({
      financialData: initializeFinancialData(),

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
        roundUpTo2(
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
        return roundUpTo2(
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
        return roundUpTo2(
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
        return roundUpTo2(
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
        roundUpTo2(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + calculateDailyClientHours(financialData),
            0
          ) / get().financialData.length
        ),

      calculateAverageClientsNumberPerWeek: () =>
        roundUpTo2(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + calculateClientsNumberPerWeek(financialData),
            0
          ) / get().financialData.length
        ),

      calculateTotalClientsNumberPerMonth: () =>
        roundUpTo2(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + calculateClientsNumberPerMonth(financialData),
            0
          )
        ),

      calculateTotalMonthlyClientHours: () =>
        roundUpTo2(
          get().financialData.reduce(
            (acc, financialData) =>
              acc + calculateHoursNumberPerMonth(financialData),
            0
          )
        ),

      calculateMonthlyCostPrice: (data: MonthlyFinancialDataFormValues) => {
        const totalCostForOneClient = useCostPriceStore
          .getState()
          .calculateTotalForOneClient();
        return roundUpTo2(
          calculateClientsNumberPerMonth(data) * totalCostForOneClient
        );
      },

      calculateAverageMonthlyCostPrice: () => {
        const financialData = get().financialData;
        return roundUpTo2(
          financialData.reduce(
            (acc, financialData) =>
              acc + get().calculateMonthlyCostPrice(financialData),
            0
          ) / financialData.length
        );
      },

      calculateTotalExpenses: (data: MonthlyFinancialDataWithExpenses) => {
        return roundUpTo2(
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
        return roundUpTo2(
          get().calculateTotalExpenses(data) / clientsNumberPerMonth
        );
      },

      calculateTotalDailyExpenses: (data: MonthlyFinancialDataWithExpenses) => {
        if (!data?.workingDaysPerMonth) {
          return 0;
        }
        return roundUpTo2(
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
        return roundUpTo2(
          get().calculateTotalExpenses(data) / hoursNumberPerMonth
        );
      },
    }),
    {
      name: "financial-model-storage",
      storage,
    }
  )
);
