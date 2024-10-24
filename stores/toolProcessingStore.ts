import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import { v4 as uuidv4 } from "uuid";
import { calculateExpenditurePerClient } from "@/calculators/toolProcessingCalculators";
import { roundUpTo2 } from "@/utils";

export interface ToolProcessing {
  id: string;
  name: string; // назва
  price: number; // вартість
  volume: number; // обсяг
  expenditurePerDay: number; // витрати на день
  clientsPerDay: number; // кількість клієнтів на день
}

export type ToolProcessingFormValues = Omit<ToolProcessing, "id">;

interface ToolProcessingStore {
  tools: ToolProcessing[];
  addTool: (tool: ToolProcessingFormValues) => void;
  updateTool: (id: string, updatedTool: ToolProcessingFormValues) => void;
  deleteTool: (id: string) => void;
  getToolById: (id: string) => ToolProcessing | undefined;
  getTotalForOneClient: () => number;
}

const storage = buildStorage<ToolProcessingStore>();

export const useToolProcessingStore = create<ToolProcessingStore>()(
  persist(
    (set, get) => ({
      tools: [],

      addTool: (tool) => {
        const newTool = { ...tool, id: uuidv4() };
        return set((state) => ({ tools: [...state.tools, newTool] }));
      },

      updateTool: (id, updatedTool) =>
        set((state) => ({
          tools: state.tools.map((tool) =>
            tool.id === id ? { ...tool, ...updatedTool } : tool
          ),
        })),

      deleteTool: (id) =>
        set((state) => ({
          tools: state.tools.filter((tool) => tool.id !== id),
        })),

      getToolById: (id) => get().tools.find((tool) => tool.id === id),

      getTotalForOneClient: () =>
        roundUpTo2(
          get().tools.reduce(
            (acc, tool) => acc + calculateExpenditurePerClient(tool),
            0
          )
        ),
    }),
    {
      name: "tool-processing-storage",
      storage: storage,
    }
  )
);
