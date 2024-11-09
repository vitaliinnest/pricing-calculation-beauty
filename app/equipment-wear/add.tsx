import { useRouter } from "expo-router";
import EquipmentWearDetailsPage from "@/components/pages/EquipmentWearDetailsPage";
import Toast from "react-native-toast-message";
import {
  EquipmentWearFormValues,
  useEquipmentWearStore,
} from "@/stores/equipmentWearStore";
import { useTranslation } from "react-i18next";

export default function AddEquipmentWear() {
  const { addEquipmentWear } = useEquipmentWearStore();
  const router = useRouter();
  const { t } = useTranslation("equipmentWear");

  const onAddEquipmentWear = (equipmentWear: EquipmentWearFormValues) => {
    addEquipmentWear(equipmentWear);
    router.replace("/(tabs)/equipment-wear");
    Toast.show({
      type: "success",
      text1: equipmentWear.name,
      text2: t("added"),
    });
  };

  return <EquipmentWearDetailsPage onSubmit={onAddEquipmentWear} />;
}
