import {
  MonthlyFinancialData,
  MonthlyFinancialDataFormValues,
  useFinancialModelStore,
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
import { useExpenseStore } from "@/stores/expenseStore";
import CalculatedEuroField from "../calculatedFields/CalculatedEuroField";
import EuroInput from "../inputs/EuroInput";

type Props = {
  financialData: MonthlyFinancialData;
  onSubmit: (formValues: MonthlyFinancialDataWithExpenses) => void;
};

export type MonthlyFinancialDataWithExpenses =
  MonthlyFinancialDataFormValues & {
    expensesMap: Record<string, number>;
  };

export default function MonthlyFinancialDataDetailsPage({
  financialData,
  onSubmit,
}: Props) {
  const { expenses } = useExpenseStore();
  const {
    calculateMonthlyCostPrice,
    calculateTotalExpenses,
    calculateTotalExpensesPerClient,
    calculateTotalDailyExpenses,
    calculateTotalHourlyExpenses,
  } = useFinancialModelStore();

  const { control, watch } = useForm<MonthlyFinancialDataWithExpenses>({
    defaultValues: {
      month: financialData.month,
      workingDaysPerWeek: financialData.workingDaysPerWeek,
      workingDaysPerMonth: financialData.workingDaysPerMonth,
      clientsNumberPerDay: financialData.clientsNumberPerDay,
      hoursNumberPerClient: financialData.hoursNumberPerClient,
      expensesMap: expenses.reduce(
        (acc, expense) => ({
          ...acc,
          [expense.id]: expense.priceMap[financialData.month],
        }),
        {}
      ),
      actualMonthlyTurnover: financialData.actualMonthlyTurnover,
      expectedMonthlyTurnover: financialData.expectedMonthlyTurnover,
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

      <CalculatedEuroField
        label="Собівартість матеріалу"
        value={calculateMonthlyCostPrice(formValues)}
      />

      <InputsSeparator title="Витрати" />

      {expenses.map((expense) => (
        <EuroInput
          key={expense.id}
          label={expense.name}
          name={`expensesMap.${expense.id}`}
          control={control}
        />
      ))}

      <InputsSeparator />

      <CalculatedEuroField
        label="Загальні витрати"
        value={calculateTotalExpenses(formValues)}
      />
      <CalculatedEuroField
        label="Витрати на клієнта"
        value={calculateTotalExpensesPerClient(formValues)}
      />
      <CalculatedEuroField
        label="Витрати на день"
        value={calculateTotalDailyExpenses(formValues)}
      />
      <CalculatedEuroField
        label="Витрати на годину"
        value={calculateTotalHourlyExpenses(formValues)}
      />
    </EntityDetailsPage>
  );
}
