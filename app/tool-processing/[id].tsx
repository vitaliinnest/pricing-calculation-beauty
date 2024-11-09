import ToolsProcessingDetailsPage from "@/components/pages/ToolProcessingDetailsPage";
import {
  ToolProcessingFormValues,
  useToolProcessingStore,
} from "@/stores/toolProcessingStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function EditToolProcessingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { updateTool, deleteTool, getToolById } = useToolProcessingStore();
  const tool = getToolById(id);

  if (!tool) {
    return null;
  }

  const onUpdateTool = (tool: ToolProcessingFormValues) => {
    updateTool(id, tool);
    router.replace("/(tabs)/tool-processing");
    Toast.show({
      type: "success",
      text1: tool.name,
      text2: "Інструмент оновлено",
    });
  };

  const onDeleteTool = () => {
    deleteTool(id);
    router.replace("/(tabs)/tool-processing");
    Toast.show({
      type: "success",
      text1: tool.name,
      text2: "Інструмент видалено",
    });
  };

  return (
    <ToolsProcessingDetailsPage
      toolProcessing={tool}
      onSubmit={onUpdateTool}
      onDelete={onDeleteTool}
    />
  );
}
