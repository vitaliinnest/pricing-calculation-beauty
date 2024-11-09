import EquipmentWearDetailsPage from "@/components/pages/EquipmentWearDetailsPage";
import {
  EquipmentWearFormValues,
  useEquipmentWearStore,
} from "@/stores/equipmentWearStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function EditEquipmentWearDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateEquipmentWear, deleteEquipmentWear, getEquipmentWearById } =
    useEquipmentWearStore();
  const equipmentWear = getEquipmentWearById(id);
  const { t } = useTranslation("equipmentWear");

  if (!equipmentWear) {
    return null;
  }

  const onUpdateEquipmentWear = (equipmentWear: EquipmentWearFormValues) => {
    updateEquipmentWear(id, equipmentWear);
    router.replace("/(tabs)/equipment-wear");
    Toast.show({
      type: "success",
      text1: equipmentWear.name,
      text2: t("updated"),
    });
  };

  const onDeleteEquipmentWear = () => {
    deleteEquipmentWear(id);
    router.replace("/(tabs)/equipment-wear");
    Toast.show({
      type: "success",
      text1: equipmentWear.name,
      text2: t("deleted"),
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
