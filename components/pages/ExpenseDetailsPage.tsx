import { Expense, ExpenseFormValues } from "@/stores/expenseStore";
import { useForm } from "react-hook-form";
import EntityDetailsPage from "../EntityDetailsPage";
import TextInput from "../inputs/TextInput";

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
    },
  });

  const formValues = watch();

  return (
    <EntityDetailsPage
      onSubmit={() => onSubmit(formValues)}
      onDelete={onDelete}
    >
      <TextInput label="Назва" name="name" control={control} />
    </EntityDetailsPage>
  );
}
