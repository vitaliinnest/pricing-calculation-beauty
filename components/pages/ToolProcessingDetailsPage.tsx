import { ToolProcessing, ToolProcessingFormValues } from "@/stores/toolProcessingStore";
import { TextInput as TextInputNative, StyleSheet } from "react-native";
import { inputStyles } from "../inputs/common";
import { LabellableInput } from "../inputs/LabellableInput";
import TextInput from "../inputs/TextInput";
import { useForm } from "react-hook-form";
import EuroInput from "../inputs/EuroInput";
import NumberInput from "../inputs/NumberInput";
import Button from "../Button";
import { calculateDaysAmount, calculateExpenditurePerClient, calculatePricePerDay } from "@/calculators/toolProcessingCalculators";
import EntityDetailsPage from "../EntityDetailsPage";

type Props = {
  toolProcessing?: ToolProcessing;
  onSubmit: (formValues: ToolProcessingFormValues) => void;
  onDelete?: () => void;
};

export default function ToolsProcessingDetailsPage({ toolProcessing, onSubmit, onDelete }: Props) {
  const { control, handleSubmit, watch } = useForm<ToolProcessingFormValues>({
    defaultValues: {
      name: toolProcessing?.name,
      price: toolProcessing?.price,
      volume: toolProcessing?.volume,
      expenditurePerDay: toolProcessing?.expenditurePerDay,
      clientsPerDay: toolProcessing?.clientsPerDay,
    },
  });

  const formValues = watch();

  return (
    <EntityDetailsPage
      onSubmit={() => handleSubmit(onSubmit)}
      onDelete={onDelete}
    >
      <TextInput label="Назва" name="name" control={control} />
      <EuroInput label="Вартість" name="price" control={control} />
      <NumberInput label="Обсяг" name="volume" control={control} />
      <NumberInput label="Витрати на день" name="expenditurePerDay" control={control} />
      <NumberInput label="Кількість клієнтів на день" name="clientsPerDay" control={control} />
        
      <LabellableInput label="Кількість днів">
        <TextInputNative
          readOnly
          value={calculateDaysAmount(formValues).toString()}
          style={[inputStyles.input]}
        />
      </LabellableInput>
      
      <LabellableInput label="Ціна в день, €">
        <TextInputNative
          readOnly
          value={calculatePricePerDay(formValues).toString()}
          style={[inputStyles.input]}
        />
      </LabellableInput>
      
      <LabellableInput label="Витрата на одного клієнта, €">
        <TextInputNative
          readOnly
          value={calculateExpenditurePerClient(formValues).toString()}
          style={[inputStyles.input]}
        />
      </LabellableInput>
    </EntityDetailsPage>
  );
}
