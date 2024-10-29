import { CostPrice, CostPriceFormValues } from "@/stores/costPriceStore";
import { useForm } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import EuroInput from "../inputs/EuroInput";
import NumberInput from "../inputs/NumberInput";
import EntityDetailsPage from "../EntityDetailsPage";
import InputsSeparator from "../InputsSeparator";
import CalculatedNumberField from "../calculatedFields/CalculatedNumberField";
import { calculateClientsNumber, calculatePricePerClient } from "@/calculators/costPriceCalculators";
import CalculatedEuroField from "../calculatedFields/CalculatedEuroField";

type Props = {
  costPrice?: CostPrice;
  onSubmit: (formValues: CostPriceFormValues) => void;
  onDelete?: () => void;
};

export default function CostPriceDetailsPage({
  costPrice,
  onSubmit,
  onDelete,
}: Props) {
  const { control, watch } = useForm<CostPriceFormValues>({
    defaultValues: {
      name: costPrice?.name ?? "",
      price: costPrice?.price ?? 0,
      volume: costPrice?.volume ?? 0,
      expenditurePerClient: costPrice?.expenditurePerClient ?? 0,
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
        label="Витрата на клієнта"
        name="expenditurePerClient"
        control={control}
      />

      <InputsSeparator />

      <CalculatedNumberField
        label="Усього клієнтів"
        value={calculateClientsNumber(formValues)}
      />
      <CalculatedEuroField
        label="Ціна на одного клієнта"
        value={calculatePricePerClient(formValues)}
      />
    </EntityDetailsPage>
  );
}
