import { useEquipmentWearStore } from "@/stores/equipmentWearStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function EditEquipmentWearDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateEquipmentWear, deleteEquipmentWear, getEquipmentWearById } = useEquipmentWearStore();
  const equipmentWear = getEquipmentWearById(id);
  
  if (!equipmentWear) {
    return null;
  }
  
  return <View></View>;
}