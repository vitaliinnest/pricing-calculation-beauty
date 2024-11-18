import { EquipmentWearFormValues } from "@/stores/equipmentWearStore";
import { roundNumber } from "@/utils";

/** Ціна в день */
export function calculatePricePerDay(
  equipment: EquipmentWearFormValues
): number {
  if (!equipment?.serviceLifeInDays) {
    return 0;
  }
  return roundNumber(equipment.price / equipment.serviceLifeInDays);
}

/** Ціна на одного клієнта */
export function calculatePricePerClient(
  equipment: EquipmentWearFormValues,
  averageClientsNumberPerDay: number
): number {
  if (averageClientsNumberPerDay === 0) {
    return 0;
  }
  return roundNumber(calculatePricePerDay(equipment) / averageClientsNumberPerDay);
}
