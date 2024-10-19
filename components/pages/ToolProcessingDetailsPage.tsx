import { ToolProcessing, ToolProcessingFormValues } from "@/stores/toolProcessingStore";
import ThemedPage from "../ThemedPage";
import TextInput from "../inputs/TextInput";
import { useForm } from "react-hook-form";
import EuroInput from "../inputs/EuroInput";
import NumberInput from "../inputs/NumberInput";

type Props = {
  toolProcessing?: ToolProcessing;
  onSave?: (formValues: ToolProcessingFormValues) => void;
  onDelete?: () => void;
};

export default function ToolsProcessingDetailsPage({ toolProcessing, onSave, onDelete }: Props) {
  const { control, handleSubmit } = useForm<ToolProcessingFormValues>();
  
  return (
    <ThemedPage>
      <TextInput label="Назва" name="name" control={control} />
      <EuroInput label="Вартість" name="price" control={control} />
      <NumberInput label="Обсяг" name="volume" control={control} />
      <NumberInput label="Витрати на день" name="expenditurePerDay" control={control} />
      <NumberInput label="Кількість клієнтів на день" name="clientsPerDay" control={control} />
    </ThemedPage>
  );
}
