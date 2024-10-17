import TextInput from "@/components/inputs/TextInput";
import ThemedPage from "@/components/ThemedPage";
import { ToolProcessing, useToolProcessingStore } from "@/stores/toolProcessingStore";
import { useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";

type ToolProcessingFormValues = Omit<ToolProcessing, "id">;

export function ToolProcessingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addTool, updateTool, deleteTool, getToolById } = useToolProcessingStore();
  const tool = getToolById(id);
  const { control, handleSubmit } = useForm<ToolProcessingFormValues>();

  return (
    <ThemedPage>
      <TextInput label="Вартість" name="price" control={control} />
    </ThemedPage>
  );
}
