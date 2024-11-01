import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import { v4 as uuidv4 } from "uuid";
import { Month } from "./common";

export interface Expense {
  id: string;
  name: string; // назва
  priceMap: Record<Month, number>; // ціни за місяці
}

export type ExpenseFormValues = Omit<Expense, "id">;

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: ExpenseFormValues) => void;
  updateExpense: (id: string, updatedExpense: ExpenseFormValues) => void;
  updateExpensesPrices: (
    month: Month,
    priceMap: Record<string, number>
  ) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
}

const storage = buildStorage<ExpenseStore>();

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],

      addExpense: (expense) => {
        const newExpense = {
          ...expense,
          id: uuidv4(),
          priceMap: ensureAllMonths(expense.priceMap),
        };

        return set((state) => ({
          expenses: [...state.expenses, newExpense],
        }));
      },

      updateExpense: (id, updatedExpense) =>
        set((state) => {
          const refinedExpense = {
            ...updatedExpense,
            priceMap: ensureAllMonths(updatedExpense.priceMap),
          };
          return {
            expenses: state.expenses.map((expense) =>
              expense.id === id ? { ...expense, ...refinedExpense } : expense
            ),
          };
        }),

      updateExpensesPrices: (month, priceMap) =>
        set((state) => ({
          expenses: state.expenses.map((expense) => ({
            ...expense,
            priceMap: {
              ...expense.priceMap,
              [month]: priceMap[expense.id],
            },
          })),
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),

      getExpenseById: (id) =>
        get().expenses.find((expense) => expense.id === id),
    }),
    {
      name: "expense-storage",
      storage,
    }
  )
);

const ensureAllMonths = (priceMap: Record<Month, number>) => {
  const updatedPriceMap: Record<Month, number> = { ...priceMap };
  Object.values(Month).forEach((month) => {
    if (typeof month === "number" && !(month in updatedPriceMap)) {
      updatedPriceMap[month] = 0;
    }
  });
  return updatedPriceMap;
};
