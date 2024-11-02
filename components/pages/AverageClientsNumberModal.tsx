import { Modal, StyleSheet, Text, View } from "react-native";
import { useEquipmentWearStore } from "@/stores/equipmentWearStore";
import Button from "../Button";
import { useForm } from "react-hook-form";
import NumberInput from "../inputs/NumberInput";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AverageClientsNumberModal({ visible, onClose }: Props) {
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
            Середня кількість клієнтів на день
          </Text>
          <NumberInput
            name="averageClientsNumberPerDay"
            control={control}
            label="Введіть число"
          />
          <View style={styles.buttonContainer}>
            <Button title="Скасувати" onPress={onClose} />
            <Button title="Зберегти" onPress={onSubmit} />
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
