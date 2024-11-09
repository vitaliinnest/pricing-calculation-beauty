import React from "react";
import { useTranslation } from "react-i18next";
import {
  MonthlyFinancialData,
  MonthlyFinancialDataFormValues,
  useFinancialModelStore,
} from "@/stores/financialModelStore";
import { useForm } from "react-hook-form";
import EntityDetailsPage from "../EntityDetailsPage";
import CalculatedNumberField from "../calculatedFields/CalculatedNumberField";
import CalculatedTextField from "../calculatedFields/CalculatedTextField";
import { mapExpenses, MonthMap } from "@/stores/common";
import NumberInput from "../inputs/NumberInput";
import InputsSeparator from "../InputsSeparator";
import {
  calculateClientsNumberPerMonth,
  calculateClientsNumberPerWeek,
  calculateDailyClientHours,
  calculateHoursNumberPerMonth,
  calculateTurnoverDifference,
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
    calculateExpectedMonthlyProfit,
  } = useFinancialModelStore();

  const { control, watch } = useForm<MonthlyFinancialDataWithExpenses>({
    defaultValues: {
      month: financialData.month,
      workingDaysPerWeek: financialData.workingDaysPerWeek,
      workingDaysPerMonth: financialData.workingDaysPerMonth,
      clientsNumberPerDay: financialData.clientsNumberPerDay,
      hoursNumberPerClient: financialData.hoursNumberPerClient,
      expensesMap: mapExpenses(expenses, financialData),
      actualMonthlyTurnover: financialData.actualMonthlyTurnover,
      expectedMonthlyTurnover: financialData.expectedMonthlyTurnover,
    },
  });
  const { t } = useTranslation("financialModel");

  const formValues = watch();
  const turnoverDifference = calculateTurnoverDifference(formValues);

  return (
    <EntityDetailsPage onSubmit={() => onSubmit(formValues)}>
      <CalculatedTextField
        label={t("month")}
        value={MonthMap[formValues.month]}
      />
      <NumberInput
        label={t("workingDaysPerWeek")}
        name="workingDaysPerWeek"
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
      <NumberInput
        label={t("hoursNumberPerClient")}
        name="hoursNumberPerClient"
        control={control}
      />

      <InputsSeparator />

      <CalculatedNumberField
        label={t("totalDailyClientHours")}
        value={calculateDailyClientHours(formValues)}
      />
      <CalculatedNumberField
        label={t("clientsNumberPerWeek")}
        value={calculateClientsNumberPerWeek(formValues)}
      />
      <CalculatedNumberField
        label={t("clientsNumberPerMonth")}
        value={calculateClientsNumberPerMonth(formValues)}
      />
      <CalculatedNumberField
        label={t("hoursNumberPerMonth")}
        value={calculateHoursNumberPerMonth(formValues)}
      />

      <CalculatedEuroField
        label={t("monthlyCostPrice")}
        value={calculateMonthlyCostPrice(formValues)}
      />

      <InputsSeparator title={t("expenses")} />

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
        label={t("totalExpenses")}
        value={calculateTotalExpenses(formValues)}
      />
      <CalculatedEuroField
        label={t("totalExpensesPerClient")}
        value={calculateTotalExpensesPerClient(formValues)}
      />
      <CalculatedEuroField
        label={t("totalDailyExpenses")}
        value={calculateTotalDailyExpenses(formValues)}
      />
      <CalculatedEuroField
        label={t("totalHourlyExpenses")}
        value={calculateTotalHourlyExpenses(formValues)}
      />

      <InputsSeparator title={t("profit")} />

      <CalculatedEuroField
        label={t("expectedMonthlyProfit")}
        value={calculateExpectedMonthlyProfit(formValues)}
      />

      <InputsSeparator title={t("turnover")} />

      <EuroInput
        label={t("expectedMonthlyTurnover")}
        name="expectedMonthlyTurnover"
        control={control}
      />
      <EuroInput
        label={t("actualMonthlyTurnover")}
        name="actualMonthlyTurnover"
        control={control}
      />
      <CalculatedTextField
        label={t("turnoverGoalMet")}
        value={
          (turnoverDifference >= 0 ? t("yes") : t("no")) +
          ` (${turnoverDifference >= 0 ? t("more") : t("less")} ${Math.abs(
            turnoverDifference
          )} €)`
        }
      />
    </EntityDetailsPage>
  );
}
