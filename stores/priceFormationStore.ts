import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";

export interface PriceFormation {
  // Прибыль с клиента
  clientProfit: number;
  // Желаемый оборот в месяц
  expectedMonthlyTurnover: number;
  // Цена вашей услуги
  servicePrice: number;
  // Количество рабочих дней в месяц
  workingDaysPerMonth: number;
  // Количество клиентов день
  clientsNumberPerDay: number;
}

export type PriceFormationFormValues = Omit<PriceFormation, "id">;

interface PriceFormationStore {
  priceFormation: PriceFormation;
  updatePriceFormation: (
    updatedPriceFormation: PriceFormationFormValues
  ) => void;
}

const storage = buildStorage<PriceFormationStore>();

export const usePriceFormationStore = create<PriceFormationStore>()(
  persist(
    (set, get) => ({
      priceFormation: {
        clientProfit: 0,
        price: 0,
        expectedMonthlyTurnover: 0,
        servicePrice: 0,
        workingDaysPerMonth: 0,
        clientsNumberPerDay: 0,
      },

      updatePriceFormation: (updatedPriceFormation) =>
        set(() => ({
          priceFormation: {
            ...updatedPriceFormation,
          },
        })),
    }),
    {
      name: "price-formation-storage",
      storage,
    }
  )
);
