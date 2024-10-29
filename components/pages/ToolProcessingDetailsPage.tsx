import {
  ToolProcessing,
  ToolProcessingFormValues,
} from "@/stores/toolProcessingStore";
import { useForm } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import EuroInput from "../inputs/EuroInput";
import NumberInput from "../inputs/NumberInput";
import {
  calculateDaysAmount,
  calculateExpenditurePerClient,
  calculatePricePerDay,
} from "@/calculators/toolProcessingCalculators";
import EntityDetailsPage from "../EntityDetailsPage";
import InputsSeparator from "../InputsSeparator";
import CalculatedNumberField from "../calculatedFields/CalculatedNumberField";
import CalculatedEuroField from "../calculatedFields/CalculatedEuroField";

type Props = {
  toolProcessing?: ToolProcessing;
  onSubmit: (formValues: ToolProcessingFormValues) => void;
  onDelete?: () => void;
};

export default function ToolsProcessingDetailsPage({
  toolProcessing,
  onSubmit,
  onDelete,
}: Props) {
  const { control, watch } = useForm<ToolProcessingFormValues>({
    defaultValues: {
      name: toolProcessing?.name ?? "",
      price: toolProcessing?.price ?? 0,
      volume: toolProcessing?.volume ?? 0,
      expenditurePerDay: toolProcessing?.expenditurePerDay ?? 0,
      clientsPerDay: toolProcessing?.clientsPerDay ?? 0,
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
      <NumberInput label="Обсяг" name="volume" control={control} />
      <NumberInput
        label="Витрати на день"
        name="expenditurePerDay"
        control={control}
      />
      <NumberInput
        label="Кількість клієнтів на день"
        name="clientsPerDay"
        control={control}
      />

      <InputsSeparator />

      <CalculatedNumberField
        label="Кількість днів"
        value={calculateDaysAmount(formValues)}
      />
      <CalculatedEuroField
        label="Ціна в день"
        value={calculatePricePerDay(formValues)}
      />
      <CalculatedEuroField
        label="Витрата на одного клієнта"
        value={calculateExpenditurePerClient(formValues)}
      />
    </EntityDetailsPage>
  );
}
