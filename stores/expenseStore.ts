import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import { v4 as uuidv4 } from "uuid";
import { useFinancialModelStore } from "./financialModelStore";

export interface Expense {
  id: string;
  name: string; // назва
}

export type ExpenseFormValues = Omit<Expense, "id">;

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: ExpenseFormValues) => void;
  updateExpense: (id: string, updatedExpense: ExpenseFormValues) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
  // порахувати середню ціню за всі місяці
  computeTotalYearlyExpense: (id: string) => number;
}

const storage = buildStorage<ExpenseStore>();

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],

      addExpense: (expense) => {
        const newExpense = { ...expense, id: uuidv4() };
        return set((state) => ({
          expenses: [...state.expenses, newExpense],
        }));
      },

      updateExpense: (id, updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedExpense } : expense
          ),
        })),

      deleteExpense: (id) => {
        useFinancialModelStore.getState().deleteExpense(id);
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },

      getExpenseById: (id) =>
        get().expenses.find((expense) => expense.id === id),

      computeTotalYearlyExpense: (id) => {
        return useFinancialModelStore
          .getState()
          .financialData.reduce(
            (acc, data) => acc + (data.expensesMap[id] ?? 0),
            0
          );
      },
    }),
    {
      name: "expense-storage",
      storage,
    }
  )
);
