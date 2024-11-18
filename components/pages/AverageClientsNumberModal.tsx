import { Modal, StyleSheet, Text, View } from "react-native";
import { useEquipmentWearStore } from "@/stores/equipmentWearStore";
import Button from "../Button";
import { useForm } from "react-hook-form";
import NumberInput from "../inputs/NumberInput";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AverageClientsNumberModal({ visible, onClose }: Props) {
  const { t } = useTranslation("equipmentWear");

  const { averageClientsNumberPerDay, setAverageCustomersPerDay } =
    useEquipmentWearStore();

  const { control, watch } = useForm({
    defaultValues: {
      averageClientsNumberPerDay,
    },
  });

  const formValues = watch();

  const onSubmit = () => {
    setAverageCustomersPerDay(formValues.averageClientsNumberPerDay);
    onClose();
    Toast.show({
      type: "success",
      text1: t("averageClientsNumberPerDay"),
      text2: t("averageClientsNumberPerDayUpdated"),
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {t("averageClientsNumberPerDay")}
          </Text>
          <NumberInput
            name="averageClientsNumberPerDay"
            control={control}
            label={t("enterNumber")}
          />
          <View style={styles.buttonContainer}>
            <Button title={t("cancel")} onPress={onClose} />
            <Button title={t("save")} onPress={onSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
