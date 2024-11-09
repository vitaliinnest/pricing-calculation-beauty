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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("toolProcessing");

  const formValues = watch();

  return (
    <EntityDetailsPage
      onSubmit={() => onSubmit(formValues)}
      onDelete={onDelete}
    >
      <TextInput label={t("name")} name="name" control={control} />
      <EuroInput label={t("price")} name="price" control={control} />
      <NumberInput label={t("volume")} name="volume" control={control} />
      <NumberInput
        label={t("expenditurePerDay")}
        name="expenditurePerDay"
        control={control}
      />
      <NumberInput
        label={t("clientsPerDay")}
        name="clientsPerDay"
        control={control}
      />

      <InputsSeparator />

      <CalculatedNumberField
        label={t('daysAmount')}
        value={calculateDaysAmount(formValues)}
      />
      <CalculatedEuroField
        label={t('pricePerDay')}
        value={calculatePricePerDay(formValues)}
      />
      <CalculatedEuroField
        label={t('expenditurePerClient')}
        value={calculateExpenditurePerClient(formValues)}
      />
    </EntityDetailsPage>
  );
}
