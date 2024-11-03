import { useForm } from "react-hook-form";
import TextInput from "../inputs/TextInput";
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

export default function PriceFormationPage() {
  const { priceFormation, updatePriceFormation } = usePriceFormationStore();

  const { control, watch } = useForm<PriceFormationFormValues>({
    defaultValues: {
      clientProfit: priceFormation.clientProfit,
      price: priceFormation.price,
      expectedMonthlyTurnover: priceFormation.expectedMonthlyTurnover,
      servicePrice: priceFormation.servicePrice,
      workingDaysPerMonth: priceFormation.workingDaysPerMonth,
      clientsNumberPerDay: priceFormation.clientsNumberPerDay,
    },
  });

  const costPriceStore = useCostPriceStore();
  const financialModelStore = useFinancialModelStore();

  return (
    <EntityDetailsPage>
      <CalculatedEuroField
        label="Собівартість матеріала на одного клієнта"
        value={costPriceStore.calculateTotalForOneClient()}
      />
      <CalculatedEuroField
        label="Витрати на одного клієнта"
        value={financialModelStore.calculateAverageYearlyExpensesPerClient()}
      />
      <EuroInput
        label="Прибуток з клієнта"
        name="clientProfit"
        control={control}
      />
      <EuroInput label="Ваша ціна" name="price" control={control} />
      <EuroInput
        label="Очікуваний оборот в місяць"
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
      <CalculatedEuroField
        label="Общие расходы в день исходя из количества рабочих дней в месяц"
        value={financialModelStore.calculateAverageYearlyExpensesPerDay()}
      />
    </EntityDetailsPage>
  );
}
