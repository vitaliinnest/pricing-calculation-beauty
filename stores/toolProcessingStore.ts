import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { calculateExpenditurePerClient } from "@/calculators/toolProcessingCalculators";
import { roundNumber } from "@/utils";

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
  getTotalForOneClient: (discard?: boolean) => number;
}

const storage = buildStorage<ToolProcessingStore>();

const seedTools = (): ToolProcessing[] => [
  {
    id: uuidv4(),
    name: "Мистраль",
    price: 9.9,
    volume: 1000,
    expenditurePerDay: 40,
    clientsPerDay: 3,
  },
  {
    id: uuidv4(),
    name: "Актибор",
    price: 6.59,
    volume: 1000,
    expenditurePerDay: 30,
    clientsPerDay: 4,
  },
  {
    id: uuidv4(),
    name: "Проба",
    price: 4.94,
    volume: 100,
    expenditurePerDay: 5,
    clientsPerDay: 4,
  },
  {
    id: uuidv4(),
    name: "Тест-смужки",
    price: 7.06,
    volume: 100,
    expenditurePerDay: 1,
    clientsPerDay: 4,
  },
  {
    id: uuidv4(),
    name: "Індикатори",
    price: 6.47,
    volume: 500,
    expenditurePerDay: 1,
    clientsPerDay: 4,
  },
];

export const useToolProcessingStore = create<ToolProcessingStore>()(
  persist(
    (set, get) => ({
      tools: seedTools(),

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

      getTotalForOneClient: (discard) =>
        roundNumber(
          get().tools.reduce(
            (acc, tool) => acc + calculateExpenditurePerClient(tool, true),
            0
          ),
          discard
        ),
    }),
    {
      name: "tool-processing-storage",
      storage,
    }
  )
);
