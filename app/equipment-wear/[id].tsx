import EquipmentWearDetailsPage from "@/components/pages/EquipmentWearDetailsPage";
import {
  EquipmentWearFormValues,
  useEquipmentWearStore,
} from "@/stores/equipmentWearStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function EditEquipmentWearDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateEquipmentWear, deleteEquipmentWear, getEquipmentWearById } =
    useEquipmentWearStore();
  const equipmentWear = getEquipmentWearById(id);

  if (!equipmentWear) {
    return null;
  }

  const onUpdateEquipmentWear = (equipmentWear: EquipmentWearFormValues) => {
    updateEquipmentWear(id, equipmentWear);
    router.replace("/(tabs)/");
    Toast.show({
      type: "success",
      text1: equipmentWear.name,
      text2: "Обладнання оновлено",
    });
  };

  const onDeleteEquipmentWear = () => {
    deleteEquipmentWear(id);
    router.replace("/(tabs)/");
    Toast.show({
      type: "success",
      text1: equipmentWear.name,
      text2: "Обладнання видалено",
    });
  };

  return (
    <EquipmentWearDetailsPage
      equipmentWear={equipmentWear}
      onSubmit={onUpdateEquipmentWear}
      onDelete={onDeleteEquipmentWear}
    />
  );
}
