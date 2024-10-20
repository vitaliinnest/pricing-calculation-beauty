import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import { v4 as uuidv4 } from 'uuid';

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
  setTools: (tools: ToolProcessing[]) => void;
}

const storage = buildStorage<ToolProcessingStore>();

export const useToolProcessingStore = create<ToolProcessingStore>()(
  persist(
    (set, get) => ({
      tools: [],

      addTool: (tool) => {
        console.log(tool);
        // const newTool = { ...tool, id: uuidv4() };
        // return set((state) => ({ tools: [...state.tools, newTool] }));
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

      setTools: (tools) => set(() => ({ tools })),
    }),
    {
      name: "tool-processing-storage",
      storage: storage,
    }
  )
);
