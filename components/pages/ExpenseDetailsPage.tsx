import { Expense, ExpenseFormValues } from "@/stores/expenseStore";
import { useForm } from "react-hook-form";
import EntityDetailsPage from "../EntityDetailsPage";
import TextInput from "../inputs/TextInput";
import { Month, MonthMap } from "@/stores/common";
import InputsSeparator from "../InputsSeparator";
import EuroInput from "../inputs/EuroInput";
import CalculatedEuroField from "../calculatedFields/CalculatedEuroField";
import { calculateAveragePrice } from "@/calculators/expenseCalculators";

type Props = {
  expense?: Expense;
  onSubmit: (formValues: ExpenseFormValues) => void;
  onDelete?: () => void;
};

export default function ExpenseDetailsPage({
  expense,
  onSubmit,
  onDelete,
}: Props) {
  const { control, watch } = useForm<ExpenseFormValues>({
    defaultValues: {
      name: expense?.name ?? "",
      priceMap: expense?.priceMap ?? initializePriceMap(),
    },
  });

  const formValues = watch();

  return (
    <EntityDetailsPage
      onSubmit={() => onSubmit(formValues)}
      onDelete={onDelete}
    >
      <TextInput label="Назва" name="name" control={control} />

      {Object.keys(formValues.priceMap).map((month) => (
        <EuroInput
          key={month}
          label={`Ціна за ${MonthMap[month as unknown as Month]}`}
          name={`priceMap.${month}`}
          control={control}
        />
      ))}

      <InputsSeparator />
      
      <CalculatedEuroField
        label="Середня ціна"
        value={calculateAveragePrice(formValues)}
      />
    </EntityDetailsPage>
  );
}

const initializePriceMap = (): Record<Month, number> => {
  return Object.values(Month).reduce((acc, month) => {
    if (typeof month === "number") {
      acc[month] = 0;
    }
    return acc;
  }, {} as Record<Month, number>);
};
