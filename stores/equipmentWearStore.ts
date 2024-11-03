import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import { calculatePricePerClient } from "@/calculators/equipmentWearCalculators";
import { roundUpTo2 } from "@/utils";

export interface EquipmentWear {
  id: string;
  name: string; // назва
  price: number; // вартість
  serviceLifeInDays: number; // строк експлуатації в днях
}

export type EquipmentWearFormValues = Omit<EquipmentWear, "id">;

interface EquipmentWearStore {
  equipmentWears: EquipmentWear[];
  averageClientsNumberPerDay: number;
  addEquipmentWear: (equipmentWear: EquipmentWearFormValues) => void;
  updateEquipmentWear: (
    id: string,
    updatedEquipmentWear: EquipmentWearFormValues
  ) => void;
  deleteEquipmentWear: (id: string) => void;
  getEquipmentWearById: (id: string) => EquipmentWear | undefined;
  setAverageCustomersPerDay: (average: number) => void;
  getTotalForOneClient: () => number;
}

const storage = buildStorage<EquipmentWearStore>();

export const useEquipmentWearStore = create<EquipmentWearStore>()(
  persist(
    (set, get) => ({
      equipmentWears: [],
      averageClientsNumberPerDay: 0,

      addEquipmentWear: (equipmentWear) => {
        const newEquipmentWear = { ...equipmentWear, id: uuidv4() };
        return set((state) => ({
          equipmentWears: [...state.equipmentWears, newEquipmentWear],
        }));
      },

      updateEquipmentWear: (id, updatedEquipmentWear) =>
        set((state) => ({
          equipmentWears: state.equipmentWears.map((equipmentWear) =>
            equipmentWear.id === id
              ? { ...equipmentWear, ...updatedEquipmentWear }
              : equipmentWear
          ),
        })),

      deleteEquipmentWear: (id) =>
        set((state) => ({
          equipmentWears: state.equipmentWears.filter(
            (equipmentWear) => equipmentWear.id !== id
          ),
        })),

      getEquipmentWearById: (id) =>
        get().equipmentWears.find((equipmentWear) => equipmentWear.id === id),

      setAverageCustomersPerDay: (average) =>
        set(() => ({ averageClientsNumberPerDay: average })),

      getTotalForOneClient: () =>
        roundUpTo2(
          get().equipmentWears.reduce(
            (acc, equipmentWear) =>
              acc +
              calculatePricePerClient(
                equipmentWear,
                get().averageClientsNumberPerDay
              ),
            0
          )
        ),
    }),
    {
      name: "equipment-wear-storage",
      storage,
    }
  )
);
