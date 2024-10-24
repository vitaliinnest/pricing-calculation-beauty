import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import { v4 as uuidv4 } from "uuid";
import { calculatePricePerClient } from "@/calculators/costPriceCalculators";
import { useEquipmentWearStore } from "./equipmentWearStore";
import { useToolProcessingStore } from "./toolProcessingStore";
import { roundUpTo2 } from "@/utils";

export interface CostPrice {
  id: string;
  name: string; // назва
  price: number; // вартість
  volume: number; // обсяг
  expenditurePerClient: number; // витрата на одного клієнта
}

export type CostPriceFormValues = Omit<CostPrice, "id">;

interface CostPriceStore {
  costPrices: CostPrice[];
  addCostPrice: (costPrice: CostPriceFormValues) => void;
  updateCostPrice: (id: string, updatedCostPrice: CostPriceFormValues) => void;
  deleteCostPrice: (id: string) => void;
  getCostPriceById: (id: string) => CostPrice | undefined;
  getTotalForOneClient: () => number;
}

const storage = buildStorage<CostPriceStore>();

export const useCostPriceStore = create<CostPriceStore>()(
  persist(
    (set, get) => ({
      costPrices: [],

      addCostPrice: (costPrice) => {
        const newCostPrice = { ...costPrice, id: uuidv4() };
        return set((state) => ({
          costPrices: [...state.costPrices, newCostPrice],
        }));
      },

      updateCostPrice: (id, updatedCostPrice) =>
        set((state) => ({
          costPrices: state.costPrices.map((costPrice) =>
            costPrice.id === id
              ? { ...costPrice, ...updatedCostPrice }
              : costPrice
          ),
        })),

      deleteCostPrice: (id) =>
        set((state) => ({
          costPrices: state.costPrices.filter(
            (costPrice) => costPrice.id !== id
          ),
        })),

      getCostPriceById: (id) =>
        get().costPrices.find((costPrice) => costPrice.id === id),

      getTotalForOneClient: () => {
        const costPriceTotal = get().costPrices.reduce(
          (acc, costPrice) => acc + calculatePricePerClient(costPrice),
          0
        );

        const toolProcessingTotal = useToolProcessingStore
          .getState()
          .getTotalForOneClient();

        const equipmentWearTotal = useEquipmentWearStore
          .getState()
          .getTotalForOneClient();

        return roundUpTo2(
          costPriceTotal + toolProcessingTotal + equipmentWearTotal
        );
      },
    }),
    {
      name: "cost-price-storage",
      storage: storage,
    }
  )
);
