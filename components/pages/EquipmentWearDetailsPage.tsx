import {
  EquipmentWear,
  EquipmentWearFormValues,
} from "@/stores/equipmentWearStore";
import { useForm } from "react-hook-form";
import EntityDetailsPage from "../EntityDetailsPage";
import TextInput from "../inputs/TextInput";
import EuroInput from "../inputs/EuroInput";
import NumberInput from "../inputs/NumberInput";
import { LabellableInput } from "../inputs/LabellableInput";

type Props = {
  equipmentWear?: EquipmentWear;
  onSubmit: (formValues: EquipmentWearFormValues) => void;
  onDelete?: () => void;
};

export default function EquipmentWearDetailsPage({
  equipmentWear,
  onSubmit,
  onDelete,
}: Props) {
  const { control, watch } = useForm<EquipmentWearFormValues>({
    defaultValues: {
      name: equipmentWear?.name ?? "",
      price: equipmentWear?.price ?? 0,
      serviceLifeInDays: equipmentWear?.serviceLifeInDays ?? 0,
    },
  });

  const formValues = watch();

  return (
    <EntityDetailsPage
      onSubmit={() => onSubmit(formValues)}
      onDelete={onDelete}
    >
      <TextInput label="Назва" name="name" control={control} />
      <EuroInput label="Вартість" name="price" control={control} />
      <NumberInput
        label="Строк експлуатації в днях"
        name="serviceLifeInDays"
        control={control}
      />

      <LabellableInput label="Some label"></LabellableInput>
    </EntityDetailsPage>
  );
}
