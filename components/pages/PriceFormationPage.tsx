import { useForm } from "react-hook-form";
import EuroInput from "../inputs/EuroInput";
import NumberInput from "../inputs/NumberInput";
import EntityDetailsPage from "../EntityDetailsPage";
import InputsSeparator from "../InputsSeparator";
import CalculatedNumberField from "../calculatedFields/CalculatedNumberField";
import CalculatedEuroField from "../calculatedFields/CalculatedEuroField";
import {
  PriceFormationFormValues,
  usePriceFormationStore,
} from "@/stores/priceFormationStore";
import { useCostPriceStore } from "@/stores/costPriceStore";
import { useFinancialModelStore } from "@/stores/financialModelStore";
import {
  calculateClientsNumberPerMonth,
  calculateDailyTurnover,
  calculatePlannedDailyTurnover,
  calculatePlannedMonthlyTurnover,
} from "@/calculators/priceFormationCalculators";

export default function PriceFormationPage() {
  // const { priceFormation, updatePriceFormation } = usePriceFormationStore();

  const { control, watch } = useForm<PriceFormationFormValues>({
    defaultValues: {
      clientProfit: 0,
      expectedMonthlyTurnover: 0,
      servicePrice: 0,
      workingDaysPerMonth: 0,
      clientsNumberPerDay: 0,
    },
  });

  const formValues = watch();

  const costPriceStore = useCostPriceStore();
  const financialModelStore = useFinancialModelStore();

  const averageYearlyExpensesPerClient =
    financialModelStore.calculateAverageYearlyExpensesPerClient();

  const totalClientsPerMonth =
    financialModelStore.calculateTotalClientsNumberPerMonth();

  const totalCostPerClientPerDay =
    totalClientsPerMonth > 0
      ? financialModelStore.calculateTotalMonthlyCostPrice() /
        totalClientsPerMonth
      : 0;

  const plannedDailyTurnoverDifference =
    calculatePlannedDailyTurnover(formValues) -
    calculateDailyTurnover(formValues);

  const plannedMonthlyTurnoverDifference =
    plannedDailyTurnoverDifference * formValues.workingDaysPerMonth;

  const averageDailyExpenses =
    financialModelStore.calculateAverageYearlyExpensesPerDay();

  const plannedDailyTurnover = calculatePlannedDailyTurnover(formValues);

  const netProfitPerClient =
    formValues.servicePrice -
    totalCostPerClientPerDay -
    (formValues.clientsNumberPerDay > 0
      ? averageDailyExpenses / formValues.clientsNumberPerDay
      : 0);

  const netProfitPerDay =
    plannedDailyTurnover -
    totalCostPerClientPerDay * formValues.clientsNumberPerDay -
    averageDailyExpenses;

  const netProfitPerMonth = netProfitPerDay * formValues.workingDaysPerMonth;

  return (
    <EntityDetailsPage>
      <InputsSeparator title="Ціноутворення" />
      <CalculatedEuroField
        label="Собівартість матеріала на одного клієнта"
        value={costPriceStore.calculateTotalForOneClient()}
      />
      <CalculatedEuroField
        label="Витрати на одного клієнта"
        value={averageYearlyExpensesPerClient}
      />
      <EuroInput
        label="Прибуток з клієнта"
        name="clientProfit"
        control={control}
      />
      <CalculatedEuroField
        label="Рекомендована вартість"
        value={averageYearlyExpensesPerClient + formValues.clientProfit}
      />

      <InputsSeparator title="Сценарій, щоб краще бачити свою мету" />

      <EuroInput
        label="Бажаний оборот в місяць"
        name="expectedMonthlyTurnover"
        control={control}
      />
      <EuroInput
        label="Ціна вашої послуги"
        name="servicePrice"
        control={control}
      />
      <NumberInput
        label="Кількість робочих днів в місяць"
        name="workingDaysPerMonth"
        control={control}
      />
      <NumberInput
        label="Кількість клієнтів на день"
        name="clientsNumberPerDay"
        control={control}
      />
      <CalculatedNumberField
        label="Кількість клієнтів в місяць"
        value={calculateClientsNumberPerMonth(formValues)}
      />
      <CalculatedEuroField
        label="Необхідний оборот за один день"
        value={calculateDailyTurnover(formValues)}
      />
      <CalculatedEuroField
        label="Загальні витрати на день виходячи з кількості робочих днів на місяць"
        value={averageDailyExpenses}
      />
      <CalculatedEuroField
        label="Загальні витрати на день на одного клієнта"
        value={totalCostPerClientPerDay}
      />
      <CalculatedEuroField
        label="Ваш запланований оборот на день, виходячи з кількості робочих днів на місяць"
        value={plannedDailyTurnover}
      />
      <CalculatedEuroField
        label="Ваш запланований оборот на місяць виходячи з кількості робочих днів на місяць"
        value={calculatePlannedMonthlyTurnover(formValues)}
      />
      <CalculatedEuroField
        label="Різниця до мети в день"
        value={plannedDailyTurnoverDifference}
      />
      <CalculatedEuroField
        label="Різниця до мети в місяць"
        value={plannedMonthlyTurnoverDifference}
      />

      <InputsSeparator title="Прибуток" />

      <CalculatedEuroField
        label="Прибуток з клієнта"
        value={netProfitPerClient}
      />
      <CalculatedEuroField label="Прибуток в день" value={netProfitPerDay} />
      <CalculatedEuroField
        label="Прибуток в місяць"
        value={netProfitPerMonth}
      />
    </EntityDetailsPage>
  );
}
