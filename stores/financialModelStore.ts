import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import { v4 as uuidv4 } from "uuid";

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

export type MonthlyFinancialDataFormValues = Omit<MonthlyFinancialData, "id">;

interface FinancialModelStore {
  financialData: MonthlyFinancialData[];
  addFinancialData: (financialData: MonthlyFinancialDataFormValues) => void;
  updateFinancialData: (
    id: string,
    updatedFinancialData: MonthlyFinancialDataFormValues
  ) => void;
  deleteFinancialData: (id: string) => void;
  getFinancialDataById: (id: string) => MonthlyFinancialData | undefined;
}

const storage = buildStorage<FinancialModelStore>();

export const useFinancialModelStore = create<FinancialModelStore>()(
  persist(
    (set, get) => ({
      financialData: [],

      addFinancialData: (financialData) => {
        const newFinancialData = { ...financialData, id: uuidv4() };
        return set((state) => ({
          financialData: [...state.financialData, newFinancialData],
        }));
      },

      updateFinancialData: (id, updatedFinancialData) =>
        set((state) => ({
          financialData: state.financialData.map((financialData) =>
            financialData.id === id
              ? { ...financialData, ...updatedFinancialData }
              : financialData
          ),
        })),

      deleteFinancialData: (id) =>
        set((state) => ({
          financialData: state.financialData.filter(
            (financialData) => financialData.id !== id
          ),
        })),

      getFinancialDataById: (id) =>
        get().financialData.find((financialData) => financialData.id === id),
    }),
    {
      name: "financial-model-storage",
      storage,
    }
  )
);
