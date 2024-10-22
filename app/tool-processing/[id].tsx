import ToolsProcessingDetailsPage from "@/components/pages/ToolProcessingDetailsPage";
import { ToolProcessingFormValues, useToolProcessingStore } from "@/stores/toolProcessingStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function EditToolProcessingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateTool, deleteTool, getToolById } = useToolProcessingStore();
  const tool = getToolById(id);
  
  if (!tool) {
    return null;
  }
  
  const router = useRouter();
  const onUpdateTool = (tool: ToolProcessingFormValues) => {
    console.log('update', id);
    updateTool(id, tool);
    router.replace('/(tabs)/')
    Toast.show({
      type: "success",
      text1: tool.name,
      text2: "Інструмент оновлено",
    });
  };

  const onDeleteTool = () => {
    console.log('delete', id);
    deleteTool(id);
    router.replace('/(tabs)/')
    Toast.show({
      type: "success",
      text1: tool.name,
      text2: "Інструмент видалено",
    });
  }

  return (
    <ToolsProcessingDetailsPage
      toolProcessing={tool}
      onSubmit={onUpdateTool}
      onDelete={onDeleteTool}
    />
  );
}
