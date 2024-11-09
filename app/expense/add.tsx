import ExpenseDetailsPage from "@/components/pages/ExpenseDetailsPage";
import { ExpenseFormValues, useExpenseStore } from "@/stores/expenseStore";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function AddExpense() {
  const { addExpense } = useExpenseStore();
  const router = useRouter();
  const { t } = useTranslation("expenses");

  const onAddExpense = (expense: ExpenseFormValues) => {
    addExpense(expense);
    router.replace("/(tabs)/expenses");
    Toast.show({
      type: "success",
      text1: expense.name,
      text2: t("added"),
    });
  };

  return <ExpenseDetailsPage onSubmit={onAddExpense} />;
}
