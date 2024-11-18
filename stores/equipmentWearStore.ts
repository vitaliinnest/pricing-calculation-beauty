import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { calculatePricePerClient } from "@/calculators/equipmentWearCalculators";
import { roundNumber } from "@/utils";

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

const seedEquipmentWears = (): EquipmentWear[] => [
  {
    id: uuidv4(),
    name: "Лампа для гель-лака",
    price: 15.0,
    serviceLifeInDays: 360,
  },
  {
    id: uuidv4(),
    name: "Сухожар",
    price: 35.29,
    serviceLifeInDays: 360,
  },
  {
    id: uuidv4(),
    name: "УЗ-мийка",
    price: 52.94,
    serviceLifeInDays: 360,
  },
  {
    id: uuidv4(),
    name: "Апарат для манікюра",
    price: 158.82,
    serviceLifeInDays: 360,
  },
  {
    id: uuidv4(),
    name: "Пилосмок для манікюра",
    price: 50.59,
    serviceLifeInDays: 360,
  },
  {
    id: uuidv4(),
    name: "Підставка для рук",
    price: 14.12,
    serviceLifeInDays: 360,
  },
  {
    id: uuidv4(),
    name: "Стіл",
    price: 141.18,
    serviceLifeInDays: 360,
  },
  {
    id: uuidv4(),
    name: "Стільці",
    price: 35.29,
    serviceLifeInDays: 360,
  },
  {
    id: uuidv4(),
    name: "Лампа настільна",
    price: 9.41,
    serviceLifeInDays: 360,
  },
];

export const useEquipmentWearStore = create<EquipmentWearStore>()(
  persist(
    (set, get) => ({
      equipmentWears: seedEquipmentWears(),
      averageClientsNumberPerDay: 4,

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
        roundNumber(
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
