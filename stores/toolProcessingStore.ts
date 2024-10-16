import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";

interface ToolProcessing {
  id: string;
  price: number; // вартість / Preis
  volume: number; // обсяг / Volumen
  expenditurePerDay: number; // витрати на день / Verbrauch pro Tag
  clientsPerDay: number; // кількість клієнтів на день / Kundenzahl oro Tag
}

interface ToolProcessingStore {
  tools: ToolProcessing[];
  addTool: (tool: ToolProcessing) => void;
  updateTool: (id: string, updatedTool: Partial<ToolProcessing>) => void;
  deleteTool: (id: string) => void;
  getToolById: (id: string) => ToolProcessing | undefined;
  setTools: (tools: ToolProcessing[]) => void;
}

const storage = buildStorage<ToolProcessingStore>();

export const useToolProcessingStore = create<ToolProcessingStore>()(
  persist(
    (set, get) => ({
      tools: [],

      addTool: (tool) => set((state) => ({ tools: [...state.tools, tool] })),

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