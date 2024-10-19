import ToolsProcessingDetailsPage from "@/components/pages/ToolProcessingDetailsPage";
import { useToolProcessingStore } from "@/stores/toolProcessingStore";
import { useLocalSearchParams } from "expo-router";

export default function EditToolProcessingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateTool, deleteTool, getToolById } = useToolProcessingStore();
  const tool = getToolById(id);
  
  return (
    <ToolsProcessingDetailsPage
      toolProcessing={tool}
      onSave={(formValues) => updateTool(id, formValues)}
      onDelete={() => deleteTool(id)}
    />
  );
}
