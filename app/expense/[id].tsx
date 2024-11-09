import ExpenseDetailsPage from "@/components/pages/ExpenseDetailsPage";
import { ExpenseFormValues, useExpenseStore } from "@/stores/expenseStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function EditExpenseDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateExpense, deleteExpense, getExpenseById } = useExpenseStore();
  const expense = getExpenseById(id);
  const { t } = useTranslation("expenses");

  if (!expense) {
    return null;
  }

  const onUpdateExpense = (expense: ExpenseFormValues) => {
    updateExpense(id, expense);
    router.replace("/(tabs)/expenses");
    Toast.show({
      type: "success",
      text1: expense.name,
      text2: t("updated"),
    });
  };

  const onDeleteExpense = () => {
    deleteExpense(id);
    router.replace("/(tabs)/expenses");
    Toast.show({
      type: "success",
      text1: expense.name,
      text2: t("deleted"),
    });
  };

  return (
    <ExpenseDetailsPage
      expense={expense}
      onSubmit={onUpdateExpense}
      onDelete={onDeleteExpense}
    />
  );
}
