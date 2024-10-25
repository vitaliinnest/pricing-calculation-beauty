import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import { v4 as uuidv4 } from "uuid";

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
            expense.id === id
              ? { ...expense, ...updatedExpense }
              : expense
          ),
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter(
            (expense) => expense.id !== id
          ),
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
