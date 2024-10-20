import { ToolProcessing, ToolProcessingFormValues } from "@/stores/toolProcessingStore";
import ScrollPage from "../ScrollPage";
import TextInput from "../inputs/TextInput";
import { useForm } from "react-hook-form";
import EuroInput from "../inputs/EuroInput";
import NumberInput from "../inputs/NumberInput";
import Button from "../Button";

type Props = {
  toolProcessing?: ToolProcessing;
  onSubmit: (formValues: ToolProcessingFormValues) => void;
  onDelete?: () => void;
};

export default function ToolsProcessingDetailsPage({ toolProcessing, onSubmit, onDelete }: Props) {
  const { control, handleSubmit } = useForm<ToolProcessingFormValues>({
    defaultValues: {
      name: toolProcessing?.name,
      price: toolProcessing?.price,
      volume: toolProcessing?.volume,
      expenditurePerDay: toolProcessing?.expenditurePerDay,
      clientsPerDay: toolProcessing?.clientsPerDay,
    },
  });
  
  return (
    <ScrollPage>
      <TextInput label="Назва" name="name" control={control} />
      <EuroInput label="Вартість" name="price" control={control} />
      <NumberInput label="Обсяг" name="volume" control={control} />
      <NumberInput label="Витрати на день" name="expenditurePerDay" control={control} />
      <NumberInput label="Кількість клієнтів на день" name="clientsPerDay" control={control} />
      <Button title="Зберегти" onPress={handleSubmit(onSubmit)} />
      {onDelete && <Button title="Видалити" onPress={onDelete} />}
    </ScrollPage>
  );
}
