import { Expense, ExpenseFormValues } from "@/stores/expenseStore";
import { useForm } from "react-hook-form";
import EntityDetailsPage from "../EntityDetailsPage";
import TextInput from "../inputs/TextInput";
import { Month, useMonthMap } from "@/stores/common";
import InputsSeparator from "../InputsSeparator";
import EuroInput from "../inputs/EuroInput";
import CalculatedEuroField from "../calculatedFields/CalculatedEuroField";
import { calculateTotalPrice } from "@/calculators/expenseCalculators";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("expenses");
  const monthMap = useMonthMap();
  
  const formValues = watch();

  return (
    <EntityDetailsPage
      onSubmit={() => onSubmit(formValues)}
      onDelete={onDelete}
    >
      <TextInput label={t("name")} name="name" control={control} />

      {Object.keys(formValues.priceMap).map((month) => (
        <EuroInput
          key={month}
          label={monthMap[month as unknown as Month]}
          name={`priceMap.${month}`}
          control={control}
        />
      ))}

      <InputsSeparator />
      
      <CalculatedEuroField
        label={t("totalPrice")}
        value={calculateTotalPrice(formValues)}
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
