import ToolsProcessingDetailsPage from "@/components/pages/ToolProcessingDetailsPage";
import { useToolProcessingStore } from "@/stores/toolProcessingStore";

export default function AddToolProcessing() {
  const { addTool } = useToolProcessingStore();
  
  return (
    <ToolsProcessingDetailsPage onSubmit={addTool} />
  );
}