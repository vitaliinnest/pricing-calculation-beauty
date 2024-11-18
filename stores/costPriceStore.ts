import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { calculatePricePerClient } from "@/calculators/costPriceCalculators";
import { useEquipmentWearStore } from "./equipmentWearStore";
import { useToolProcessingStore } from "./toolProcessingStore";
import { roundNumber } from "@/utils";

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
  calculateTotalForOneClient: (discard?: boolean) => number;
}

const storage = buildStorage<CostPriceStore>();

const seedCostPrices = (): CostPrice[] => [
  {
    id: uuidv4(),
    name: "Антисептик для рук",
    price: 11.76,
    volume: 1000,
    expenditurePerClient: 5,
  },
  {
    id: uuidv4(),
    name: "Пилка для нігтів",
    price: 4.71,
    volume: 50,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Манікюрна серветка",
    price: 3.53,
    volume: 200,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Безворсові серветки",
    price: 1.41,
    volume: 100,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Рукавички",
    price: 14.12,
    volume: 100,
    expenditurePerClient: 2,
  },
  {
    id: uuidv4(),
    name: "Маска",
    price: 5.0,
    volume: 50,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Апельсинова паличка",
    price: 0.56,
    volume: 100,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Крафт пакет 100*200",
    price: 6.35,
    volume: 50,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Щіточка для пилу",
    price: 2.35,
    volume: 5,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Обезжирювач",
    price: 4.12,
    volume: 15,
    expenditurePerClient: 0.3,
  },
  {
    id: uuidv4(),
    name: "Праймер",
    price: 4.71,
    volume: 15,
    expenditurePerClient: 0.3,
  },
  {
    id: uuidv4(),
    name: "Дегідратор",
    price: 4.71,
    volume: 15,
    expenditurePerClient: 0.3,
  },
  {
    id: uuidv4(),
    name: "База",
    price: 8.24,
    volume: 15,
    expenditurePerClient: 0.5,
  },
  {
    id: uuidv4(),
    name: "Колір (2 шари)",
    price: 6.47,
    volume: 15,
    expenditurePerClient: 0.5,
  },
  {
    id: uuidv4(),
    name: "Топ",
    price: 8.24,
    volume: 15,
    expenditurePerClient: 0.5,
  },
  {
    id: uuidv4(),
    name: "Олія для кутикули",
    price: 8.24,
    volume: 15,
    expenditurePerClient: 0.5,
  },
  {
    id: uuidv4(),
    name: "Фреза плам'я",
    price: 6.12,
    volume: 1000,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Фреза шар",
    price: 6.12,
    volume: 1000,
    expenditurePerClient: 1,
  },
  {
    id: uuidv4(),
    name: "Обробка поверхні алмазом",
    price: 6.12,
    volume: 1000,
    expenditurePerClient: 1,
  },
];

export const useCostPriceStore = create<CostPriceStore>()(
  persist(
    (set, get) => ({
      costPrices: seedCostPrices(),

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

      calculateTotalForOneClient: (discard) => {
        const costPriceTotal = get().costPrices.reduce(
          (acc, costPrice) => acc + calculatePricePerClient(costPrice, true),
          0
        );

        const toolProcessingTotal = useToolProcessingStore
          .getState()
          .getTotalForOneClient(true);

        const equipmentWearTotal = useEquipmentWearStore
          .getState()
          .getTotalForOneClient(true);

        return roundNumber(
          costPriceTotal + toolProcessingTotal + equipmentWearTotal,
          discard
        );
      },
    }),
    {
      name: "cost-price-storage",
      storage,
    }
  )
);
