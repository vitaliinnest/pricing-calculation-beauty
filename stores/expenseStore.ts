import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import "react-native-get-random-values";
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

const seedExpenses = (): Expense[] => [
  {
    id: uuidv4(),
    name: "Персонал",
    priceMap: {
      [Month.January]: 1.0,
      [Month.February]: 1.1,
      [Month.March]: 0.9,
      [Month.April]: 1.3,
      [Month.May]: 1.0,
      [Month.June]: 0.8,
      [Month.July]: 1.2,
      [Month.August]: 1.1,
      [Month.September]: 1.0,
      [Month.October]: 0.9,
      [Month.November]: 1.1,
      [Month.December]: 1.4,
    },
  },
  {
    id: uuidv4(),
    name: "Оренда",
    priceMap: {
      [Month.January]: 115.0,
      [Month.February]: 120.0,
      [Month.March]: 110.0,
      [Month.April]: 125.0,
      [Month.May]: 117.0,
      [Month.June]: 112.0,
      [Month.July]: 130.0,
      [Month.August]: 118.0,
      [Month.September]: 115.0,
      [Month.October]: 120.0,
      [Month.November]: 113.0,
      [Month.December]: 128.0,
    },
  },
  {
    id: uuidv4(),
    name: "Реклама",
    priceMap: {
      [Month.January]: 50.0,
      [Month.February]: 45.0,
      [Month.March]: 55.0,
      [Month.April]: 60.0,
      [Month.May]: 50.0,
      [Month.June]: 48.0,
      [Month.July]: 53.0,
      [Month.August]: 47.0,
      [Month.September]: 55.0,
      [Month.October]: 58.0,
      [Month.November]: 49.0,
      [Month.December]: 61.0,
    },
  },
  {
    id: uuidv4(),
    name: "Транспортні витрати",
    priceMap: {
      [Month.January]: 7.4,
      [Month.February]: 8.0,
      [Month.March]: 6.8,
      [Month.April]: 7.6,
      [Month.May]: 7.5,
      [Month.June]: 8.2,
      [Month.July]: 7.1,
      [Month.August]: 6.9,
      [Month.September]: 7.8,
      [Month.October]: 7.4,
      [Month.November]: 8.0,
      [Month.December]: 7.9,
    },
  },
  {
    id: uuidv4(),
    name: "Телефон та Інтернет",
    priceMap: {
      [Month.January]: 29.0,
      [Month.February]: 27.0,
      [Month.March]: 31.0,
      [Month.April]: 33.0,
      [Month.May]: 29.0,
      [Month.June]: 30.0,
      [Month.July]: 32.0,
      [Month.August]: 28.0,
      [Month.September]: 30.0,
      [Month.October]: 34.0,
      [Month.November]: 29.0,
      [Month.December]: 35.0,
    },
  },
  {
    id: uuidv4(),
    name: "Офісні витрати",
    priceMap: {
      [Month.January]: 5.0,
      [Month.February]: 4.0,
      [Month.March]: 6.0,
      [Month.April]: 7.0,
      [Month.May]: 5.5,
      [Month.June]: 4.8,
      [Month.July]: 6.5,
      [Month.August]: 4.5,
      [Month.September]: 6.0,
      [Month.October]: 5.2,
      [Month.November]: 4.7,
      [Month.December]: 6.3,
    },
  },
  {
    id: uuidv4(),
    name: "Податковий консультант",
    priceMap: {
      [Month.January]: 50.0,
      [Month.February]: 60.0,
      [Month.March]: 55.0,
      [Month.April]: 45.0,
      [Month.May]: 50.0,
      [Month.June]: 48.0,
      [Month.July]: 52.0,
      [Month.August]: 50.0,
      [Month.September]: 58.0,
      [Month.October]: 47.0,
      [Month.November]: 60.0,
      [Month.December]: 45.0,
    },
  },
  {
    id: uuidv4(),
    name: "Господарські потреби",
    priceMap: {
      [Month.January]: 10.0,
      [Month.February]: 12.0,
      [Month.March]: 9.0,
      [Month.April]: 11.0,
      [Month.May]: 10.5,
      [Month.June]: 9.5,
      [Month.July]: 13.0,
      [Month.August]: 10.0,
      [Month.September]: 12.5,
      [Month.October]: 10.0,
      [Month.November]: 9.8,
      [Month.December]: 11.0,
    },
  },
  {
    id: uuidv4(),
    name: "Інше",
    priceMap: {
      [Month.January]: 50.0,
      [Month.February]: 45.0,
      [Month.March]: 55.0,
      [Month.April]: 60.0,
      [Month.May]: 50.0,
      [Month.June]: 52.0,
      [Month.July]: 53.0,
      [Month.August]: 48.0,
      [Month.September]: 55.0,
      [Month.October]: 49.0,
      [Month.November]: 60.0,
      [Month.December]: 45.0,
    },
  },
  {
    id: uuidv4(),
    name: "Навчання",
    priceMap: {
      [Month.January]: 250.0,
      [Month.February]: 230.0,
      [Month.March]: 260.0,
      [Month.April]: 240.0,
      [Month.May]: 255.0,
      [Month.June]: 245.0,
      [Month.July]: 265.0,
      [Month.August]: 250.0,
      [Month.September]: 270.0,
      [Month.October]: 235.0,
      [Month.November]: 250.0,
      [Month.December]: 280.0,
    },
  },
  {
    id: uuidv4(),
    name: "Знижки",
    priceMap: {
      [Month.January]: 10.0,
      [Month.February]: 12.0,
      [Month.March]: 8.0,
      [Month.April]: 11.0,
      [Month.May]: 10.0,
      [Month.June]: 9.0,
      [Month.July]: 13.0,
      [Month.August]: 11.0,
      [Month.September]: 12.0,
      [Month.October]: 9.5,
      [Month.November]: 10.5,
      [Month.December]: 12.5,
    },
  },
];

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: seedExpenses(),

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
