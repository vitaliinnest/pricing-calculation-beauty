import {
  MonthlyFinancialData,
  MonthlyFinancialDataFormValues,
} from "@/stores/financialModelStore";
import { useForm } from "react-hook-form";
import EntityDetailsPage from "../EntityDetailsPage";
import CalculatedNumberField from "../calculatedFields/CalculatedNumberField";
import CalculatedTextField from "../calculatedFields/CalculatedTextField";
import { MonthMap } from "@/stores/common";
import NumberInput from "../inputs/NumberInput";
import InputsSeparator from "../InputsSeparator";
import {
  calculateClientsNumberPerMonth,
  calculateClientsNumberPerWeek,
  calculateDailyClientHours,
  calculateHoursNumberPerMonth,
} from "@/calculators/financialModelCalculators";

type Props = {
  financialData: MonthlyFinancialData;
  onSubmit: (formValues: MonthlyFinancialDataFormValues) => void;
};

export default function MonthlyFinancialDataDetailsPage({
  financialData,
  onSubmit,
}: Props) {
  const { control, watch } = useForm<MonthlyFinancialDataFormValues>({
    defaultValues: {
      month: financialData.month,
      workingDaysPerWeek: financialData.workingDaysPerWeek,
      workingDaysPerMonth: financialData.workingDaysPerMonth,
      clientsNumberPerDay: financialData.clientsNumberPerDay,
      hoursNumberPerClient: financialData.hoursNumberPerClient,
    },
  });

  const formValues = watch();

  return (
    <EntityDetailsPage onSubmit={() => onSubmit(formValues)}>
      <CalculatedTextField label="Місяць" value={MonthMap[formValues.month]} />
      <NumberInput
        label="Робочі дні на тиждень"
        name="workingDaysPerWeek"
        control={control}
      />
      <NumberInput
        label="Робочі дні на місяць"
        name="workingDaysPerMonth"
        control={control}
      />
      <NumberInput
        label="Кількість клієнтів на день"
        name="clientsNumberPerDay"
        control={control}
      />
      <NumberInput
        label="Кількість годин на клієнта"
        name="hoursNumberPerClient"
        control={control}
      />

      <InputsSeparator />

      <CalculatedNumberField
        label="Загальна кількість годин на день"
        value={calculateDailyClientHours(formValues)}
      />
      <CalculatedNumberField
        label="Кількість клієнтів на тиждень"
        value={calculateClientsNumberPerWeek(formValues)}
      />
      <CalculatedNumberField
        label="Кількість клієнтів на місяць"
        value={calculateClientsNumberPerMonth(formValues)}
      />
      <CalculatedNumberField
        label="Кількість годин на місяць"
        value={calculateHoursNumberPerMonth(formValues)}
      />
    </EntityDetailsPage>
  );
}
