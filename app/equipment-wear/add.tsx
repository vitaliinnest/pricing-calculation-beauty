import { useRouter } from "expo-router";
import EquipmentWearDetailsPage from "@/components/pages/EquipmentWearDetailsPage";
import Toast from "react-native-toast-message";
import {
  EquipmentWearFormValues,
  useEquipmentWearStore,
} from "@/stores/equipmentWearStore";

export default function AddEquipmentWear() {
  const { addEquipmentWear } = useEquipmentWearStore();
  const router = useRouter();

  const onAddEquipmentWear = (equipmentWear: EquipmentWearFormValues) => {
    addEquipmentWear(equipmentWear);
    router.replace("/(tabs)/equipment-wear");
    Toast.show({
      type: "success",
      text1: equipmentWear.name,
      text2: "Обладнання додано",
    });
  };

  return <EquipmentWearDetailsPage onSubmit={onAddEquipmentWear} />;
}
