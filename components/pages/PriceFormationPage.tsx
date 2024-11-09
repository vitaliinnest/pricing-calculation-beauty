import { useForm } from "react-hook-form";
import EuroInput from "../inputs/EuroInput";
import NumberInput from "../inputs/NumberInput";
import EntityDetailsPage from "../EntityDetailsPage";
import InputsSeparator from "../InputsSeparator";
import CalculatedNumberField from "../calculatedFields/CalculatedNumberField";
import CalculatedEuroField from "../calculatedFields/CalculatedEuroField";
import { PriceFormationFormValues } from "@/stores/priceFormationStore";
import { useCostPriceStore } from "@/stores/costPriceStore";
import { useFinancialModelStore } from "@/stores/financialModelStore";
import {
  calculateClientsNumberPerMonth,
  calculateDailyTurnover,
  calculatePlannedDailyTurnover,
  calculatePlannedMonthlyTurnover,
} from "@/calculators/priceFormationCalculators";
import { roundUpTo2 } from "@/utils";
import { useTranslation } from "react-i18next";

export default function PriceFormationPage() {
  const { control, watch } = useForm<PriceFormationFormValues>({
    defaultValues: {
      clientProfit: 0,
      expectedMonthlyTurnover: 0,
      servicePrice: 0,
      workingDaysPerMonth: 0,
      clientsNumberPerDay: 0,
    },
  });

  const { t } = useTranslation("priceFormation");

  const formValues = watch();

  const costPriceStore = useCostPriceStore();
  const financialModelStore = useFinancialModelStore();

  const averageYearlyExpensesPerClient =
    financialModelStore.calculateAverageYearlyExpensesPerClient();

  const totalClientsPerMonth =
    financialModelStore.calculateTotalClientsNumberPerMonth();

  const totalCostPerClientPerDay =
    totalClientsPerMonth > 0
      ? roundUpTo2(
          financialModelStore.calculateTotalMonthlyCostPrice() /
            totalClientsPerMonth
        )
      : 0;

  const plannedDailyTurnoverDifference = roundUpTo2(
    calculatePlannedDailyTurnover(formValues) -
      calculateDailyTurnover(formValues)
  );

  const plannedMonthlyTurnoverDifference = roundUpTo2(
    plannedDailyTurnoverDifference * formValues.workingDaysPerMonth
  );

  const averageDailyExpenses =
    financialModelStore.calculateAverageYearlyExpensesPerDay();

  const plannedDailyTurnover = calculatePlannedDailyTurnover(formValues);

  const netProfitPerClient = roundUpTo2(
    formValues.servicePrice -
      totalCostPerClientPerDay -
      (formValues.clientsNumberPerDay > 0
        ? averageDailyExpenses / formValues.clientsNumberPerDay
        : 0)
  );

  const netProfitPerDay = roundUpTo2(
    plannedDailyTurnover -
      totalCostPerClientPerDay * formValues.clientsNumberPerDay -
      averageDailyExpenses
  );

  const netProfitPerMonth = roundUpTo2(
    netProfitPerDay * formValues.workingDaysPerMonth
  );

  return (
    <EntityDetailsPage>
      <InputsSeparator title={t("priceFormation")} />
      <CalculatedEuroField
        label={t("costPricePerClient")}
        value={costPriceStore.calculateTotalForOneClient()}
      />
      <CalculatedEuroField
        label={t("expensesPerClient")}
        value={averageYearlyExpensesPerClient}
      />
      <EuroInput
        label={t("clientProfit")}
        name="clientProfit"
        control={control}
      />
      <CalculatedEuroField
        label={t("recommendedPrice")}
        value={averageYearlyExpensesPerClient + formValues.clientProfit}
      />

      <InputsSeparator title={t("scenario")} />

      <EuroInput
        label={t("expectedMonthlyTurnover")}
        name="expectedMonthlyTurnover"
        control={control}
      />
      <EuroInput
        label={t("servicePrice")}
        name="servicePrice"
        control={control}
      />
      <NumberInput
        label={t("workingDaysPerMonth")}
        name="workingDaysPerMonth"
        control={control}
      />
      <NumberInput
        label={t("clientsNumberPerDay")}
        name="clientsNumberPerDay"
        control={control}
      />
      <CalculatedNumberField
        label={t("clientsNumberPerMonth")}
        value={calculateClientsNumberPerMonth(formValues)}
      />
      <CalculatedEuroField
        label={t("requiredDailyTurnover")}
        value={calculateDailyTurnover(formValues)}
      />
      <CalculatedEuroField
        label={t("totalDailyExpenses")}
        value={averageDailyExpenses}
      />
      <CalculatedEuroField
        label={t("totalCostPerClientPerDay")}
        value={totalCostPerClientPerDay}
      />
      <CalculatedEuroField
        label={t("plannedDailyTurnover")}
        value={plannedDailyTurnover}
      />
      <CalculatedEuroField
        label={t("plannedMonthlyTurnover")}
        value={calculatePlannedMonthlyTurnover(formValues)}
      />
      <CalculatedEuroField
        label={t("dailyTurnoverDifference")}
        value={plannedDailyTurnoverDifference}
      />
      <CalculatedEuroField
        label={t("monthlyTurnoverDifference")}
        value={plannedMonthlyTurnoverDifference}
      />

      <InputsSeparator title={t("profit")} />

      <CalculatedEuroField
        label={t("netProfitPerClient")}
        value={netProfitPerClient}
      />
      <CalculatedEuroField
        label={t("netProfitPerDay")}
        value={netProfitPerDay}
      />
      <CalculatedEuroField
        label={t("netProfitPerMonth")}
        value={netProfitPerMonth}
      />
    </EntityDetailsPage>
  );
}
