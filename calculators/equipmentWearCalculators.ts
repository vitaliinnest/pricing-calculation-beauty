import { EquipmentWearFormValues } from "@/stores/equipmentWearStore";
import { roundUpTo2 } from "@/utils";

// todo: move to store

/** Ціна в день */
export function calculatePricePerDay(
  equipment: EquipmentWearFormValues
): number {
  if (!equipment?.serviceLifeInDays) {
    return 0;
  }
  return roundUpTo2(equipment.price / equipment.serviceLifeInDays);
}

/** Ціна на одного клієнта */
export function calculatePricePerClient(
  equipment: EquipmentWearFormValues,
  averageClientsPerDay: number
): number {
  if (averageClientsPerDay === 0) {
    return 0;
  }
  return roundUpTo2(calculatePricePerDay(equipment) / averageClientsPerDay);
}

/** Сумарна ціна зносу обладнання */
export function calculateTotalPricePerClient(
  equipmentWears: EquipmentWearFormValues[],
  averageClientsPerDay: number
): number {
  if (!equipmentWears?.length) {
    return 0;
  }

  return equipmentWears.reduce(
    (acc, equipmentWear) =>
      acc + calculatePricePerClient(equipmentWear, averageClientsPerDay),
    0
  );
}
